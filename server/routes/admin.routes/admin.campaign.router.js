const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
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
            //await will wait for a return on the given function and then do something
            try {
                
            } catch (error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                throw error; 
            } finally {
                client.release();   
            };//end try/catch/finally
        })().catch((error)=>{
            console.log('error in CATCH: ',error);
            res.sendStatus(500);
        });//end async/await
    } else {
        res.sendStatus(403);
        //if user is not authenticated will send unauthorized
    };//end authorization if/else
});//end admin.campaign.router.get

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;