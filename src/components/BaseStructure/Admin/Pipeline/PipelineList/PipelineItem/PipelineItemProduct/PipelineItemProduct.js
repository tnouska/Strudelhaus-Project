import React, { Component } from 'react';

// Basic, "dumb" component that displays a specific product name being offered by a Campaign

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