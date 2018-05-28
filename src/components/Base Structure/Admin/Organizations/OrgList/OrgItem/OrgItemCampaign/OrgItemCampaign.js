import React, { Component } from 'react';

// Basic, "dumb" component that displays a specific Campaign name tied to a specific Organization

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