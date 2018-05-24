import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddProductForm extends Component {
    constructor(props){
        super(props);
        this.state = ({
            newProduct: {
                name: '',
                sku: '',
                product_type: '',
                image_url_1: '',
                image_url_2:'',
                description: ''
            }
        });
    };

    addProduct = (event) => {
        event.preventDefault();
        console.log(this.state.newProduct);
        
        this.props.dispatch({
            type: 'ADD_PRODUCT',
            payload: this.state.newProduct
        })
        // Clear input fields after dispatching
        this.setState({
            newProduct: {
                name: '',
                sku: '',
                product_type: '',
                image_url_1: '',
                image_url_2:'',
                description: ''
            }
        })
    };

    // Capture user inputs so we can store in our local state
    handleInput = (propertyName) => {
        return (event) => {          
            // Set state as the previous state + the updated given property added by the user
            this.setState({
                newProduct: {
                    ...this.state.newProduct,
                    [propertyName]: event.target.value,
                }
            })
        }
    }

    render(){
        return(
            <div>
                <form id="addProductForm">
                    <input value={this.state.newProduct.name} placeholder="Name" onChange={this.handleInput("name")}/>
                    <input value={this.state.newProduct.sku} placeholder="SKU #" onChange={this.handleInput("sku")}/>
                    <input value={this.state.newProduct.product_type} placeholder="1=sweet, 2=savory" onChange={this.handleInput("product_type")}/>
                    <input value={this.state.newProduct.image_url_1} placeholder="Image URL" onChange={this.handleInput("image_url_1")}/>
                    <input value={this.state.newProduct.description} placeholder="description" onChange={this.handleInput("description")}/>
                    <button type="submit" onClick={this.addProduct}>Create!</button>
                </form>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(AddProductForm);