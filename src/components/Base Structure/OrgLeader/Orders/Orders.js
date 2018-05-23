import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import { triggerLogout } from '../../../../redux/actions/loginActions';
import OrgLeaderNav from '../../../Nav/OrgLeaderNav';
import OrderList from '../Orders/OrderList/OrderList';

class Orders extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
      }
    
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null ) {
            this.props.history.push('home');
        }
        if (!this.props.user.isLoading && this.props.user.userRole !== "leader"){
            this.props.history.push('home');
        }
    }
    
    logout = () => {
        this.props.dispatch(triggerLogout());
        // this.props.history.push('home');
    }


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