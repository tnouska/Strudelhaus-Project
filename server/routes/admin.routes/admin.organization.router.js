const express = require('express');
const pool = require('../../modules/pool');
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const router = express.Router();
const Chance = require('chance');
let nodemailer = require('nodemailer');
const chance = new Chance()


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
                        organization.id as organization_id,
                        * 
                        FROM organization
                        ORDER BY organization.name asc;`
                let organizationResult = await client.query(queryText)
                let orgResult = organizationResult.rows
                for (let i = 0; i < orgResult.length; i++) {
                    let queryText2 = `SELECT
                    campaign.name as campaign_name,
                    campaign.id as campaign_id
                    FROM campaign
                    WHERE organization_id = $1
                    ORDER BY campaign_name asc;`
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
                console.log('ROLLBACK error in admin.organization.router.get', error);
                await client.query('ROLLBACK');
                //if error is presesnt this will revert all changes done since the 'BEGIN' query was sent 
                throw error;
            } finally {
                client.release();
                //will end connection to database
            };//end try/catch/finally
        })().catch((error) => {
            console.log('CATCH error in admin.organization.router.get ', error);
            res.sendStatus(500);
        });//end async/await
    } else {
        res.sendStatus(403);
        //if user is not authenticated will send unauthorized
    };//end authorization if/else
});//end admin.organization.router.get

router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        (async () => {
            //creates async function
            const client = await pool.connect();
            //await will wait for a return on the given functin and then do what follows
            try {
                await client.query('BEGIN') // tells DB to be ready for multiple lines of queries
                let password = chance.hash();//this will be the temporary password that will hold value in the password column
                let token = chance.hash();//token that will be tied to user when resetting their password.
                let queryText = `INSERT INTO person 
                        (username,"role", password, token) 
                    VALUES 
                        ($1,$2,$3,$4) 
                    RETURNING "id","username"`

                const personResult = await client.query(queryText, [req.body.contact_email, 'leader', password, token]);
                const user_name     = process.env.EMAIL;
                const refresh_token = process.env.REFRESH_TOKEN;
                const access_token  = process.env.ACCESS_TOKEN;
                const client_id     = process.env.CLIENT_ID;
                const client_secret = process.env.CLIENT_SECRET;

                const email_to = personResult.rows[0].username;

                
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

                // setup e-mail data with unicode symbols
                let mailOptions = {
                    from    : user_name, // sender address
                    to      : email_to, // list of receivers
                    subject : 'Welcome ' + req.body.name, // Subject line
                    text    : 'Please follow the link provided to create your password', // plaintext body
                    html    : '<a href="http://localhost:3000/newpassword/' + token + '/' + req.body.contact_email + '">Create Password</a>', // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return console.log('error in transporter.sendMail',error);
                    }
                });

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
                console.log('ROLLBACK in admin.organization.router.post: ', error);
                await client.query('ROLLBACK');
                //if error is presesnt this will revert all changes done since the 'BEGIN' query was sent 
                throw error;
            } finally {
                client.release();
                //will end connection to database
            };//end  try/catch/finally
        })().catch((error) => {
            console.log('CATCH in admin.organization.router.post', error);
            res.sendStatus(500)
        });//end async/await
    } else {
        res.sendStatus(403);
        //if user is not authenticated, will send unauthorized
    };//end authorization if/else
});//end admin.organization.router.post

router.delete('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = `DELETE FROM organization WHERE organization.id = $1`;
        pool.query(queryText, [req.params.id])
            .then(() => {
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log('ERROR in admin.organization.router.delete ', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.put('/', (req, res) => {
    if(req.isAuthenticated()){
        const newInfo = req.body;
        let queryText = `UPDATE organization SET name = $1, street_address = $2, city = $3, state = $4, zip_code = $5, contact_name = $6, contact_phone = $7, contact_email = $8 WHERE id = $9`;
        pool.query(queryText, [newInfo.name, newInfo.street_address, newInfo.city, newInfo.state, newInfo.zip_code, newInfo.contact_name, newInfo.contact_phone, newInfo.contact_email, newInfo.organization_id])
        .then( (result) => {
            res.sendStatus(201);
        })
        .catch( (error) => {
            console.log('ERROR in admin.organization.router.put', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;