import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import { triggerLogout } from '../../../../redux/actions/loginActions';
import OrgLeaderNav from '../../../Nav/OrgLeaderNav';
import PerformanceItem from './/PerformanceItem/PerformanceItem';

// This is the parent component and main view for the Org Leader "Performance" area of the app. It is also the default Org Leader landing page upon log in
// The Org Leader can view high-level sales data by campaign

class Performance extends Component {
    constructor(props){
        super(props);
        this.state = ({
            selectedCampaign: ''
        })
    };

    // handle Campaign dropdown selection, set state as selected CampaignID
    handleCampaignSelect = (event) => {
        this.setState({
            selectedCampaign: event.target.value
        });
    };

    // on mount get user, campaign performance data (based on user Organization) via sagas/redux
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        
        this.props.dispatch({type: 'GET_PERFORMANCE', payload: {id: this.props.user.userId}})
    };

    componentDidUpdate() {
        // if a user is not logged in, redirect to login page
        if (!this.props.user.isLoading && this.props.user.userName === null ) {
            this.props.history.push('home');
        }
        // if a user is logged in but is not an Org Leader, redirect to login page
        if (!this.props.user.isLoading && this.props.user.userRole !== "leader"){
            this.props.history.push('home');
        }
    };
    
    // log out user
    logout = () => {
        this.props.dispatch(triggerLogout());
    };

    render(){
        // map over array of all Campaigns tied to the user's Organization, make unique dropdown select options for each
        let campaignOptions = this.props.reduxState.orgLeaderPerformance.map((campaignOption) => {
            return(<option key={campaignOption.campaign_id} value={campaignOption.campaign_id}
                >{campaignOption.campaign_name}
                </option>)
        });
        
        return(
            <div>
                <OrgLeaderNav/>
                <div className="mainDiv">
                    <button onClick={this.logout}>Log Out</button>
                    <h3>Campaign Performance</h3>
                    <select title="Campaign"
                            value={this.state.selectedCampaign} onChange={this.handleCampaignSelect}>
                            <option>Campaign</option>
                            {campaignOptions}
                    </select>
                    <PerformanceItem selectedCampaign={this.state.selectedCampaign}/>
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
export default connect(mapReduxStateToProps)(Performance);