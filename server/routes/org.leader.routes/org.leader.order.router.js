const express = require('express');
const pool = require('../../modules/pool');
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const router = express.Router();


router.get('/:id', (req, res) => {    
    if (req.isAuthenticated()) {
    //checking if user is authenticated
        (async()=>{
        //creates async function
            const client = await pool.connect();
            //await will wait for a return on the given function and then do something
            try {
                await client.query('BEGIN')
                let queryText = `SELECT 
                    customer.name,
                    customer.name_of_reference,
                    customer.notes,
                    customer.date_of_order,
                    customer.id as customer_id
                    FROM customer
                    WHERE campaign_id = $1;`
                const campaignOrders = await client.query(queryText,[req.params.id])                
                for (let i = 0; i < campaignOrders.rows.length; i++) {
                    campaignOrders.rows[i].customer_id;
                    let queryText2 = `SELECT
                        product.name,
                        product.price,
                        "order".quantity
                        FROM "order"
                        JOIN available_item ON "order".available_item_id = available_item.id
                        JOIN product ON available_item.product_id = product.id
                        WHERE "order".customer_id = $1;`
                    const customerOrder = await client.query(queryText2, [campaignOrders.rows[i].customer_id]);
                    for (let i = 0; i < customerOrder.rows.length; i++) {
                        customerOrder.rows[i].price = Number(customerOrder.rows[i].price);
                    };//end for loop
                    campaignOrders.rows[i].customer_order = customerOrder.rows                    
                };//end for loop
                await client.query('COMMIT');
                res.send(campaignOrders.rows)
            } catch (error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
                //will release/end query('BEGIN')
            };//end try/catch
        })().catch((error)=>{
            console.log('CATCH', error);
            res.sendStatus(500);
        })//end async
    } else {
        res.sendStatus(403);
    };//end if/else for authentication
});//end router.get

router.post('/', (req, res) => {

});

module.exports = router;