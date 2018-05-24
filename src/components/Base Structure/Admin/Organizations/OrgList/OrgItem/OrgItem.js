import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Panel } from 'react-bootstrap';
import OrgItemCampaign from './OrgItemCampaign/OrgItemCampaign';

class OrgItem extends Component {
    constructor(props){
        super(props);
        this.state = ({
            panelOpen: false
        })
    }

    deleteOrg = () => {
        console.log('org:', this.props.org);
        this.props.dispatch({
            type: 'DELETE_ORGANIZATION',
            payload: this.props.org
        })
    }

    render() {
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
                {/* // <p>{this.props.org.organization_name}</p>
                // <p>Contact: {this.props.org.contact_name}</p>
                // <p>Campaigns</p>
                // {campaignList}
                // <button>Edit</button>
                // <button onClick={this.deleteOrg}>Delete</button> */}
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