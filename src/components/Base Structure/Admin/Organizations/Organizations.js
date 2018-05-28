import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import { triggerLogout } from '../../../../redux/actions/loginActions';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'react-bootstrap';
import AdminNav from '../../../Nav/AdminNav';
import AddOrgForm from '../Organizations/AddOrgForm/AddOrgForm';
import OrgList from './OrgList/OrgList';
import './Organizations.css';

// This is the parent component and main view for the Admin Organization management area of the app.
// The Admin can view, create, edit, and delete Organizations from this page

class Organizations extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            // ensure modal does not show on page load
            showModal: false
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

    // on mount get user and organization data via sagas/redux
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
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
        return(
            <div>
                <AdminNav/>
                <Button onClick={this.handleShow}>Create Organization</Button>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <ModalHeader>
                        <Modal.Title>Enter Organization Details</Modal.Title>
                    </ModalHeader>
                    <ModalBody>
                        <AddOrgForm/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <OrgList/>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(Organizations);