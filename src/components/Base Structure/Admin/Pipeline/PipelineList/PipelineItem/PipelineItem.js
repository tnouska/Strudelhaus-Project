import React, { Component } from 'react';
import { connect } from 'react-redux';
import PipelineItemProduct from './PipelineItemProduct/PipelineItemProduct';
let moment = require('moment');

// This component displays more info related to each unique Pipeline Campaign

class PipelineItem extends Component {

    render(){
        // convert Campaign end date to moment format
        let endDate = moment(this.props.pipelineItem.campaign_date_end, "MM-DD-YY").toString();
        // calculate delivery due date based on campaign end date (10 days)
        let dueDate = moment(endDate, "MM-DD-YY").add(10, 'days').toString();
        // map over list of products offered by a specific Campaign, create unique components for each to display on DOM
        let pipelineItemProducts = this.props.pipelineItem.orderData.map((product) => {
            return(<PipelineItemProduct key={product.product_name} product={product}/>)
        })

        return(
            <div className="pipelineItem">
                <p>{this.props.pipelineItem.campaign_name} - {this.props.pipelineItem.organization_name} 
                    - Ends {this.props.pipelineItem.campaign_date_end} - Due {dueDate}</p>
                <hr/>
                {pipelineItemProducts}
                <button>Print</button>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(PipelineItem);