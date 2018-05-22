import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddProductForm extends Component {
    constructor(props){
        super(props);
        this.state = ({
            newProduct: {
                name: '',
                sku: '',
                type: '',
                imageUrl: '',
                filestackUrl:''
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
                type: '',
                imageUrl: '',
                filestackUrl:''
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
                <h4>Add Product</h4>
                <form id="addProductForm">
                    <input value={this.state.newProduct.name} placeholder="Name" onChange={this.handleInput("name")}/>
                    <input value={this.state.newProduct.sku} placeholder="SKU #" onChange={this.handleInput("sku")}/>
                    <input value={this.state.newProduct.type} placeholder="Sweet or Savory" onChange={this.handleInput("type")}/>
                    <input value={this.state.newProduct.imageUrl} placeholder="Image URL" onChange={this.handleInput("imageUrl")}/>
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