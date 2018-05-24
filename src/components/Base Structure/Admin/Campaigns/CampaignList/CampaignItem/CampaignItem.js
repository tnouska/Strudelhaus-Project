import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar, Button, Panel } from 'react-bootstrap';
import CampaignItemProduct from './CampaignItemProduct/CampaignItemProduct';


class CampaignItem extends Component {
    constructor(props){
        super(props);
        this.state = ({
            panelOpen: false
        })
    }

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
            <div>
                <Panel id="collapsible-panel-example-2">
                    <Panel.Heading>
                        <Panel.Title toggle>
                        {this.props.campaign.campaign_name}
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <p>Start Date: {this.props.campaign.date_start}</p>
                            <p>End Date: {this.props.campaign.date_end}</p>
                            <p>Sales Goal: ${this.props.campaign.goal}</p>
                            <p>Total Sales: ${totalSales}</p>
                            <ProgressBar now={goalPercentage} />
                            <p>Products:</p>
                            {campaignProducts}
                            <button>Edit</button>
                            <button onClick={this.deleteCampaign}>Delete</button>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
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