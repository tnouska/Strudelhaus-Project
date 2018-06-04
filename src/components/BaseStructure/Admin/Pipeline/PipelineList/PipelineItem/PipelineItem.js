import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button,Table } from 'react-bootstrap';
import printJS from 'print-js'
import PipelineItemProduct from './PipelineItemProduct/PipelineItemProduct';
let moment = require('moment');


// This component displays more info related to each unique Pipeline Campaign

class PipelineItem extends Component {

    printPipeline = () => {        
        printJS({ 
            printable: this.props.pipelineItem.orderData, 
            documentTitle: this.props.pipelineItem.campaign_name,
            header: this.props.pipelineItem.campaign_name + ", Due Date: " + moment(this.props.pipelineItem.campaign_date_end).format("MM-DD-YY"),
            properties: ['product_name', 'product_total'], 
            type: 'json' })
    }

    render(){
        // convert Campaign end date to moment format
        let endDate = moment(this.props.pipelineItem.campaign_date_end).format("M-D-YY");
        // calculate delivery due date based on campaign end date (10 days)
        let dueDate = moment(endDate).add(10, 'days').format("M-D-YY");
        
        

        // map over list of products offered by a specific Campaign, create unique components for each to display on DOM
        let pipelineItemProducts = this.props.pipelineItem.orderData.map((product) => {
            return(<PipelineItemProduct key={product.product_name} product={product}/>)
        })
        console.log('this.props.reduxState', this.props.reduxState);
        

        return(
            <div className="pipelineItem">
                <div className="pipelineItemHeader">
                    <h4>{this.props.pipelineItem.campaign_name} -- Due {dueDate}</h4>
                    <hr/>
                </div>
                <div className="pipelineItemProduct">
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr className="pipelineTr">
                                <th className="pipelineTh">Product</th>
                                <th className="pipelineTh">Quantity Ordered</th>
                            </tr>
                        </thead>
                        {pipelineItemProducts}
                    </Table>
                </div>
                <Button type='button' onClick={this.printPipeline} className="button">Print</Button>
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