import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import { triggerLogout } from '../../../../redux/actions/loginActions';
import OrgLeaderNav from '../../../Nav/OrgLeaderNav';
import OrderList from '../Orders/OrderList/OrderList';

// This is the parent component and main view for the Org Leader Order management feature of the app
// The Org Leader can view, create, edit, and delete orders from this view

class Orders extends Component {

    // on mount get user data (based on user Organization) and order data via sagas/redux
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'GET_ORDER', payload: {id: 4}})
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
    };
    
    // log out user
    logout = () => {
        this.props.dispatch(triggerLogout());
    };


    render(){
        return(
            <div>
                <OrgLeaderNav/>
                <OrderList/>
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