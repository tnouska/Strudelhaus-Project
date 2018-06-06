import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../../components/Nav/Nav';
// import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../ShoppingCartList/ShoppingCartList.css';

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
product.quantity++
product.quantity = product.quantity.toString()
this.setState({
  currentCart: this.props.cart
})

}
minusQuantity = (product)=>{
  product.quantity = parseInt(product.quantity)
if (product.quantity <= 1){
  const evalProduct = (item => item.name === product.name);
  const findItem = this.props.cart.findIndex(evalProduct);
  this.props.cart.splice(findItem, 1)
  product.quantity = 0;
  
  this.setState({
    currentCart: this.props.cart
  })
}else{
  // parseInt(product.quantity)
  
  product.quantity--
  product.quantity = product.quantity.toString()
  this.setState({
    currentCart: this.props.cart
  })
}
  
  
  }
submitTotal = (total)=>{
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
            <div key={product.name} className="itemDiv">
              <Button className="cartBtn" onClick={()=>this.minusQuantity(product)}>-</Button>
              <span><strong>{product.quantity}</strong></span>
              <Button className="cartBtn" onClick={()=>this.addQuantity(product)}>+</Button>
              
              <strong>{product.name} (${product.base_price_money.amount/100})</strong>
            </div>
          )
        })
       
        
let total = 0;
if (this.props.cart.length >= 1){
  
  
  total = this.props.cart.map( (product) =>{
      return(
        parseInt(product.quantity) * (product.base_price_money.amount/100)
      )
  })
  total = total.reduce(this.add)
}

    
    return (
      <div className="shoppingCart">
             <h3>Shopping Cart</h3>
             {displayOrder}
             <h3>Total ${total}</h3>
      </div>
    )
  }
    
  
  }

export default connect(mapStateToProps)(ShoppingCartList);
