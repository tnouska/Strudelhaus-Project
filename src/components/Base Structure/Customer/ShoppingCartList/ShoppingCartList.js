import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../../components/Nav/Nav';
// import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
    
    cart: state.orderView
  });

class ShoppingCartList extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        currentCart: this.props.cart 
      };
    }
componentDidMount() {
    
      }
    
componentDidUpdate() {
        
        
      }

addQuantity = (product)=>{
  // parseInt(product.quantity)
console.log("product quantity", product)
product.quantity++
product.quantity = product.quantity.toString()
this.setState({
  currentCart: this.props.cart
})

}
minusQuantity = (product)=>{
  parseInt(product.quantity)
if (product.quantity <= 1){
  const evalProduct = (item => item.product_name === product.product_name);
  const findItem = this.props.cart.findIndex(evalProduct);
  this.props.cart.splice(findItem, 1)
  product.quantity = 0;
  
  this.setState({
    currentCart: this.props.cart
  })
}else{
  console.log("product quantity", product)
  // parseInt(product.quantity)
  
  product.quantity--
  product.quantity = product.quantity.toString()
  console.log(product.quantity)
  this.setState({
    currentCart: this.props.cart
  })
}
  
  
  }
submitTotal = (total)=>{
console.log(total)
this.props.dispatch({
  type: 'CURRENT_TOTAL',
  payload: total
});

}
add(a,b){
return parseInt(a) + parseInt(b)
}
      render() {
        let displayOrder = this.props.cart && this.props.cart.map( (product) => {
          return(
            <div key={product.name}>
            <Button onClick={()=>this.addQuantity(product)}>+</Button>
            <span> {product.quantity} </span>
            <Button onClick={()=>this.minusQuantity(product)}>-</Button> 
            <strong>{product.name} ${product.base_price_money.amount/100}</strong>
            </div>
          )
        })
       
        
let total = 0;
if (this.props.cart.length >= 1){
  
  console.log(this.props.cart)
  
  total = this.props.cart.map( (product) =>{
      return(
        parseInt(product.quantity) * (product.base_price_money.amount/100)
      )
  })
  total = total.reduce(this.add)
}

    
    return (
      <div>
             
             <h2>Shopping Cart</h2>
             {displayOrder}
             
             <h1>Total ${total}</h1>
             {/* <Button>Submit Order</Button> */}
      </div>
    )
  }
    
  
  }

export default connect(mapStateToProps)(ShoppingCartList);
