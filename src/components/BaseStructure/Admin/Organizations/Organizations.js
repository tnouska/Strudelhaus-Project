import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import { triggerLogout } from '../../../../redux/actions/loginActions';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
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
            showModal: false,
            snackOpen: false
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


    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ snackOpen: false });
    };

    // dispatch action to saga to create new Org and display on DOM
    addOrganization = (newOrg) => {
        this.props.dispatch({
            type: 'ADD_ORGANIZATION',
            payload: newOrg
        });
        this.setState({ snackOpen: true });
        this.setState({ showModal: false });
    };

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
                <div className="mainDiv">
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <ModalHeader>
                            <Modal.Title>Enter Organization Details</Modal.Title>
                        </ModalHeader>
                        <ModalBody>
                            <AddOrgForm addOrganization={this.addOrganization}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.handleClose}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <div className="orgListDiv">
                        <Button onClick={this.handleShow} className="button">Add Organization</Button>
                        <h2>Organizations</h2>
                        <OrgList/>
                        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center',}} open={this.state.snackOpen}
                                autoHideDuration={1500} onClose={this.handleSnackClose} 
                                message={<span id="message-id">Added Organization!</span>} />
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
export default connect(mapReduxStateToProps)(Organizations);