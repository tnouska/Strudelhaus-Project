const express = require('express');
const pool = require('../../modules/pool');
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const router = express.Router();


router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        //checking if user is authenticated
        (async () => {
            //creates async function
            const client = await pool.connect();
            //await will wait for a return on the given function and then do something
            try {
                await client.query('BEGIN') // tells DB to be ready for multiple lines of queries
                let organizationArray = []
                let queryText = `SELECT
                        organization.name as organization_name,
                        organization.contact_name,
                        organization.id as organization_id 
                        FROM organization;`
                let organizationResult = await client.query(queryText)                
                let orgResult = organizationResult.rows                
                for (let i = 0; i < orgResult.length; i++) {
                    let queryText2 = `SELECT
                    campaign.name as campaign_name,
                    campaign.id as campaign_id
                    FROM campaign
                    WHERE organization_id = $1`                    
                    let organizationId = orgResult[i].organization_id;
                    let campaignResult = await client.query(queryText2, [organizationId])
                    orgResult[i].campaignData = campaignResult.rows
                    organizationArray.push(orgResult[i])
                };//end for loop
                await client.query('COMMIT')
                //will try and commit changes to database
                res.send(organizationArray)
                //will send campaignArray to finish request
            } catch (error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                //if error is presesnt this will revert all changes done since the 'BEGIN' query was sent 
                throw error;
            } finally {
                client.release();
                //will end connection to database
            };//end try/catch/finally
        })().catch((error) => {
            console.log('error in CATCH: ', error);
            res.sendStatus(500);
        });//end async/await
    } else {
        res.sendStatus(403);
        //if user is not authenticated will send unauthorized
    };//end authorization if/else
});//end admin.organization.router.get

router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        (async() => {
        //creates async function
            const client = await pool.connect();
            //await will wait for a return on the given functin and then do what follows
            try {
                await client.query('BEGIN') // tells DB to be ready for multiple lines of queries
                let queryText = `INSERT INTO person (username,"role") VALUES ($1,$2) RETURNING "id"`
                const personResult = await client.query(queryText,[req.body.username,req.body.role]);
                const personId = personResult.rows[0].id;
                let queryText2 = `INSERT INTO organization
                    (person_id,name,street_address,city,state,zip_code,contact_name,contact_phone,contact_email)
                    VALUES
                    ($1,$2,$3,$4,$5,$6,$7,$8,$9)`
                let organizationValues = [
                    personId, 
                    req.body.name, 
                    req.body.street_address, 
                    req.body.city, req.body.state, 
                    req.body.zip_code, 
                    req.body.contact_name, 
                    req.body.contact_phone, 
                    req.body.contact_email
                ]
                await client.query(queryText2, organizationValues)
                await client.query('COMMIT');
                res.sendStatus(201);
            } catch (error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                //if error is presesnt this will revert all changes done since the 'BEGIN' query was sent 
                throw error;
            } finally {
                client.release();
                //will end connection to database
            };//end  try/catch/finally
        })().catch((error) => {
            console.log('error in Catch: ', error);
            res.sendStatus(500)
        });//end async/await
    } else {
        res.sendStatus(403);
        //if user is not authenticated, will send unauthorized
    };//end authorization if/else
});//end admin.organization.router.post

router.delete('/:id', (req, res) => {
    if(req.isAuthenticated()) {
        let queryText = `DELETE FROM organization WHERE organization.id = $1`;
        pool.query(queryText, [req.params.id])
        .then( () => {
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log('error in deleteAdminOrg', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;