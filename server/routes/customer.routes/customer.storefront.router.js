const express = require('express');
const pool = require('../../modules/pool');
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    (async () => {
        //creates async function
        const client = await pool.connect();
        //await will wait for a return on the given function and then do something
        try {
            await client.query('BEGIN');
            let queryText = `SELECT
                campaign.id
                from campaign
                WHERE campaign.url = $1;`
            const campaignId = await client.query(queryText, [req.params.id])
            let queryText2 = `SELECT
                product.name as product_name,
                product.price as product_price,
                product.description as product_description,
                product.img_url_1,
                product.img_url_2,
                product_type.type as product_type
                FROM available_item
                JOIN product ON available_item.product_id = product.id
                JOIN product_type ON product.product_type = product_type.id
                WHERE campaign_id = $1
                ORDER BY product_type desc, product_name asc;`
            const availableItems = await client.query(queryText2, [campaignId.rows[0].id])
            await client.query('COMMIT');
            res.send(availableItems.rows)
        } catch (error) {
            console.log('ROLLBACK in customer.storefront.router.get: ', error);
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
            //will release end query('BEGIN')
        };// end try/catch
    })().catch((error) => {
        console.log('CATCH in customer.storefront.router.get: ', error);
        res.sendStatus(500);
    })//end async
});//end router.get for products

/**
 * POST route template
 */
router.post('/', (req, res) => {
    (async () => {
        //creates async function
        const client = await pool.connect();
        try {
            await client.query('BEGIN')
            let queryText = `SELECT
                campaign.id
                from campaign
                WHERE campaign.url = $1;`
            const campaignId = await client.query(queryText, [req.body.campaign_name])
            let queryText2 = `INSERT INTO customer 
                (campaign_id,notes,street_address,city,state,zip_code,name,email_address,name_of_reference)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING "id";`
            let customer = req.body.customer
            let customerValues = [campaignId.rows[0].id, customer.notes, customer.street_address, customer.city, customer.state, customer.zip_code, customer.name, customer.email_address, customer.name_of_reference]
            let customerId = await client.query(queryText, customerValues)
            let order = req.body.order
            let queryText3 = `INSERT INTO "order"
                (customer_id, product_name, product_price, product_description, product_sku, quantity, campaign_id)
                VALUES
                ($1,$2,$3,$4,$5,$6,$7)`;
            let orderValues = [customerId.rows[0].id, order.product_name, order.product_price, product.description, product.sku, product.quantity, campaignId.rows[0].id];
            await client.query(queryText, orderValues)
            await client.query('COMMIT')
            res.sendStatus(201)
        } catch (error) {
            console.log('ROLLBACK in customer.storefront.router: ', error);
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        };//end try/catch/finally
    })().catch((error) => {
        console.log('CATCH in customer.storefront.router: ', error);
        res.sendStatus(500);
    })//end async function
});//end customer.storefront.router.post

module.exports = router;