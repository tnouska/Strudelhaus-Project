import React, { Component } from 'react';
import { connect } from 'react-redux';
import CampaignItemProduct from './CampaignItemProduct/CampaignItemProduct';

class CampaignItem extends Component {

    render() {

        let campaignProducts = this.props.campaign.productList.map((product) => {
            return (<CampaignItemProduct key={product.product_name} product={product}/>)
        });
        // let totalSales;
        // for (let i = 0; i < this.props.campaign.productList.length; i++){
        //     console.log(this.props.campaign.productList[i].productSales);
        //     let totalSales = totalSales + this.props.campaign.productList[i].productSales;
        //     console.log(totalSales);
               
        // }


        return(
            <div className="campaignItemDiv">
                <p>{this.props.campaign.campaign_name}</p>
                <p>Start Date: {this.props.campaign.date_start}</p>
                <p>End Date: {this.props.campaign.date_end}</p>
                <p>Sales Goal: ${this.props.campaign.goal}</p>
                <p>Total Sales: $</p>
                <p>Products:</p>
                {campaignProducts}
            </div>
        )
    };
};

const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(CampaignItem);