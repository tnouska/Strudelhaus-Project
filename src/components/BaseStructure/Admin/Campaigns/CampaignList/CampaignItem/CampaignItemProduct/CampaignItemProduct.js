import React, { Component } from 'react';

// Basic, "dumb" component that displays a specific product name being offered by a Campaign

class CampaignItemProduct extends Component {

    render(){
        return(
            <div className="campaignItemProduct">
                <p>{this.props.product.name}</p>
            </div>
        )
    }
}

export default CampaignItemProduct;