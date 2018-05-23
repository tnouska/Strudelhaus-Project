import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    
    view: state.toggleShoppingView,
    total: state.orderTotal
  });
      
    class SquareForm extends Component {
      constructor(props) {
        super(props);
    
        this.state = {
          currentView: this.props.view
        };
      }
       cardNonce;
       paymentForm = new window.SqPaymentForm({
        applicationId: 'sandbox-sq0idp-YldqxOSfurHmr3XsFZ59jg',
        locationId: 'CBASEGcVZgUKS8RbqdkU-YjiBxggAQ',
        inputClass: 'sq-input',
        autoBuild: true,
        inputStyles: [
            {
              fontSize: '14px',
              padding: '7px 12px',
              backgroundColor: "transparent"
            }
          ],
        cardNumber: {
          elementId: 'sq-card-number',
          placeholder: '0000 0000 0000 0000'    
        },
        cvv: {
          elementId: 'sq-cvv',
          placeholder: 'CVV'
        },
        expirationDate: {
          elementId: 'sq-expiration-date',
          placeholder: 'MM/YY'
        },
        postalCode: {
          elementId: 'sq-postal-code',
          placeholder: '94110'
        },
  
        // Initialize Apple Pay placeholder ID
        applePay: {
          elementId: 'sq-apple-pay'
        },
  
        // Initialize Masterpass placeholder ID
        masterpass: {
          elementId: 'sq-masterpass'
        },
  
        callbacks: {
          methodsSupported: function (methods) {
  
            let applePayBtn = document.getElementById('sq-apple-pay');
            let applePayLabel = document.getElementById('sq-apple-pay-label');
            let masterpassBtn = document.getElementById('sq-masterpass');
            let masterpassLabel = document.getElementById('sq-masterpass-label');
  
            
            if (methods.applePay === true) {
              applePayBtn.style.display = 'inline-block';
              applePayLabel.style.display = 'none' ;
            }
            
            if (methods.masterpass === true) {
              masterpassBtn.style.display = 'inline-block';
              masterpassLabel.style.display = 'none';
            }
          },
          cardNonceResponseReceived: function(errors, nonce, cardData) {
            if (errors){
              let error_html = ""
              for (let i =0; i < errors.length; i++){
                error_html += "<li> " + errors[i].message + " </li>";
              }
              document.getElementById("card-errors").innerHTML = error_html;
              document.getElementById('submit').disabled = false;
            }else{
              document.getElementById("card-errors").innerHTML = "";
              this.chargeCardWithNonce(nonce);
            }
            
            
          },
          unsupportedBrowserDetected: function() {
            
          },
          createPaymentRequest: function () {
            return {
              requestShippingAddress: false,
              currencyCode: "USD",
              countryCode: "US",
  
              total: {
                label: "daydreammsp",
                amount: "1.01",
                pending: false,
              },
  
              lineItems: [
                {
                  label: "Subtotal",
                  amount: "1.00",
                  pending: false,
                },
                {
                  label: "Tax",
                  amount: "0.01",
                  pending: false,
                }
              ]
            };
          },
        }
      });
  
      renderForm =()=>{
        this.paymentForm.build()
      }
    
  
     paymentFormSubmit = function(){
      console.log('submit clicked');
      document.getElementById('submit').disabled = true;
      this.paymentForm.requestCardNonce();
      // paymentForm.destroy();
      
      return false;
    }
  
     chargeCardWithNonce = function(nonce) {
      let product_id = document.getElementById('product_id').value;
      let name = document.getElementById('name').value;
      let email = document.getElementById('email').value;
      let street_address_1 = document.getElementById('street_address_1').value;
      let street_address_2 = document.getElementById('street_address_2').value;
      let city = document.getElementById('city').value;
      let state = document.getElementById('state').value;
      let zip = document.getElementById('zip').value;
      
      let http = new XMLHttpRequest();
      let url = "/api/payment/charges/charge_card";
      let params = "location_id=" + 'CBASEGcVZgUKS8RbqdkU-YjiBxggAQ'
      + "&product_id=" + product_id 
      + "&name=" + name 
      + "&email=" + email 
      + "&nonce=" + nonce
      + "&street_address_1=" + street_address_1
      + "&street_address_2=" + street_address_2
      + "&city=" + city
      + "&state=" + state
      + "&zip=" + zip;
  
      http.open("POST", url, true);
  
      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http.setRequestHeader("X-CSRF-Token", "<%= form_authenticity_token %>");
  
      http.onreadystatechange = function() {//Call a function when the state changes.
          if(http.readyState == 4 && http.status == 200) {
            let data = JSON.parse(http.responseText)
            if (data.status == 200) {
              document.getElementById("successNotification").style.display = "block";
              document.getElementById("payment-form").style.display = "none";
              // document.getElementById("sq-walletbox").style.display = "none";
              window.scrollTo(0, 0);
            }else if (data.status == 400){
              let error_html = ""
              for (let i =0; i < data.errors.length; i++){
                error_html += "<li> " + data.errors[i].detail + " </li>";
              }
              document.getElementById("card-errors").innerHTML = error_html;
              document.getElementById('submit').disabled = false;
            }
          }
      }
      http.send(params);
    }
      componentDidMount() {
        //   this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
          
        }
      
        componentDidUpdate() {
        //   if (!this.props.user.isLoading && this.props.user.userName === null) {
        //     this.props.history.push('home');      
        //   }
  
        }
      render() {
  

      return (
        <div>
          
          <div className="no-boot">
    <div id="successNotification" style={{display: "none"}}>
    Card Charged Succesfully!!
    </div>
  
    <form id="payment-form" onSubmit={()=> this.paymentFormSubmit()}>
  
    <h1 value={this.props.total} id="product_id" name="product_id">{this.props.total}</h1>
    
   <h3>Customer Info  </h3>
   
    <label>Customer Name</label>
    <input type="text" id="name" name="name"  placeholder="Name"/>
  
    <label>Email</label>
    <input type="email" id="email" name="email"  placeholder="Email"/>
  
    <label>Street</label>
    <input type="text" id="street_address_1" name="street_address_1"  placeholder="Address Line 1"/>
  
  
    <label>Street</label>
    <input type="text" id="street_address_2" name="street_address_2"  placeholder="Address Line 2"/>
  
    <label>City</label>
    <input type="text" id="city" name="city"  placeholder="City"/>
  
    <label>State</label>
    <select id="state" name="state">
    <option value=""></option>
    <option value="AL">Alabama</option>
    <option value="MN">Alaska</option>
    
    </select>
  
    <label>Zip</label>
    <input type="text" id="zip" name="zip"  placeholder="Zip"/>
  
    <div id="card-errors">
  
    </div>
  
    <div>
    <label>Card Number</label>
    <div id="sq-card-number"></div>
    </div>
  
    <div>
    <label>CVV</label>
    <div  id="sq-cvv"></div>
    </div>
  
    <div>
    <label>Expiration Date</label>
    <div  id="sq-expiration-date"></div>
    </div>
  
    <div>
    <label>Postal Code</label>
    <div  id="sq-postal-code"></div>
    </div>
  
    <div>
   <input type="submit" id="submit" value="Buy Now" className="btn btn-primary" onClick={this.props.toggleShop}/>
    </div>
    </form>
     </div> 
   
        </div>
      )
    }
      
    
    }
  
  export default connect(mapStateToProps)(SquareForm);