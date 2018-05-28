import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button,FormGroup,ControlLabel,FormControl,HelpBlock } from 'react-bootstrap';


const mapStateToProps = state => ({
    
    cart: state.orderView,
    products: state.customerProducts
  });

class CustomerInfoForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        //   customerInfo:{
        refname: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        notes: '',
        billingName: ''
        //   }
      };
    }
    
//   getValidationState =()=> {
//     const length = this.state.value.length;
//     if (length > 10) return 'success';
//     else if (length > 5) return 'warning';
//     else if (length > 0) return 'error';
//     return null;
//   }

handleChange = ( inputText )=>{
    
          return (event) => {
             
              this.setState({
                
                [inputText]: event.target.value
              
              });
              console.log(this.state)
              this.props.dispatch({
                type: 'CURRENT_CUSTOMERINFO',
                payload: {customerInfo:this.state}
              });
            }
            
          }

render() {
  
            return (
              <div>
                  
                <form>
        <FormGroup
          controlId="formBasicText"
        // validationState={this.getValidationState()}
        > 
        <ControlLabel>Reference Name</ControlLabel>
          <FormControl
            value={this.state.name}
            type="text"
            placeholder="Enter Name"
            onChange={this.handleChange("refName")}
            required
          />
          <ControlLabel>Billing Name</ControlLabel>
          <FormControl
            value={this.state.name}
            type="text"
            placeholder="Enter Name"
            onChange={this.handleChange("billingName")}
          />
          <ControlLabel>Email</ControlLabel>
          <FormControl
            value={this.state.email}
            type="text"
            placeholder="Enter Email"
            onChange={this.handleChange("email")}
         /> 
         <ControlLabel>Address</ControlLabel>
         <FormControl
            value={this.state.address}
            type="text"
            placeholder="Enter Address"
            onChange={this.handleChange("address")}
         /> 
         <ControlLabel>City</ControlLabel>
         <FormControl
            value={this.state.city}
            type="text"
            placeholder="Enter City"
            onChange={this.handleChange("city")}
         /> 
         <ControlLabel>State</ControlLabel>
         <FormControl
            value={this.state.state}
            type="text"
            placeholder="Enter State"
            onChange={this.handleChange("state")}
         /> 
         <ControlLabel>Zip</ControlLabel>
         <FormControl
            value={this.state.zip}
            type="text"
            placeholder="Enter Zip Code"
            onChange={this.handleChange("zip")}
         /> 
         <ControlLabel>Notes</ControlLabel>
         <FormControl
            value={this.state.notes}
            type="text"
            placeholder="Enter Notes"
            onChange={this.handleChange("notes")}
         /> 
          {/* <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>  */}
      </FormGroup>
      </form>
                </div>
            )
          }
            
          
          }
        
 export default connect(mapStateToProps)(CustomerInfoForm);