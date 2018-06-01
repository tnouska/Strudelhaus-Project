import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Panel } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import EditProductForm from '../../EditProductForm/EditProductForm';

// This component displays more info related to each unique Strudel

class ProductItem extends Component {
    constructor(props){
        super(props);
        // ensure the expansion panel is set to closed upon load
        this.state = ({
            panelOpen: false,
            showModal: false,
            snackOpen: false
        })
    };

    handleClose = () => {
        this.setState({ showModal: false, snackOpen: false });
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
        this.setState({ showModal: false, snackOpen: true  });
    }

    render() {

        let panelColor = {backgroundColor: '#880F1B'};

        return(
            <div>
                <Panel className="productPanel">
                    <Panel.Heading style={panelColor}>
                        <Panel.Title className="panelTitle" toggle>
                        {this.props.product.name}
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <div className="column">
                                <img className="smallProductImg" src={this.props.product.img_url_1} alt="strudel" />
                            </div>
                            <div className="column">
                                <p>{this.props.product.description}</p>
                                <Button onClick={this.handleShow}>Edit</Button>
                                <Button onClick={this.deleteProduct}>Delete</Button>
                            </div>
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
                <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center',}} open={this.state.snackOpen}
                            autoHideDuration={1500} onClose={this.handleClose}
                            message={<span id="message-id">Edited {this.props.product.name} Strudel!</span>} />
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