import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Panel } from 'react-bootstrap';
import EditProductForm from '../../EditProductForm/EditProductForm';

// This component displays more info related to each unique Strudel

class ProductItem extends Component {
    constructor(props){
        super(props);
        // ensure the expansion panel is set to closed upon load
        this.state = ({
            panelOpen: false,
            showModal: false
        })
    };

    handleClose = () => {
        this.setState({ showModal: false });
    }

    handleShow = () => {
        this.setState({ showModal: true });
    }

    // delete a specific Org by dispatching to saga
    deleteProduct = () => {
        this.props.dispatch({
            type: 'DELETE_PRODUCT',
            payload: this.props.product
        })
    };

    editProd = (updateProduct) => {
        this.props.dispatch({
            type: 'EDIT_PRODUCT',
            payload: updateProduct
        })
        this.setState({ showModal: false });
    }

    render() {
        return(
            <div>
                <Panel id="collapsible-panel-example-2">
                    <Panel.Heading>
                        <Panel.Title toggle>
                        {this.props.product.name}
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <img className="smallProductImg" src={this.props.product.img_url_1} alt="strudel" />
                            <br/>
                            <Button onClick={this.handleShow}>Edit</Button>
                            <Button onClick={this.deleteProduct}>Delete</Button>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <ModalHeader>
                        <Modal.Title>Update Product Details</Modal.Title>
                    </ModalHeader>
                    <ModalBody>
                        <EditProductForm product={this.props.product} editProd={this.editProd} />
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
export default connect(mapReduxStateToProps)(ProductItem);