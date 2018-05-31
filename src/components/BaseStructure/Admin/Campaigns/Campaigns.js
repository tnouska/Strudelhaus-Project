import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import { triggerLogout } from '../../../../redux/actions/loginActions';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'react-bootstrap';
import AdminNav from '../../../Nav/AdminNav';
import AddCampaignForm from '../Campaigns/AddCampaignForm/AddCampaignForm';
import CampaignList from './CampaignList/CampaignList';
import './Campaigns.css'

// This is the parent component and main view for the Admin Campaign management area of the app.
// The Admin can view, create, edit, and delete Campaigns from this page

class Campaigns extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            // ensure modal does not show on page load
            showModal: false,
            selectedOrganization: undefined
        })
    }

    // close modal by re-setting state
    handleClose = () => {
        this.setState({ showModal: false });
      }
    
    // open modal by re-setting state
    handleShow = () => {
        this.setState({ showModal: true });
    }

    // handle organization dropdown selection, set state as selected org
    handleOrgSelect = (event) => {
        this.setState({
            selectedOrganization: event.target.value
        })
    }

    // create campaign via dispatch to saga, payload coming from child component
    addCampaign = (newCampaign) => {
        this.props.dispatch({
            type: 'ADD_CAMPAIGN',
            payload: newCampaign
        });
        this.setState({ showModal: false });
    };

    // on mount get user, organizations and campaign data via sagas/redux
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'GET_CAMPAIGN'});
        this.props.dispatch({ type: 'GET_ORGANIZATION'});
      }
    
    componentDidUpdate() {
        // if a user is not logged in, redirect to login page
        if (!this.props.user.isLoading && this.props.user.userName === null ) {
            this.props.history.push('home');
        }
        // if a user is logged in but is not an Admin, redirect to login page
        if (!this.props.user.isLoading && this.props.user.userRole !== "admin"){
            this.props.history.push('home');
        }
    }
    
    // log out user
    logout = () => {
        this.props.dispatch(triggerLogout());
    }

    render(){
        // map over array of all Organizations, make unique dropdown select options for each
        let orgOptions = this.props.reduxState.organization.map((orgOption) => {
            return(<option key={orgOption.organization_id} value={orgOption.organization_id}
                    >{orgOption.organization_name}
                    </option>)
        })

        return(
            <div>
                <AdminNav/>
                <div className="mainDiv">
                    <br/>
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <ModalHeader>
                            <Modal.Title>Enter Campaign Details</Modal.Title>
                        </ModalHeader>
                        <ModalBody>
                            <AddCampaignForm addCampaign={this.addCampaign}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.handleClose}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <div className="campaignListDiv">
                        <Button onClick={this.handleShow}>Create Campaign</Button>
                        <div id="select">
                            <p>Sort by Organization</p>
                            <select title="Organization"
                                value={this.state.selectedOrganization} onChange={this.handleOrgSelect}>
                                {orgOptions}
                            </select>
                        </div>
                        <h2>Campaigns</h2>
                        <CampaignList selectedOrganization={this.state.selectedOrganization}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(Campaigns);