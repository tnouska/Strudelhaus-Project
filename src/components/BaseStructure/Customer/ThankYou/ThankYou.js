import React, { Component } from 'react';
import { Button, Row, Col, Grid } from 'react-bootstrap';


class ThankYou extends Component {
    render() {
  
            return (
                
              <div>

                  <div className="jumbotron text-center">
  <h1 className="display-3">Thank You!</h1>
  <p className="lead"><strong>Please check your email</strong> for your order details.</p>
  <hr/>
  <p>
    Love Strudel? <a href="http://www.thestrudelhaus.com/">Visit Us</a>
  </p>
  <p className="lead">
    <a className="btn btn-primary btn-sm" href="http://www.thestrudelhaus.com/" role="button">Pleas Visit Ruhland's</a>
  </p>
</div>
                  
                </div>
            )
          }      
          
}

export default (ThankYou);