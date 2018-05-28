import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomerInforForm from '../CustomerInfoForm/CustomerInfoForm'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Modal,Popover,Tooltip } from 'react-bootstrap';
import StrudelList from '../StrudelList/StrudelList';
import ShoppingCartList from '../ShoppingCartList/ShoppingCartList';
import Nav from '../../../Nav/Nav';
import SquareForm from '../SquareForm/SquareForm';

const mapStateToProps = state => ({
  view: state.toggleShoppingView,
  cart: state.orderView,
  customer: state.customerInfo,
  url: state.paymentView
  });
  let total = 0;
class FundraiserPortal extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        show: false,
        
      };
    }
    handleClose =()=> {
      this.setState({ show: false });
    }
  
    handleShow =()=> {
      this.setState({ show: true });
    }
  
componentDidMount() {
}
    
componentDidUpdate() {
        
        if (this.props.url != this.props.url || this.props.url.length > 3){
          window.location = this.props.url;
        }
      
      }
      postTransaction=()=>{
        this.props.dispatch({
          type: 'POST_CUSTINFO',
          payload: {
                  products: this.props.cart,
                  customerInfo: this.props.customer.customerInfo,
                  campaignName: this.props.match.params.name,
                  total: total
          }
        });
       }


add(a,b){
  return parseInt(a) + parseInt(b)
  }
render() {
  let totalArr = this.props.cart && this.props.cart.map( (product)=>{
    return(
      product.quantity * product.product_price
    )
})

if (this.props.cart.length > 0){
   total = totalArr.reduce(this.add);
}

    return (
      <div>
       
        <Nav />
        <h2>Welcome to the {this.props.match.params.name} Strudel Fundraiser!</h2>
        <Grid>
  <Row className="show-grid">
    <Col xs={12} md={8}>
             <StrudelList campaignName={this.props.match.params.name} />
             <CustomerInforForm />
             <Button onClick={this.postTransaction}>
             Checkout 
             </Button>
             {total}
             {/* <SquareForm campaignName={this.props.match.params.name}/> */}
    </Col>
    <Col xs={6} md={4}>
   <ShoppingCartList />
    
    </Col>
  </Row>
  </Grid>
   
        </div>
    )
  }
  
  
  }

export default connect(mapStateToProps)(FundraiserPortal);