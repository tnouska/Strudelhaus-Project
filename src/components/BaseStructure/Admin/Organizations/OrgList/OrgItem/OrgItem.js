import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrgItemCampaign from './OrgItemCampaign/OrgItemCampaign';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Panel } from 'react-bootstrap';
import EditOrgForm from '../../EditOrgForm/EditOrgForm';


// This component displays more info related to each unique Organization

class OrgItem extends Component {
    constructor(props){
        super(props);
        // ensure the expansion panel is set to closed upon load
        this.state = ({
            panelOpen: false,
            showModal: false
        })
    }

    handleClose = () => {
        this.setState({ showModal: false });
    }

    handleShow = () => {
        this.setState({ showModal: true });
    }

    editOrg = (updateOrg) => {
        this.props.dispatch({
            type: 'EDIT_ORGANIZATION',
            payload: updateOrg
        })
        this.setState({ showModal: false });
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
        let panelColor = {backgroundColor: '#880F1B'}

        return(
            <div>
                <Panel className="orgPanel">
                    <Panel.Heading style={panelColor}>
                        <Panel.Title className="panelTitle" toggle>
                        {this.props.org.organization_name}
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                        <div className="column">
                            <p><strong>Contact</strong></p>
                            {this.props.org.contact_name}<br/>
                            {this.props.org.street_address}<br/>
                            {this.props.org.city}, {this.props.org.state} {this.props.org.zip_code}<br/>
                            {this.props.org.contact_phone}<br/>
                            {this.props.org.contact_email}<br/>
                        </div>
                        <div className="column">
                            <p><strong>Campaigns</strong></p>
                            {campaignList}
                        </div>
                            <Button onClick={this.handleShow}>Edit</Button>
                            <Button onClick={this.deleteOrg}>Delete</Button> 
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <ModalHeader>
                        <Modal.Title>Update Organization Details</Modal.Title>
                    </ModalHeader>
                    <ModalBody>
                        <EditOrgForm org={this.props.org} editOrg={this.editOrg}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </ModalFooter>
                </Modal>
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