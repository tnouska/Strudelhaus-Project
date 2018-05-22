import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrgItemCampaign from './OrgItemCampaign/OrgItemCampaign';

class OrgItem extends Component {

    render() {
        let campaigns = this.props.org.campaignData;
        let campaignList = campaigns.map((campaign) => {
            return(<OrgItemCampaign key={campaign.campaign_id} campaign={campaign}/>)
        })

        return(
            <div className="orgItemDiv">
                <p>{this.props.org.organization_name}</p>
                <p>Contact: {this.props.org.contact_name}</p>
                <p>Campaigns</p>
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
export default connect(mapReduxStateToProps)(OrgItem);