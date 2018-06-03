let express = require('express');
let router = express.Router();
let SquareConnect = require('square-connect');
let app = express();
let request = require("request");
const pool = require('../modules/pool');
let nodemailer = require('nodemailer');

let squareAppId;
let squareLocationId;
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
//square access token = location id
router.post('/squareInfo', function (req, res){
  
  let orgUrl = req.body.campaignName
  console.log(orgUrl)
  //`SELECT "square_application_id", "square_location_id" FROM campaign JOIN organization ON organization.id = campaign.organization_id where campaign.url = $1;`;
  const queryText = `SELECT square_application_id, square_location_id FROM campaign JOIN organization ON organization.id = campaign.organization_id where campaign.url = $1;`

  pool.query(queryText, [orgUrl])
  .then((result) => {
    console.log('squareInfo: ', result.rows);
    
    
    console.log('square info from db', result.rows[0].square_application_id, result.rows[0].square_location_id );
    squareAppId = result.rows[0].square_application_id
    squareLocationId = result.rows[0].square_location_id
    res.sendStatus(200);
}).catch((error) => {
    console.log('error in /squareInfo', error);
    res.sendStatus(500);
});
})

router.post('/customerinfo', function (req, res) {

  customerData.amount = parseInt(req.body.total) * 100
  customerData.notes = req.body.customerInfo.notes
  customerData.street_address = req.body.customerInfo.address
  customerData.city = req.body.customerInfo.city
  customerData.state = req.body.customerInfo.state
  customerData.zip_code = req.body.customerInfo.zip
  customerData.campaignName = req.body.campaignName
  customerData.email_address = req.body.customerInfo.email
  customerData.name_of_reference = req.body.customerInfo.refName
  customerData.billingName = req.body.customerInfo.billingName
  customerData.products = req.body.products

  let emailProducts = customerData.products.map( (product) =>{
    return '<h3>' + product.name + '</h3>' + '<h3>' + 'Quantity ' + product.quantity + ' $'+(product.base_price_money.amount/100).toFixed(2) + 'ea' + '</h3>'
  })

  let randomNum = Math.floor(Math.random() * 1000);
  // let totalAmount = parseInt(req.body * 100)
  let options = {
    method: 'POST',
    url: 'https://connect.squareup.com/v2/locations/'+ squareLocationId +'/checkouts',
    headers:
      {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        Authorization: 'Bearer ' + squareAppId,
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

        redirect_url: 'http://localhost:3000/thankyou'
      },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    if(body.errors){
      res.send(body)
    }else{
      
      res.send(body.checkout.checkout_page_url)
    
    

    const user_name     = 'strudelhausproxy@gmail.com';
    const refresh_token = process.env.REFRESH_TOKEN;
    const access_token  = process.env.ACCESS_TOKEN;
    const client_id     = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
 
    const email_to = customerData.email_address;
 
    
 // login
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: user_name,
            clientId: client_id,
            clientSecret: client_secret,
            refreshToken: refresh_token,
            accessToken: access_token,
            expires: 1527200298318 + 3600      
        }
    });
 
  console.log(emailProducts)
    // setup e-mail data with unicode symbols
    let mailOptions = {
        from    : user_name, // sender address
        to      : email_to, // list of receivers
        subject : 'Thank You ' + customerData.billingName, // Subject line
        html    : '<img src="cid:unique@kreata.ee"/>'+
        '<div style="margin:0 auto;max-width:600px;text-align:center;">'+
        '<h2>'+ customerData.billingName +'</h2>' +
    '<h1>Thank You For Your Order</h1>' +
    emailProducts  +
    '<h1>' + 'Please Visit  ' + '<a href="http://www.thestrudelhaus.com/">Ruhlands Strudel Haus</a>'+
 ' </div>',
        attachments: [{
            filename: 'appleTopBoard.jpg',
            path: 'http://www.thestrudelhaus.com/storage/images2/rsh_banner960.png',
            cid: 'unique@kreata.ee' //same cid value as in the html img src
        }]

      //   '<body>'+
      //   '<div style="margin:0 auto; width:600px; height:00px">'+
      //   '<div style="background-color:#880F1B;">'+
      //   '<h2>' +'Thank You'+ '</h2>' + '<h1>'+ customerData.billingName + '</h1>' +
      //   '<div>' + emailProducts + '</div>'+
      //   '</br></br>'+
      //  '<p>' + 'Thanks' + '</p>'+
      
      //   '</div>'+'</div>'+
      // '</body>' , // html body,
        
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
  }
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
            (customer_id, product_name,product_price,product_sku,campaign_id,quantity)
            VALUES ($1,$2,$3,$4,$5,$6) RETURNING "id"`
        let orderValues = [
          productInfo.rows[0].id,
          customerData.products[i].name,
          productInfo.rows[0].price,
          productInfo.rows[0].sku,
          campaignId.rows[0].id,
          customerData.products[i].quantity]

        let orderResult = await client.query(queryText4, orderValues)

        await client.query('COMMIT')
         res.sendStatus(200);
      }
    } catch (error) {
      console.log('ROLLBACK in org.leader.order.router.post', error);
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    };//end try/catch/finally
  })
    ().catch((error) => {
      console.log('CATCH in org.leader.order.router.post', error);
      res.sendStatus(500);
    });//end async/await
})
module.exports = router;
