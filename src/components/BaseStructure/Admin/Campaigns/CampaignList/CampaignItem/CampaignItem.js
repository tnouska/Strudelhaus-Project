import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Panel, ProgressBar } from 'react-bootstrap';
import CampaignItemProduct from './CampaignItemProduct/CampaignItemProduct';
import EditCampForm from '../../EditCampForm/EditCampForm';

// This component displays more info related to each unique Campaign

class CampaignItem extends Component {
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

    editCamp = (updateCamp) => {
        this.props.dispatch({
            type: 'EDIT_CAMPAIGN',
            payload: updateCamp
        })
        this.setState({ showModal: false });
    }

    // delete a specific Campaign by dispatching to saga
    deleteCampaign = () => {
        this.props.dispatch({
            type: 'DELETE_CAMPAIGN',
            payload: this.props.campaign
        })
    }

    render() {
        // map over list of products offered by a specific Campaign, create unique components for each to display on DOM
        let campaignProducts = this.props.campaign.productList.map((product) => {
            return (<CampaignItemProduct key={product.product_name} product={product}/>)
        });
        // loop over sales for each Campaign product to get a sum of all Campaign sales, then calculate % of Campaign sales goal
        let totalSales = 0;
        let goalPercentage = 0;
        for (let i = 0; i < this.props.campaign.productList.length; i++){
            totalSales = totalSales + this.props.campaign.productList[i].productSales;
            goalPercentage = totalSales/this.props.campaign.goal * 100;
        };
        let panelColor = {backgroundColor: '#880F1B'};

        return(
            <div>
                <Panel className="campaignPanel">
                    <Panel.Heading style={panelColor}>
                        <Panel.Title className="panelTitle" toggle>
                        {this.props.campaign.campaign_name}
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <p>Start Date: {this.props.campaign.date_start}</p>
                            <p>End Date: {this.props.campaign.date_end}</p>
                            <p>Sales Goal: ${this.props.campaign.goal}</p>
                            <p>Total Sales: ${totalSales}</p>
                            <ProgressBar now={goalPercentage} />
                            <p>Products:</p>
                            {campaignProducts}
                            <Button onClick={this.handleShow}>Edit</Button>
                            <Button onClick={this.deleteCampaign}>Delete</Button>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <ModalHeader>
                        <Modal.Title>Update Campaign Details</Modal.Title>
                    </ModalHeader>
                    <ModalBody>
                        <EditCampForm campaign={this.props.campaign} editCamp={this.editCamp} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    };
};

const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(CampaignItem);