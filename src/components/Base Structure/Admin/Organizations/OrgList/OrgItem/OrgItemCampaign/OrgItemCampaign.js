import React, { Component } from 'react';

class OrgItemCampaign extends Component {

    render(){
        return(
            <div>
                <p>{this.props.campaign.campaign_name}</p>
            </div>
        
        )
    }
}

export default OrgItemCampaign;