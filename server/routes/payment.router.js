let express = require('express');
let router = express.Router();
let SquareConnect = require('square-connect');
let app = express();
let request = require("request");
const pool = require('../modules/pool')

let customerData = {
  amount: 0,
  billingName: '',
  notes: '',
  street_address: '',
  city: '',
  state: '',
  zip_code: '',
  email_address: '',
  name_of_reference: '',
  campaignName: '',
  products: []
}


router.post('/customerinfo', function (req, res) {
  console.log('req.body', req.body);

  customerData.amount = parseInt(req.body.total) * 100
  customerData.notes = req.body.customerInfo.info
  customerData.street_address = req.body.customerInfo.address
  customerData.city = req.body.customerInfo.city
  customerData.state = req.body.customerInfo.state
  customerData.zip_code = req.body.customerInfo.zip
  customerData.campaignName = req.body.campaignName
  customerData.email_address = req.body.customerInfo.email
  customerData.name_of_reference = req.body.customerInfo.refName
  customerData.billingName = req.body.customerInfo.billingName
  customerData.products = req.body.products
  let randomNum = Math.floor(Math.random() * 1000);
  // let totalAmount = parseInt(req.body * 100)
  let options = {
    method: 'POST',
    url: 'https://connect.squareup.com/v2/locations/CBASEGcVZgUKS8RbqdkU-YjiBxggAQ/checkouts',
    headers:
      {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        Authorization: 'Bearer sandbox-sq0atb-ffNvoCsEpPIf8cJyXHELlw',
        'Content-Type': 'application/json'
      },
    body:
      {
        idempotency_key: '86ae1696-b1e3-4328-af6d-f1e04d947a23442989' + randomNum,
        order:
          {
            reference_id: 'reference_id',
            line_items:
              req.body.products,

          },

        redirect_url: 'http://localhost:3000/fundraiser/' + customerData.campaignName
      },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    res.send(body.checkout.checkout_page_url)
  });//end request
});

router.post('/postcustomer', (req, res) => {

  (async () => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const queryText = `SELECT id FROM campaign WHERE url = $1`
      let campaignId = await client.query(queryText, [customerData.campaignName])
      const queryText2 = `INSERT INTO customer 
        (campaign_id,notes,street_address,city,state,zip_code,name,email_address,name_of_reference)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING "id"`;
      const customerValue = [campaignId.rows[0].id, customerData.notes, customerData.street_address, customerData.city, customerData.state, customerData.zip_code, customerData.billingName, customerData.email_address, customerData.name_of_reference];
      let customerId = await client.query(queryText2, customerValue)
      let queryText3 = `SELECT id,price,sku,description FROM product WHERE "name" = $1`
      for (let i = 0; i < customerData.products.length; i++) {
        let productInfo = await client.query(queryText3, [customerData.products[i].name]);
        const queryText4 = `INSERT INTO "order" 
            (customer_id, product_name,product_price,product_sku,product_description,campaign_id,quantity)
            VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING "id"`
        let orderValues = [
          productInfo.rows[0].id,
          customerData.products[i].name,
          productInfo.rows[0].price,
          productInfo.rows[0].sku,
          productInfo.rows[0].description,
          campaignId.rows[0].id,
          customerData.products[i].quantity]

        let orderResult = await client.query(queryText4, orderValues)

        await client.query('COMMIT')
        res.sendStatus(200);
      }
    } catch (error) {
      console.log('ROLLBACK in payment.router', error);
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    };//end try/catch/finally
  })
    ().catch((error) => {
      console.log('error in catch: ', error);
      res.sendStatus(500);
    });//end async/await
})
module.exports = router;
