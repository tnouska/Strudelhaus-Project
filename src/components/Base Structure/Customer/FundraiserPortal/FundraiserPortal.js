import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
// import { USER_ACTIONS } from '../../redux/actions/userActions';

import { Button } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Modal,Popover,Tooltip } from 'react-bootstrap';
import StrudelList from '../StrudelList/StrudelList';
import ShoppingCartList from '../ShoppingCartList/ShoppingCartList';

const mapStateToProps = state => ({

    view: state.toggleShoppingView
  });
  
class FundraiserPortal extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        show: false
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

  const popover = (
    <Popover id="modal-popover" title="popover">
      very popover. such engagement
    </Popover>
  );
  const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
        let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          
             
      </div>
      
      )
    }
    return (
      <div>
       
        <Nav />
        { content }
        <Grid>
  <Row className="show-grid">
    <Col xs={12} md={8}>
    <Button onClick={()=>this.toggleShop()}>Toggle View</Button>
             
               {this.props.view && <StrudelList />}
               
               <div className="static-modal">
  
</div>
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