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
    cart: state.orderView
  });

class StrudelList extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        
      };
    }
componentDidMount() {
        // this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
        
      }
    
componentDidUpdate() {
        // if (!this.props.user.isLoading && this.props.user.userName === null) {
        //   this.props.history.push('home');
        // }
      }
addToOrder = (product)=>{

  const evalProduct = (item => item.name === product.name);
  const findItem = this.props.cart.find(evalProduct);
  if(!findItem){
    console.log(product)
  
    product.quantity++
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
let displayProducts = products.map( (product) => {
  return(
  
      <Button key={product.name} onClick={()=>this.addToOrder(product)}>
      <h2>{product.name} {product.price}</h2>
      </Button>
   
    
  )
})
        let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
             <h2>Item Page</h2>
             {displayProducts}
      </div>
      
      )
    }
    return (
      <div>
       
       
        { content }
        </div>
    )
  }
    
  
  }

export default connect(mapStateToProps)(StrudelList);