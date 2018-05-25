const express = require('express');
const pool = require('../../modules/pool');
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        //checking if user is authenticated
        (async () => {
            //creates async function
            const client = await pool.connect();
            // await will wait for a return on the fiven function and then do something
            try {
                await client.query('BEGIN') // tells DB to be ready for multiple lines of queries
                let performancePageArray = [];
                let queryText = `SELECT
                            campaign.name as campaign_name,
                            campaign.id as campaign_id,
                            campaign.date_start,
                            campaign.date_end,
                            campaign.goal,
                            organization.id
                            FROM campaign
                            JOIN organization ON campaign.organization_id = organization.id
                            WHERE organization_id = $1;`
                let campaignResult = await client.query(queryText, [req.params.id]);
                let campaignRowsResult = campaignResult.rows;
                for (let i = 0; i < campaignRowsResult.length; i++) {
                    campaignRowsResult[i].goal = Number(campaignRowsResult[i].goal.replace(',', ''))
                    let queryText2 = `SELECT
                                SUM("order".quantity) as item_total,
                                "order".product_name,
                                "order".product_price as price
                                FROM "order" 
                                WHERE "order".campaign_id = $1
                                GROUP BY "order".product_name, "order".product_price
                                ORDER BY "order".product_name asc;`
                    console.log('campaignRowsResult[i].campaign_id', campaignRowsResult[i].campaign_id);

                    let orderResult = await client.query(queryText2, [campaignRowsResult[i].campaign_id]);
                    for (let i = 0; i < orderResult.rows.length; i++) {
                        orderResult.rows[i].price = Number(orderResult.rows[i].price);
                        orderResult.rows[i].item_total = Number(orderResult.rows[i].item_total)
                        orderResult.rows[i].productSales = orderResult.rows[i].price * orderResult.rows[i].item_total;
                    }
                    campaignRowsResult[i].orderList = orderResult.rows
                    performancePageArray.push(campaignRowsResult[i])
                    // console.log('campaignRowsResult', campaignRowsResult);
                };//end for loop                        
                await client.query('COMMIT');
                res.send(performancePageArray)
            } catch (error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
                //will end connection to database
            };// end try/catch
        })().catch((error) => {
            console.log('CATCH', error);
            res.sendStatus(500);
        })//end async
    } else {
        res.sendStatus(403)
    };//end if/else
});//end router.post

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;