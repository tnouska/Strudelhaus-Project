let express = require('express');
let router = express.Router();
let SquareConnect = require('square-connect');
let app = express();
let request = require("request");

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
let campaignName;

router.post('/customerinfo', function(req,res){
  amount = parseInt(req.body.total) * 100
	notes = req.body.customerInfo.info
	street_address = req.body.customerInfo.address
	city = req.body.customerInfo.city
	state = req.body.customerInfo.state
	zip_code = req.body.customerInfo.zip
	campaignName = req.body.campaignName
	email_address = req.body.customerInfo.email
  name_of_reference = req.body.customerInfo.name
  billingName = req.body.billingName
	console.log(req.body.products)
	let randomNum = Math.floor(Math.random() * 1000);
        console.log(req.body.campaignName)
        // let totalAmount = parseInt(req.body * 100)
        let options = { method: 'POST',
          url: 'https://connect.squareup.com/v2/locations/CBASEGcVZgUKS8RbqdkU-YjiBxggAQ/checkouts',
          headers: 
           { 
             'Cache-Control': 'no-cache',
             Accept: 'application/json',
             Authorization: 'Bearer sandbox-sq0atb-ffNvoCsEpPIf8cJyXHELlw',
             'Content-Type': 'application/json' },
          body: 
           { idempotency_key: '86ae1696-b1e3-4328-af6d-f1e04d947a23442989' + randomNum ,
             order: 
              { reference_id: 'reference_id',
                line_items: 
                  req.body.products ,
                
             },
            
             redirect_url: 'http://localhost:3000/fundraiser/' + campaignName },
          json: true };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          
          
        // res.send(body.checkout.checkout_page_url)
        console.log(body);
        res.send(body.checkout.checkout_page_url)
       
        });
	
	

});
module.exports = router;
