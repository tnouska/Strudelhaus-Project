import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductItem extends Component {

    deleteProduct = () => {
        console.log('product:', this.props.product);
        this.props.dispatch({
            type: 'DELETE_PRODUCT',
            payload: this.props.product
        })
    }

    render() {

        return(
            <div className="productItemDiv">
                <p>{this.props.product.name}</p>
                <img className="smallProductImg" src={this.props.product.img_url_1} alt="strudel" />
                <br/>
                <button>Edit</button>
                <button onClick={this.deleteProduct}>Delete</button>
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