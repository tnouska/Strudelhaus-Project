import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import CampaignItemProduct from './CampaignItemProduct/CampaignItemProduct';


class CampaignItem extends Component {

    deleteCampaign = () => {
        this.props.dispatch({
            type: 'DELETE_CAMPAIGN',
            payload: this.props.campaign
        })
    }

    render() {
        let campaignProducts = this.props.campaign.productList.map((product) => {
            return (<CampaignItemProduct key={product.product_name} product={product}/>)
        });
        let totalSales = 0;
        let goalPercentage = 0;
        for (let i = 0; i < this.props.campaign.productList.length; i++){
            totalSales = totalSales + this.props.campaign.productList[i].productSales;
            goalPercentage = totalSales/this.props.campaign.goal * 100;
        };


        return(
            <div className="campaignItemDiv">
                <p>{this.props.campaign.campaign_name}</p>
                <p>Start Date: {this.props.campaign.date_start}</p>
                <p>End Date: {this.props.campaign.date_end}</p>
                <p>Sales Goal: ${this.props.campaign.goal}</p>
                <p>Total Sales: ${totalSales}</p>
                <ProgressBar now={goalPercentage} />
                <p>Products:</p>
                {campaignProducts}
                <button>Edit</button>
                <button onClick={this.deleteCampaign}>Delete</button>
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