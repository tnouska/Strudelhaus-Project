const express = require('express');
const pool = require('../../modules/pool');
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const router = express.Router();


router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        //checking if user is authenticated
        (async () => {
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
                    customer.id as customer_id,
                    customer.street_address,
                    customer.city,
                    customer.state,
                    customer.zip_code,
                    customer.email_address
                    FROM customer
                    WHERE campaign_id = $1;`
                const campaignOrders = await client.query(queryText, [req.params.id])
                for (let i = 0; i < campaignOrders.rows.length; i++) {
                    campaignOrders.rows[i].customer_id;
                    let queryText2 = `SELECT
                        product_name as name,
                        product_price as price,
                        "order".quantity
                        FROM "order"
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
        })().catch((error) => {
            console.log('CATCH', error);
            res.sendStatus(500);
        })//end async
    } else {
        res.sendStatus(403);
    };//end if/else for authentication
});//end router.get

router.post('/', (req, res) => {
    console.log('req.body', req.body);
    
    if (req.isAuthenticated()) {
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN')
                for (let i = 0; i < req.body.length; i++) {
                    let queryText = `INSERT INTO customer (campaign_id,notes,street_address,city,state,zip_code,name,email_address,name_of_reference)
                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING "id"`
                    customerValues = [
                        req.body[i].campaign_id, 
                        req.body[i].notes, 
                        req.body[i].street_address, 
                        req.body[i].city, 
                        req.body[i].state, 
                        req.body[i].zip_code, 
                        req.body[i].name, 
                        req.body[i].email_address, 
                        req.body[i].name_of_reference];                    
                    customerId = await client.query(queryText, customerValues)
                    console.log(customerId.rows[0]);
                    
                    strudelItems = []
                    strudelItems.push({ product_name: req.body[i].item1Name, quantity: req.body[i].item1Qty })
                    if (req.body[i].item2Name && req.body[i].item2Qty) {
                        strudelItems.push({ product_name: req.body[i].item2Name, quantity: req.body[i].item2Qty })
                    }
                    if (req.body[i].item3Name && req.body[i].item3Qty) {
                        strudelItems.push({ product_name: req.body[i].item3Name, quantity: req.body[i].item3Qty })
                    }
                    for (let z = 0; z < strudelItems.length; z++) {
                        let queryText2 = `SELECT id,price,sku FROM product WHERE "name" = $1`
                        console.log('strudel Name: ', strudelItems[z]);
                        
                        productInfo = await client.query(queryText2, [strudelItems[z].product_name]);                        
                        let queryText3 = `INSERT INTO "order" 
                        (customer_id, product_name,product_price,product_sku,campaign_id,quantity)
                        VALUES ($1,$2,$3,$4,$5,$6)`
                        await client.query(queryText3, [
                            customerId.rows[0].id,
                            strudelItems[z].product_name,
                            productInfo.rows[0].price,
                            productInfo.rows[0].sku,
                            req.body[i].campaign_id,
                            strudelItems[z].quantity
                        ]);//end client.query
                    };//end for loop
                };//end for loop
                await client.query('COMMIT');
                res.sendStatus(200);
            } catch (error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
            };//end try/catch/finally
        })().catch((error) => {
            console.log('error in catch: ', error);
            res.sendStatus(500);
        });//end async/await
    } else {
        res.sendStatus(403);
    };
});

module.exports = router;
