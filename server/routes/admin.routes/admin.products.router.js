const express = require('express');
const pool = require('../../modules/pool');
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `SELECT product.id as product_id, * FROM product JOIN product_type ON product.product_type = product_type.id`;
    pool.query(queryText)
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log('error in GET product', error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    if(req.isAuthenticated()) {
        const product = req.body;
        let queryText = `INSERT INTO product (name, description, sku, img_url_1, img_url_2, product_type) VALUES ($1, $2, $3, $4, $5, $6)`;
        pool.query(queryText, [product.name, product.description, product.sku, product.img_url_1, product.img_url_2, product.product_type])
        .then( () => {
            res.sendStatus(201);
        })
        .catch( (error) => {
            console.log('error in product POST:', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.delete('/:id', (req, res) => {
    console.log('req.params adminDeleteProduct:', req.params);
    if(req.isAuthenticated()) {
        let queryText = `DELETE FROM product WHERE product.id = $1`;
        pool.query(queryText, [req.params.id])
        .then( () => {
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log('error in adminDeleteProduct', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;