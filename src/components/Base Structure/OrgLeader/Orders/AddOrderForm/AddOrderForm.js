import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Papa from 'papaparse';

// This component is a form which the Admin uses to create a new product/strudel that can be sold in a Campaign

class AddOrderForm extends Component {
    constructor(props){
        super(props);
        this.state = ({
            csvOrders: [],
            newOrder: [{
                campaign_id: undefined,
                name: '',
                street_address: '',
                city: '',
                state: '',
                zip_code: '',
                email_address: '',
                name_of_reference: '',
                date_of_order: '',
                notes: '',
                item1Name: '',
                item1Qty: '',
                item2Name: '',
                item2Qty: '',
                item3Name: '',
                item3Qty: '',
            }]
        });
    };

    
    
    addCsvOrder = (event) => {
        event.preventDefault();
        let selectedFile = document.getElementById('csv').files[0];
        Papa.parse(selectedFile, {
            complete: (results) => {
                let parsedResult = results.data;
                for(let i=1; i < parsedResult.length; i++) {
                    let order = parsedResult[i]
                    let csvOrder = {
                        campaign_id: order[0],
                        name: order[1],
                        street_address: order[2],
                        city: order[3],
                        state: order[4],
                        zip_code: order[5],
                        email_address: order[6],
                        name_of_reference: order[7],
                        date_of_order: order[8],
                        notes: order[9],
                        item1Name: order[10],
                        item1Qty: order[11],
                        item2Name: order[12],
                        item2Qty: order[13],
                        item3Name: order[14],
                        item3Qty: order[15],
                    };
                    this.setState({
                        csvOrders: [...this.state.csvOrders, csvOrder]
                    });
                }
                this.props.addOrder(this.state.csvOrders)
            }
        });
    };

    addSingleOrder = (event) => {
        event.preventDefault();
        this.props.addOrder(this.state.newOrder);
    };

    // Capture user inputs so we can store in our local state
    handleInput = (propertyName) => {
        return (event) => {          
            // Set state as the previous state + the updated given property added by the user
            this.setState({
                newOrder: {
                    ...this.state.newOrder,
                    [propertyName]: event.target.value,
                }
            })
        }
    }
    // Capture user inputs so we can store in our local state
    handleSelectCampaign = (propertyName) => {
        return (event) => {          
            // Set state as the previous state + the updated given property added by the user
            this.setState({
                newOrder: {
                    ...this.state.newOrder,
                    [propertyName]: event.target.value,
                    item1Name: '',
                    item1Qty: '',
                    item2Name: '',
                    item2Qty: '',
                    item3Name: '',
                    item3Qty: '',
                }
            })
        }
    }

    render(){
        // map over array of all Campaigns tied to the user's Organization, make unique dropdown select options for each
        let campaignOptions = this.props.reduxState.orgLeaderPerformance.map((campaignOption) => {
            return(<option key={campaignOption.campaign_id} value={campaignOption.campaign_id}
                >{campaignOption.campaign_name}
                </option>)
        });
        let selectedCampaign = 'test';
        let selectedCampaignProducts = 'test';
        if (this.state.newOrder.campaign_id !== undefined){
            selectedCampaign = this.props.reduxState.orgLeaderPerformance.find(
                campaign => campaign.campaign_id == this.state.newOrder.campaign_id);
            selectedCampaignProducts = selectedCampaign.orderList.map((product) => {
                return(<option key={product.product_name} value={product.product_name}>{product.product_name}</option>)
            });
        }


        return(
            <div>
                <h4>Select local CSV File:</h4>
                <input id="csv" type="file"/>
                <button type="submit" onClick={this.addCsvOrder}>Upload!</button>
                <hr/>
                <h4>OR</h4>
                <form>
                    <select title="Campaign"
                            value={this.state.newOrder.campaign_id} onChange={this.handleSelectCampaign("campaign_id")}>
                            <option>Select Campaign</option>
                            {campaignOptions}
                    </select>
                    <input value={this.state.newOrder.name} placeholder="Customer Name" onChange={this.handleInput("name")}/>
                    <input value={this.state.newOrder.street_address} placeholder="Customer Address" onChange={this.handleInput("street_address")}/>
                    <input value={this.state.newOrder.city} placeholder="City" onChange={this.handleInput("city")}/>
                    <input value={this.state.newOrder.state} placeholder="State" onChange={this.handleInput("state")}/>
                    <input value={this.state.newOrder.zip_code} placeholder="Zip" onChange={this.handleInput("zip_code")}/>
                    <input value={this.state.newOrder.email_address} placeholder="Customer Email" onChange={this.handleInput("email_address")}/>
                    <input value={this.state.newOrder.name_of_reference} placeholder="Name of Reference" onChange={this.handleInput("name_of_reference")}/>
                    <input value={this.state.newOrder.notes} placeholder="Notes" onChange={this.handleInput("notes")}/>
                    <br/>
                    <select 
                            value={this.state.newOrder.item1Name} onChange={this.handleInput("item1Name")}>
                            <option>Strudel 1</option>
                            {selectedCampaignProducts}
                    </select>
                    <input value={this.state.newOrder.item1Qty} placeholder="Qty" onChange={this.handleInput("item1Qty")}/>
                    <select 
                            value={this.state.newOrder.item2Name} onChange={this.handleInput("item2Name")}>
                            <option>Strudel 2</option>
                            {selectedCampaignProducts}
                    </select>
                    <input value={this.state.newOrder.item2Qty} placeholder="Qty" onChange={this.handleInput("item2Qty")}/>
                    <select 
                            value={this.state.newOrder.item3Name} onChange={this.handleInput("item3Name")}>
                            <option>Strudel 3</option>
                            {selectedCampaignProducts}
                    </select>
                    <input value={this.state.newOrder.item3Qty} placeholder="Qty" onChange={this.handleInput("item3Qty")}/>
                    <button type="submit" onClick={this.addSingleOrder}>Create!</button>
                </form>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(AddOrderForm);