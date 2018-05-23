import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductItem extends Component {

    render() {

        return(
            <div className="productItemDiv">
                <p>{this.props.product.name}</p>
                <img className="smallProductImg" src={this.props.product.img_url_1} alt="strudel" />
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