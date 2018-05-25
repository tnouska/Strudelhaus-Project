import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import { triggerLogout } from '../../../../redux/actions/loginActions';
import OrgLeaderNav from '../../../Nav/OrgLeaderNav';
import PerformanceItem from './/PerformanceItem/PerformanceItem';

class Performance extends Component {
    constructor(props){
        super(props);
        this.state = ({
            selectedCampaign: ''
        })
    };

    handleCampaignSelect = (event) => {
        this.setState({
            selectedCampaign: event.target.value
        });
    };

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({type: 'GET_PERFORMANCE', payload: {id: 2}})
    };
    
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null ) {
            this.props.history.push('home');
        }
        if (!this.props.user.isLoading && this.props.user.userRole !== "leader"){
            this.props.history.push('home');
        }
    };
    
    logout = () => {
        this.props.dispatch(triggerLogout());
        // this.props.history.push('home');
    };

    render(){
        let campaignOptions = this.props.reduxState.orgLeaderPerformance.map((campaignOption) => {
            return(<option key={campaignOption.campaign_id} value={campaignOption.campaign_id}
                >{campaignOption.campaign_name}
                </option>)
        });
        

        return(
            <div>
                <OrgLeaderNav/>
                <button onClick={this.logout}>Log Out</button>
                <h3>Campaign Performance</h3>
                <select title="Campaign"
                        value={this.state.selectedCampaign} onChange={this.handleCampaignSelect}>
                        <option>Campaign</option>
                        {campaignOptions}
                </select>
                <PerformanceItem selectedCampaign={this.state.selectedCampaign}/>
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