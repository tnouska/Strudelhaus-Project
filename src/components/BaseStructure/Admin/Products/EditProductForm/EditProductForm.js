import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, FormGroup, ControlLabel}  from 'react-bootstrap';
import Select from 'react-select';

class EditProductForm extends Component {
    constructor(props){
        super(props);
        this.state = ({
            updateProduct: {
                name: this.props.product.name,
                description: this.props.product.description,
                price: this.props.product.price,
                sku: this.props.product.sku,
                img_url_1: this.props.product.img_url_1,
                img_ur_2: this.props.product.img_ur_2,
                product_type: this.props.product.product_type,
                product_id: this.props.product.product_id
            }
        });
    };
    editProduct = (event) => {
        event.preventDefault();
        this.props.editProd(this.state.updateProduct);
        this.setState({
            updateProduct: {
                name: '',
                description: '',
                price: '',
                sku: '',
                img_url_1: '',
                img_ur_2: '',
                product_type: ''
            }
        })
    }

    handleInput = (propertyName) => {
        return (event) => {
            this.setState({
                updateProduct: {
                    ...this.state.updateProduct,
                    [propertyName]: event.target.value,
                }
            })
            
        }
    }

    render(){
        return (
            <div>
                <form>
                    <FormGroup>
                        <FormControl value={this.state.updateProduct.name} placeholder="Name" onChange={this.handleInput('name')}/>
                        <FormControl value={this.state.updateProduct.description} placeholder="Description" onChange={this.handleInput('description')}/>
                        <FormControl value={this.state.updateProduct.price} placeholder="Price" onChange={this.handleInput('price')}/>
                        <FormControl value={this.state.updateProduct.sku} placeholder="SKU" onChange={this.handleInput('sku')}/>
                        <FormControl value={this.state.updateProduct.img_url_1} placeholder="Image URL 1" onChange={this.handleInput('img_url_1')}/>
                        <FormControl value={this.state.updateProduct.img_ur_2} placeholder="Image URL 2" onChange={this.handleInput('img_url_2')}/>
                        <FormControl value={this.state.updateProduct.product_type} placeholder="Product Type" onChange={this.handleInput('product_type')}/>
                        <Button type="submit" onClick={this.editProduct}>Save</Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

export default connect(mapReduxStateToProps)(EditProductForm);