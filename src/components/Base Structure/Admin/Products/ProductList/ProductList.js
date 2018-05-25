import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductItem from './ProductItem/ProductItem';

// This component displays a high level list of all Strudels being offered for fundraising Campaign sales. 

class ProductList extends Component {

    render() {
        // map over all Products to create unique items for each Product Object
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