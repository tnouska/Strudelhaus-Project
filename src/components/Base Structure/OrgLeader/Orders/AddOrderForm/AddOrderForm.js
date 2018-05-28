import React, { Component } from 'react';
import { connect } from 'react-redux';

// This component is a form which the Admin uses to create a new product/strudel that can be sold in a Campaign

class AddOrderForm extends Component {
    constructor(props){
        super(props);
        this.state = ({
            newOrder: {
                campaign_id: undefined,
                name: '',
                street_address: '',
                city: '',
                state: '',
                zip_code: '',
                email_address: '',
                name_of_reference: '',
                date_of_order: '',
                notes: ''
            }
        });
    };

    addOrder = (event) => {
        event.preventDefault();
        console.log(this.state.newOrder);
        
    }


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

    test = () => {
        let selectedCampaign = 'test';
        if (this.state.newOrder.campaign_id !== undefined){
            selectedCampaign = this.props.reduxState.orgLeaderPerformance.find(
                campaign => campaign.campaign_id == this.state.newOrder.campaign_id);
        }
        console.log('campaign object:', selectedCampaign);
        
    }

    render(){
        // map over array of all Campaigns tied to the user's Organization, make unique dropdown select options for each
        let campaignOptions = this.props.reduxState.orgLeaderPerformance.map((campaignOption) => {
            return(<option key={campaignOption.campaign_id} value={campaignOption.campaign_id}
                >{campaignOption.campaign_name}
                </option>)
        });
        let selectedCampaign = 'test';


        return(
            <div>
                <form>
                    <select title="Campaign"
                            value={this.state.newOrder.campaign_id} onChange={this.handleInput("campaign_id")}>
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
                    <pre>{JSON.stringify(selectedCampaign)}</pre>
                    <button type="submit" onClick={this.addOrder}>Create!</button>
                </form>
                <button onClick={this.test}>Test!</button>
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