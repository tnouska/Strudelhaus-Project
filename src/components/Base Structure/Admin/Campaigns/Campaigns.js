import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import { triggerLogout } from '../../../../redux/actions/loginActions';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'react-bootstrap';
import AdminNav from '../../../Nav/AdminNav';
import AddCampaignForm from '../Campaigns/AddCampaignForm/AddCampaignForm';
import CampaignList from './CampaignList/CampaignList';
import './Campaigns.css'

class Campaigns extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            showModal: false,
            selectedOrganization: undefined
        })
    }

    handleClose = () => {
        this.setState({ showModal: false });
      }
    
    handleShow = () => {
        this.setState({ showModal: true });
        // console.log('showing!');
    }

    handleCampaignSelect = (event) => {
        this.setState({
            selectedOrganization: event.target.value
        })
        console.log(this.state);
    }
    
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'GET_CAMPAIGN'});
        this.props.dispatch({ type: 'GET_ORGANIZATION'});
      }
    
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null ) {
            this.props.history.push('home');
        }
        if (!this.props.user.isLoading && this.props.user.userRole !== "admin"){
            this.props.history.push('home');
        }
    }
    
    logout = () => {
        this.props.dispatch(triggerLogout());
        // this.props.history.push('home');
    }
    render(){
        let orgOptions = this.props.reduxState.organization.map((orgOption) => {
            return(<option key={orgOption.organization_id} value={orgOption.organization_name}
                    >{orgOption.organization_name}
                    </option>)
        })

        return(
            <div>
                <AdminNav/>
                <Button onClick={this.handleShow}>Create Campaign</Button>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <ModalHeader>
                        <Modal.Title>Enter Campaign Details</Modal.Title>
                    </ModalHeader>
                    <ModalBody>
                        <AddCampaignForm/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <select title="Organization"
                        value={this.state.selectedCampaign} onChange={this.handleCampaignSelect}>
                        {orgOptions}
                </select>
                <CampaignList selectedOrganization={this.state.selectedOrganization}/>
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