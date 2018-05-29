import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';

// This component displays more info related to the specific Campaign selected by the Org Leader

class PerformanceItem extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        // Extract specific user-selected Campaign based on campaign_id
        let selectedCampaign = this.props.reduxState.orgLeaderPerformance.find(
            campaign => campaign.campaign_id === parseInt(this.props.selectedCampaign));
        // declare sales metric variables
        let totalSales = 0;
        let goalPercentage = 0;
        let goal = 0;
        // if no Campaign has been selected, keep sales metric variables at 0
        if (selectedCampaign === undefined) {
        } else {
            // if a Campaign has been selected, loop over sales for each Campaign product to get a sum of all Campaign sales
            // Calculate % of Campaign sales goal
            for (let i = 0; i < selectedCampaign.orderList.length; i++){
                totalSales = totalSales + selectedCampaign.orderList[i].productSales;
                goal = selectedCampaign.goal;
                goalPercentage = Math.round((totalSales/selectedCampaign.goal * 100));
            };
        }
        
        return(
            <div>
                <h2>Current Sales: ${totalSales}</h2>
                <h2>Campaign Goal: ${goal}</h2>
                <h2>{goalPercentage}%</h2>
                <ProgressBar now={goalPercentage} />
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