import React, { Component } from 'react';
import { connect } from 'react-redux';

class PerformanceItem extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidUpdate(){
        console.log(this.props.selectedCampaign);
        
    }
    

    render(){
        let selectedCampaignArray = this.props.reduxState.orgLeaderPerformance.filter(
            campaign => campaign.campaign_id === parseInt(this.props.selectedCampaign));
        let selectedCampaign = {...selectedCampaignArray[0]}
        console.log(selectedCampaign.campaign_name);
        
        return(
            <div>
                <h2>{selectedCampaign.campaign_name}</h2>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(PerformanceItem);