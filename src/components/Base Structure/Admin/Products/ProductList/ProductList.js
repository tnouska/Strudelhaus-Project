import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductItem from './ProductItem/ProductItem';

class ProductList extends Component {

    render() {

        let productList = this.props.reduxState.product.map((product) => {
            return(<ProductItem key={product.product_id} product={product}/>)
        });


        return(
            <div>
                {productList}
            </div>
        )
    }
}



const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(ProductList);