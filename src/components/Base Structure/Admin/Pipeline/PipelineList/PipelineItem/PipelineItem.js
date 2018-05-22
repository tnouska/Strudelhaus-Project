import React, { Component } from 'react';
import { connect } from 'react-redux';
import PipelineItemProduct from './PipelineItemProduct/PipelineItemProduct';
let moment = require('moment');


class PipelineItem extends Component {

    render(){
        // let endDate = this.props.pipelineItem.campaign_date_end;
        let endDate = moment(this.props.pipelineItem.campaign_date_end, "MM-DD-YY").toString();
        let dueDate = moment(endDate, "MM-DD-YY").add(10, 'days').toString();

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