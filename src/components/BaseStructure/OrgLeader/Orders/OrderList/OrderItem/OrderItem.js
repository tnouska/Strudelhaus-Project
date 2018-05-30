import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'react-bootstrap'

// This component displays more info related to each unique Order for the selected Campaign

class OrderItem extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            showModal: false
        })
    };
    handleClose = () => {
        console.log('in handleClose: ', this.state.showModal);
        
        this.setState({ showModal: false });
    };

    handleShow = () => {
        console.log('in handleShow: ', this.state.showModal);
        if (!this.state.showModal) {
            this.setState({ showModal: true });

        }
    };
    render() {
        return (
            <tr onClick={this.handleShow}>
                <td>{this.props.order.name}</td>
                <td>{this.props.order.name_of_reference}</td>
                <td>{this.props.order.date_of_order}</td>
                <td>{this.props.order.notes}</td>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <ModalHeader>
                        <Modal.Title>Enter Order Details</Modal.Title>
                    </ModalHeader>
                    <ModalBody>
                        <p>{this.props.order.name}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </tr>


        )
    }
};

const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(OrderItem);