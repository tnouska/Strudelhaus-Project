import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';

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
        console.log(selectedCampaign);
        console.log(selectedCampaign.orderList);
    
        let totalSales = 0;
        let goalPercentage = 0;
        // for (let i = 0; i < selectedCampaign.orderList.length; i++){
        //     totalSales = totalSales + selectedCampaign.orderList[i].productSales
        // }
        
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