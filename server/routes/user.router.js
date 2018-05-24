const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  console.log('req.user: ',req.user);
  
  res.send(req.user);

});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = 'INSERT INTO person (username, password) VALUES ($1, $2) RETURNING id';
  pool.query(queryText, [username, password])
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

router.put('/newpassword', (req,res)=>{
  const password = encryptLib.encryptPassword(req.body.password)
  const token = req.body.token
  if (token.length === 40) {
    (async()=>{
      const client = await pool.connect();
      try {
        await client.query('BEGIN')
        const queryText = `UPDATE person SET password = $1 WHERE token = $2`
        await client.query(queryText,[password,token])
        const queryText2 = `UPDATE person SET token = $1`
        const newToken = ''
        await client.query(queryText2,[newToken])
        await client.query('COMMIT')
        res.sendStatus(201);
      } catch (error) {
        console.log('ROLLBACK',error);
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      };//end try/catch/finally
    })().catch((error)=>{
      console.log('CATCH',error);
      res.sendStatus(500);
    });//end async function
  } else {
    res.send(500)
  };//end if/else
});//end router.put

module.exports = router;
