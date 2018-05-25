import React, { Component } from 'react';
import { connect } from 'react-redux';
import CampaignItem from './CampaignItem/CampaignItem';


class CampaignList extends Component {

    render() {
        let campaignList;
        if(this.props.selectedOrganization === undefined){
         campaignList = this.props.reduxState.campaign.map((campaign) => {
                return(<CampaignItem key={campaign.campaign_id} campaign={campaign}/>)
            })
        } else {
            let selectedOrgItems = this.props.reduxState.campaign.filter(
                campaign => campaign.id === parseInt(this.props.selectedOrganization));
            campaignList = selectedOrgItems.map((campaign) => {
                return(<CampaignItem key={campaign.campaign_id} campaign={campaign}/>)
            })
        }

        return(
            <div>
                {campaignList}
            </div>
        )
    }
}



const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(CampaignList);