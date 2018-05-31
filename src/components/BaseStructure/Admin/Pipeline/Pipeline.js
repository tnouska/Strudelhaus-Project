import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import { triggerLogout } from '../../../../redux/actions/loginActions';
import AdminNav from '../../../Nav/AdminNav';
import PipelineList from './PipelineList/PipelineList';
import './Pipeline.css';

// This is the parent component and main view for the Admin "Pipeline" area of the app. It is also the default Admin landing page upon log in
// The Admin can view detailed sales data for Campaigns nearing completion and can print this data to manage prep and production timelines

class Pipeline extends Component {

    // on mount, get pipeline data (sales by campaign by product for soon-ending Campaigns) and user data
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({type: 'GET_PIPELINE'});
      }
    
    componentDidUpdate() {
        // if a user is not logged in, redirect to login page
        if (!this.props.user.isLoading && this.props.user.userName === null ) {
            this.props.history.push('home');
        }
        // if a user is logged in but is not an Admin, redirect to login page
        if (!this.props.user.isLoading && this.props.user.userRole !== "admin"){
            this.props.history.push('home');
        }
    }
    
    // log out user
    logout = () => {
        this.props.dispatch(triggerLogout());
    }

    render(){
        return(
            <div>
                <AdminNav/>
                <div className="mainDiv">
                    <button onClick={this.logout}>Log Out</button>
                    <div className="pipelineListDiv">
                        <h2>Production Pipeline</h2>
                        <PipelineList/>
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
export default connect(mapReduxStateToProps)(Pipeline);