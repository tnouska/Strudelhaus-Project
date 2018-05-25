let express = require('express');
let router = express.Router();

let app = express();
let config = require('../../config.json')[app.get('env')];

let unirest = require('unirest');
let base_url = "https://connect.squareup.com/v2";
//campaign_id,notes,street_address,city,state,zip_code,name,email_address,name_of_reference,total
// Data store for product cost
// let product_cost = {"001": 1500, "002": 2000, "003": 3000};
let amount = 0;
let billingName;
let notes;
let street_address;
let city;
let state;
let zip_code;
let referenceName;
let email_address;
let name_of_reference;

function findLocation(callback) {
	unirest.get(base_url + '/locations')
	.headers({
		'Authorization': 'Bearer ' + config.squareAccessToken,
		'Accept': 'application/json'
	})
	.end(function(response) {
		for (var i = response.body.locations.length - 1; i >= 0; i--) {
			location = response.body.locations[i];
			if (location.capabilities && location.capabilities.indexOf("CREDIT_CARD_PROCESSING")>-1) {
				callback(location, null);
				return;
			}
			if (i==0) {
				callback(null, {status: 400, errors: [{"detail": "No locations have credit card processing available."}]});
			}
		}
	});
}

/* GET home page. */
router.get('/', function(req, res, next) {
	findLocation(function(location, error){
		if (error) {
			res.json(error);
		} else {
			res.render('index', {
				'title': 'Express Node.js Implementation',
				'square_application_id': config.squareApplicationId,
				'square_location_id': 01,
				'square_location_name': location.name,
			});
		}
	});
});

router.post('/charges/charge_card', function(req,res,next){
	var request_params = req.body;

	var token = require('crypto').randomBytes(64).toString('hex');
console.log("square credit route", req.body)
	
		 amount = parseInt(req.body.total * 100);
		 billingName = req.body.name
	
	request_body = {
		card_nonce: request_params.nonce,
		amount_money: {
			amount: amount,
			currency: 'USD'
		},
		idempotency_key: token
	}

	locationId = request_params.location_id;

	unirest.post(base_url + '/locations/' + locationId + "/transactions")
	.headers({
		'Authorization': 'Bearer ' + config.squareAccessToken,
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	})
	.send(request_body)
	.end(function(response){
		if (response.body.errors){
			res.json({status: 400, errors: response.body.errors})
		}else{
            console.log(response.body)
			res.json({status: 200})
			// res.send(response.body)
		}
	})

});

router.post('/customerinfo', function(req,res){
	
	notes = req.body.customerInfo.info
	street_address = req.body.customerInfo.address
	city = req.body.customerInfo.city
	state = req.body.customerInfo.state
	zip_code = req.body.customerInfo.zip
	name = req.body.customerInfo.name
	email_address = req.body.customerInfo.email
	name_of_reference = req.body.customerInfo.name
	console.log(city)
});
module.exports = router;
