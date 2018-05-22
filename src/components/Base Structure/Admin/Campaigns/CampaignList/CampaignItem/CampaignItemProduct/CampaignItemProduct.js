import React, { Component } from 'react';

class CampaignItemProduct extends Component {

    render(){
        return(
            <div className="campaignItemProduct">
                <p>{this.props.product.product_name}</p>
            </div>
        
        )
    }
}

export default CampaignItemProduct;