import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomerInforForm from '../CustomerInfoForm/CustomerInfoForm'

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

    view: state.toggleShoppingView
  });
  
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
        // this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
        
      }
    
componentDidUpdate() {
        // if (!this.props.user.isLoading && this.props.user.userName === null) {
        //   this.props.history.push('home');
        // }
        
      }


toggleShop = ()=> {
        this.props.dispatch({
          type: 'SHOP_VIEW',
          payload: this.props.view
        });
        
      }
render() {


    return (
      <div>
       
        <Nav />
        <h2>Welcome to the {this.props.match.params.name} Strudel Fundraiser!</h2>
        <Grid>
  <Row className="show-grid">
    <Col xs={12} md={8}>
             <StrudelList campaignName={this.props.match.params.name} />
             <CustomerInforForm />
             <SquareForm campaignName={this.props.match.params.name}/>
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