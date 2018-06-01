import React, { Component } from 'react';

// Basic, "dumb" component that displays a specific product name being offered by a Campaign

class PipelineItemProduct extends Component {

    render(){
        return(
            <tbody>
                <tr>
                    <td>
                        {this.props.product.product_name}
                    </td>
                    <td>
                        {this.props.product.product_total}
                    </td>
                </tr>
            </tbody>
        )
    }
}

export default PipelineItemProduct;