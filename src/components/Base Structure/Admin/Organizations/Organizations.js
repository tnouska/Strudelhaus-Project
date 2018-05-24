import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import { triggerLogout } from '../../../../redux/actions/loginActions';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'react-bootstrap';
import AdminNav from '../../../Nav/AdminNav';
import AddOrgForm from '../Organizations/AddOrgForm/AddOrgForm';
import OrgList from './OrgList/OrgList';
import './Organizations.css';

class Organizations extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            showModal: false
        })
    }

    handleClose = () => {
        this.setState({ showModal: false });
      }
    
    handleShow = () => {
        this.setState({ showModal: true });
        // console.log('showing!');
        
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
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