import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import { triggerLogout } from '../../../../redux/actions/loginActions';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'react-bootstrap';
import OrgLeaderNav from '../../../Nav/OrgLeaderNav';
import OrderList from '../Orders/OrderList/OrderList';
import printJS from 'print-js'
import AddOrderForm from '../Orders/AddOrderForm/AddOrderForm';
import './Orders.css'


// This is the parent component and main view for the Org Leader Order management feature of the app
// The Org Leader can view, create, edit, and delete orders from this view
let campaignOptions;
class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = ({
        // ensure modal does not show on page load
            showModal: false,
            selectedCampaign: ''
        })
    };

    handleCampaignSelect = (event) => {
        console.log(event.target.value)
        this.setState({
            selectedCampaign: event.target.value
        });        
        this.props.dispatch({ type: 'GET_ORDER', payload: event.target.value})
    };
    
    addOrder = (order) => {
        console.log(order);
        this.props.dispatch({
            type: 'CREATE_ORDER',
            payload: order
        })
        this.setState({ showModal: false });
    };

    // close modal by re-setting state
    handleClose = () => {
        this.setState({ showModal: false });
    };
    
    // open modal by re-setting state
    handleShow = () => {
        this.setState({ showModal: true });
    };

    // on mount get user data (based on user Organization) and order data via sagas/redux
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({type: 'GET_PERFORMANCE', payload: {id: this.props.user.userId}})
        
    };
    

    componentDidUpdate() {
        // if a user is not logged in, redirect to login page
        if (!this.props.user.isLoading && this.props.user.userName === null ) {
            this.props.history.push('home');
        };
        // if a user is logged in but is not an Org Leader, redirect to login page
        if (!this.props.user.isLoading && this.props.user.userRole !== "leader"){
            this.props.history.push('home');
        };
        if(this.props.user.userId != this.props.user.userId || campaignOptions.length < 1 || this.props.reduxState.orgLeaderPerformance[0].id != this.props.user.userId )
        this.props.dispatch({type: 'GET_PERFORMANCE', payload: {id: this.props.user.userId}});
    };
    
    // log out user
    logout = () => {
        this.props.dispatch(triggerLogout());
    };

    printOrder = () =>{
        printJS({
            printable: this.props.reduxState.order,
            documentTitle: 'Current Orders',
            header: 'Current Orders',
            properties: ['name', 'name_of_reference','notes', 'date_of_order' ],
            type: 'json'
        })
    }


    render(){
        // map over array of all Campaigns tied to the user's Organization, make unique dropdown select options for each
        campaignOptions = this.props.reduxState.orgLeaderPerformance.map((campaignOption) => {
            return(<option key={campaignOption.campaign_id} value={campaignOption.campaign_id}
                >{campaignOption.campaign_name}
                </option>)
        });
        return(
            <div>
                <OrgLeaderNav/>
                <div className="mainDiv">
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <ModalHeader>
                            <Modal.Title>Enter Order Details</Modal.Title>
                        </ModalHeader>
                        <ModalBody>
                            <AddOrderForm addOrder={this.addOrder}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.handleClose}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <div className="orderListDiv">
                        <select title="Campaign"
                            value={this.state.selectedCampaign} onChange={this.handleCampaignSelect}>
                            <option>Select Campaign</option>
                            {campaignOptions}
                        </select>
                        <Button onClick={this.handleShow} className="button">Add Cash/Check Order</Button>
                        <h2>Orders</h2>
                        <OrderList selectedCampaign={this.state.selectedCampaign}/>
                        <Button type="button" onClick={this.printOrder}>Print</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(Orders);