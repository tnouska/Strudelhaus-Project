import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import OrderItem from './OrderItem/OrderItem';

// This component displays a high level list of all Orders for a user-selected Campaign

class OrderList extends Component {

    render() {
        // map over all Orders (for selected Campaign) to create unique items for each Order Object
        let orderRows = this.props.reduxState.order.map((order) => {
            return(<OrderItem  selectedCampaign={this.props.selectedCampaign} key={order.customer_id} order={order}/>)
        })

        return (
            <div>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Referral Name</th>
                            <th>Order Date</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderRows}
                    </tbody>
                </Table>

            </div>
        )
    }
}


const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(OrderList);