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


module.exports = router;