import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import StrudelListItem from './StrudelListItem/StrudelListItem';


const mapStateToProps = state => ({
    
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
  console.log(findItem)
  if(!findItem){
    console.log(product)
  
    product.quantity = 1
    this.props.dispatch({
      type: 'CURRENT_ORDER',
      payload: { name: product.product_name,
      quantity: "1",
      base_price_money: { amount: (parseInt(product.product_price)* 100), currency: 'USD' } }
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
    
      <StrudelListItem key={product.product_name} 
      addToOrder={this.addToOrder}
      product={product}/>
      
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