import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Panel } from 'react-bootstrap';
import OrgItemCampaign from './OrgItemCampaign/OrgItemCampaign';

// This component displays more info related to each unique Organization

class OrgItem extends Component {
    constructor(props){
        super(props);
        // ensure the expansion panel is set to closed upon load
        this.state = ({
            panelOpen: false
        })
    }

    // delete a specific Org by dispatching to saga
    deleteOrg = () => {
        this.props.dispatch({
            type: 'DELETE_ORGANIZATION',
            payload: this.props.org
        })
    }

    render() {
        // alias array of Campaigns tied to this specific Org, map over to create unique component for each Campaign
        let campaigns = this.props.org.campaignData;
        let campaignList = campaigns.map((campaign) => {
            return(<OrgItemCampaign key={campaign.campaign_id} campaign={campaign}/>)
        })

        return(
            <div>
                <Panel id="collapsible-panel-example-2">
                    <Panel.Heading>
                        <Panel.Title toggle>
                        {this.props.org.organization_name}
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                        Contact: {this.props.org.contact_name}
                        <p>Campaigns</p>
                        {campaignList}
                        <Button>Edit</Button>
                        <Button onClick={this.deleteOrg}>Delete</Button> 
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
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