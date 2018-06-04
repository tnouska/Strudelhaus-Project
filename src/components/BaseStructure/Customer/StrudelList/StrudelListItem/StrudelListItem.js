import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button,Modal,OverlayTrigger } from 'react-bootstrap';
import '../StrudelListItem/StrudelListItem.css';

const mapStateToProps = state => ({
    // user: state.user,
    // login: state.login,
    cart: state.orderView,
    products: state.customerProducts
  });

class StrudelListItem extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      
  
      this.state = {
        show: false
      };
    }
  
    handleClose=()=> {
      this.setState({ show: false });
    }
  
    handleShow=()=> {
      this.setState({ show: true });
    }

    handleAdd = (product)=>{
        this.props.addToOrder(product)
        this.handleClose()
    }
    
    render() {
      
  
      return (
        <div className="strudelName">
          {/* <p>Click to get the full Modal experience!</p> */}
  
          <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
            {this.props.product.product_name}
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
              {this.props.product.product_name} -
              ${this.props.product.product_price}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.props.product.product_description}
              <img src={this.props.product.img_url_1} className="portalStrudelImg"/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=>this.handleAdd(this.props.product)} bsStyle="primary">Add to Cart</Button>
              {/* <Button onClick={this.handleClose}>Close</Button> */}
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  export default connect(mapStateToProps)(StrudelListItem);