import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'react-bootstrap'
import SweetAlert from 'sweetalert2-react';


// This component displays more info related to each unique Order for the selected Campaign

class OrderItem extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            showModal: false,
            showAlert: false
        })
    };
    handleClose = () => {
        this.setState({ showModal: false });
    };

    handleShow = () => {
        if (!this.state.showModal) {
            this.setState({ showModal: true });
        }
    };
    handleShowAlert = () => {
        this.setState({
            showAlert: true
        })
    }
    deleteOrder = () => {
        this.setState({
            showAlert: false
        })
        this.props.dispatch({
            type: 'DELETE_ORDER',
            payload: {
                customer_id: this.props.order.customer_id,
                id: this.props.selectedCampaign
            }
        })
    }
    render() {
        let orderTotal = 0
        let productsOrdered = this.props.order.customer_order.map((product) => {
            orderTotal += (product.price * product.quantity)
            return (
                <tr key={product.name}>
                    <td>{product.name}, ${product.price}.00</td>
                    <td>{product.quantity}</td>
                </tr>

            )
        })
        return (
            <tr onClick={this.handleShow}>
                <td>{this.props.order.name}</td>
                <td>{this.props.order.name_of_reference}</td>
                <td>{this.props.order.date_of_order}</td>
                <td>{this.props.order.notes}</td>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <ModalHeader>
                        <Modal.Title>Order Details for {this.props.order.name}</Modal.Title>
                    </ModalHeader>
                    <ModalBody>
                        <Table striped bordered condensed hover>
                            <thead>
                                <th>Contact Address</th>
                            </thead>
                            <tbody>
                                <tr><td>{this.props.order.street_address} {this.props.order.city}, {this.props.order.state} {this.props.order.zip_code} </td></tr>
                            </tbody>
                            <thead>
                                <th>Email Address</th>
                            </thead>
                            <tbody>
                                <tr><td>{this.props.order.email_address}</td></tr>
                            </tbody>
                            <thead>
                                <th>Products Ordered</th>
                                <th>Quantity</th>
                            </thead>
                            <tbody>
                                {productsOrdered}
                            </tbody>
                            <thead>
                                <th>Order Total</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${orderTotal}.00</td>
                                </tr>
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleShowAlert}>Delete</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <SweetAlert
                    show={this.state.showAlert}
                    title="Delete Order?"
                    text="Would you like to Delete this Order?"
                    confirmButtonText={'Yes, Delete'}
                    confirmButtonColor={'#FF530D'}
                    showCancelButton={true}
                    cancelButtonText={'No'}
                    onConfirm={this.deleteOrder}
                    onCancel={() => this.setState({ showAlert: false})}
                />
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