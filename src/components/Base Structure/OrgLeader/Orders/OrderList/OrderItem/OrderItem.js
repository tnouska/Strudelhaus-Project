import React, { Component } from 'react';
import { connect } from 'react-redux';

class OrderItem extends Component {

    render() {
        return (
            <tr><td>{this.props.order.name}</td>
                <td>{this.props.order.name_of_reference}</td>
                <td>{this.props.order.date_of_order}</td>
                <td>{this.props.order.notes}</td>
            </tr>
        )
    }
}


const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(OrderItem);