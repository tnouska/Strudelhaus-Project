const express = require('express');
const pool = require('../../modules/pool');
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
    //checking if user is authenticated
        (async()=>{
        //creates async function
            const client = await pool.connect();
            // await will wait for a return on the fiven function and then do something
                try {
                    await client.query('BEGIN') // tells DB to be ready for multiple lines of queries
                    let campaignArray = [];
                    let queryText = `SELECT
                        organization.name as organization_name,
                        organization.id as organization_id
                        FROM organization;`
                    let organizationResult = await client.query(queryText)
                    let orgResult = organizationResult.rows                
                    for (let i = 0; i < orgResult.length; i++) {
                        let queryText2 = ``
                         orgResult[i];
                        
                    }                    
                } catch (error) {
                    console.log('ROLLBACK', error);
                    await client.query('ROLLBACK');
                    throw error;
                } finally {
                    client.release();
                    //will end connection to database
                };// end try/catch
        })().catch((error)=>{
            console.log('CATCH',error);
            res.sendStatus(500);
        })//end async
    }else{
        res.sendStatus(403)
    };//end if/else
});//end router.post

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;