import React, { Component } from 'react';
import { connect } from 'react-redux';
import CampaignItem from './CampaignItem/CampaignItem';

// This component displays a high level list of all Campaigns. If the user has selected a specific Organization,
// it will only display Campaigns tied to that specific Org

class CampaignList extends Component {

    render() {
        let campaignList;
        // if no Org is selected, display all Campaigns
        // map over all Organizations to create unique items for each Campaign Object
        if(this.props.selectedOrganization === undefined){
         campaignList = this.props.reduxState.campaign.map((campaign) => {
                return(<CampaignItem key={campaign.campaign_id} campaign={campaign}/>)
            })
        } else {
        // if an Org has been selected, filter the redux state to only show Campaigns tied to that Org
        // map over these Campaigns to create unique items for each Campaign Object
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