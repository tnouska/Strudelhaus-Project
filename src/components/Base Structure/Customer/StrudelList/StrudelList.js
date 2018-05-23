import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../../components/Nav/Nav';
// import { USER_ACTIONS } from '../../redux/actions/userActions';

import { Button } from 'react-bootstrap';


let products = [{name:'apple', price:15.00, quantity:0},
                {name:'berry', price:15.00, quantity:0},
                {name:'15 cheese', price:20.00, quantity:0},
                {name:'30 cheese', price:50.00, quantity:0}]


const mapStateToProps = state => ({
    // user: state.user,
    // login: state.login,
    cart: state.orderView,
    products: state.customerProducts
  });

class StrudelList extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        
      };
    }
componentDidMount() {
  this.props.dispatch({
    type: 'GET_CUSTOMERPRODUCTS',
    payload: this.props.campaignName
    
  });
        console.log(this.props.products)
      }
    
componentDidUpdate() {
        
      }
addToOrder = (product)=>{

  const evalProduct = (item => item.product_name === product.product_name);
  const findItem = this.props.cart.find(evalProduct);
  if(!findItem){
    console.log(product)
  
    product.quantity = 1
    this.props.dispatch({
      type: 'CURRENT_ORDER',
      payload: product
    });
  }
  
}
subtractFromOrder = (product)=>{
  
  
  product.quantity--
  
  this.props.dispatch({
    type: 'CURRENT_ORDER',
    payload: product
  });
}
render() {
  
let displayProducts = this.props.products && this.props.products.map( (product) => {
  return(
    
      <Button key={product.product_name} onClick={()=>this.addToOrder(product)}>
      <h2>{product.product_name} {product.product_price}</h2> 
      </Button>
  )
})

    return (
      <div>
       
        { displayProducts }
        </div>
    )
  }
    
  
  }

export default connect(mapStateToProps)(StrudelList);