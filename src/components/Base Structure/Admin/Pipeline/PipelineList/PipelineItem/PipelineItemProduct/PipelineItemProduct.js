import React, { Component } from 'react';

class PipelineItemProduct extends Component {

    render(){
        return(
            <div className="pipelineItemProduct">
                <span>{this.props.product.product_name}: {this.props.product.product_total}</span>
            </div>
        
        )
    }
}

export default PipelineItemProduct;