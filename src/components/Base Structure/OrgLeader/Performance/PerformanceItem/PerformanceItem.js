import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';

class PerformanceItem extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }


    render(){
        let selectedCampaign = this.props.reduxState.orgLeaderPerformance.find(
            campaign => campaign.campaign_id === parseInt(this.props.selectedCampaign));
        let totalSales = 0;
        let goalPercentage = 0;
        let goal = 0;
        if (selectedCampaign === undefined) {
        } else {
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