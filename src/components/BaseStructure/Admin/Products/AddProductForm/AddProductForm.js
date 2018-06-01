import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, FormGroup, ControlLabel}  from 'react-bootstrap';
import Select from 'react-select';

// This component is a form which the Admin uses to create a new product/strudel that can be sold in a Campaign

class AddProductForm extends Component {
    constructor(props){
        super(props);
        this.state = ({
            newProduct: {
                name: '',
                sku: '',
                product_price: '',
                product_type: '',
                image_url_1: '',
                image_url_2:'',
                description: ''
            }
        });
    };

    // dispatch action to saga to create new Product and display on DOM
    addProduct = (event) => {
        event.preventDefault();
        this.props.addProduct(this.state.newProduct)
        // Clear input fields after dispatching
        this.setState({
            newProduct: {
                name: '',
                sku: '',
                product_price: '',
                product_type: '',
                image_url_1: '',
                image_url_2:'',
                description: ''
            }
        })
    };

    fillForm = () =>{
        this.setState({
            newProduct: {
                name: 'Poppy Seed',
                sku: '44',
                product_price: '15.00',
                product_type: '1',
                image_url_1: 'https://platedcravings.com/wp-content/uploads/2017/12/Apple-Strudel-Recipe-Plated-Cravings-10-500x427.jpg',
                image_url_2:'',
                description: 'The rich taste of ground poppy seeds, cream, honey, sugar and currants make one hearken back to the taste of the Old Country.'
            }
        })
    }

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
                    <FormGroup>
                        <FormControl value={this.state.newProduct.name} placeholder="Name" onChange={this.handleInput("name")}/>
                        <FormControl value={this.state.newProduct.sku} placeholder="SKU #" onChange={this.handleInput("sku")}/>
                        <FormControl value={this.state.newProduct.product_price} placeholder="Price $" onChange={this.handleInput("product_price")}/>
                        <select value={this.state.newProduct.product_type} onChange={this.handleInput("product_type")}>
                            <option value="1">Sweet</option>
                            <option value="2">Savory</option>
                        </select>
                        <FormControl value={this.state.newProduct.image_url_1} placeholder="Image URL" onChange={this.handleInput("image_url_1")}/>
                        <FormControl value={this.state.newProduct.description} placeholder="description" onChange={this.handleInput("description")}/>
                        <div onClick={this.fillForm}> </div>{/* special blank character in between  */}
                        <Button type="submit" onClick={this.addProduct}>Create!</Button>
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

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(AddProductForm);