const express = require('express');
const pool = require('../../modules/pool');
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const router = express.Router();
const moment = require('moment')

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        //checking if user is authenticated
        (async () => {
            //creates async function
            const client = await pool.connect();
            //await will wait for a return on the given function and then do something
            try {
                await client.query('BEGIN') // tells DB to be ready for multiple lines of queries
                let campaignArray = []
                let queryText = `SELECT
                campaign.id as campaign_id,
                organization.name as organization_name,
                campaign.name as campaign_name,
                campaign.date_end as campaign_date_end
                FROM "order"
                JOIN customer ON "order".customer_id = customer.id
                JOIN campaign ON customer.campaign_id = campaign.id
                JOIN organization ON campaign.organization_id = organization.id
                GROUP BY organization.name, campaign.name, campaign.date_end, campaign.id
                ORDER BY campaign.date_end ASC;`

                let campaignResult = await client.query(queryText)
                for (let i = 0; i < campaignResult.rows.length; i++) {
                    campaignResult.rows[i].due_date = moment(campaignResult.campaign_date_end).add(10,'days').format('M-D-YY')
                    let queryText2 = `SELECT
                    SUM("order".quantity) as product_total,
                    "order".product_name
                    FROM "order" 
                    WHERE "order".campaign_id = $1
                    GROUP BY "order".product_name
                    ORDER BY "order".product_name asc;`
                    let campaignId = campaignResult.rows[i].campaign_id;
                    let orderResult = await client.query(queryText2, [campaignId])
                    campaignResult.rows[i].orderData = orderResult.rows
                    campaignArray.push(campaignResult.rows[i])
                };//end for loop
                await client.query('COMMIT')
                //will try and commit changes to database
                res.send(campaignArray)
                //will send campaignArray to finish request
            } catch (error) {
                console.log('ROLLBACK in admin.pipeline.router.get', error);
                await client.query('ROLLBACK');
                //if error is presesnt this will revert all changes done since the 'BEGIN' query was sent 
                throw error;
            } finally {
                client.release();
                //will end connection to database
            };//end try/catch/finally
        })().catch((error) => {
            console.log('CATCH in admin.pipeline.router.get', error);
            res.sendStatus(500);
        });//end async/await
    } else {
        res.sendStatus(403);
        //if user is not authenticated will send unauthorized
    };//end authorization if/else
});//end admin.campaign.router.get


module.exports = router;

