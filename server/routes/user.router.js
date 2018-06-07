const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database

  res.send(req.user);

});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const role = req.body.role

  const queryText = 'INSERT INTO person (username, password, role) VALUES ($1, $2, $3) RETURNING id';
  pool.query(queryText, [username, password, role])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/newpassword', (req, res) => {
  const password = encryptLib.encryptPassword(req.body.password)
  const token = req.body.token
  const appId = req.body.square_application_id
  const locationId = req.body.square_location_id
  if (token.length === 40) {
    (async () => {
      const client = await pool.connect();
      try {
        await client.query('BEGIN')
        const queryText = `UPDATE person SET password = $1 WHERE token = $2`
        await client.query(queryText, [password, token])
        const queryText2 = `UPDATE person SET token = $1 RETURNING "id"`
        const newToken = ''
        let personId = await client.query(queryText2, [newToken])
        const queryText3 = `UPDATE organization SET square_application_id = $1, square_location_id = $2 WHERE organization.person_id = $3`
        await client.query(queryText3,[appId,locationId,personId.rows[0].id])
        await client.query('COMMIT')
        res.sendStatus(201);
      } catch (error) {
        console.log('ROLLBACK in user.router.put', error);
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      };//end try/catch/finally
    })().catch((error) => {
      console.log('CATCH in user.router.put', error);
      res.sendStatus(500);
    });//end async function
  } else {
    res.send(500)
  };//end if/else
});//end router.put

module.exports = router;
