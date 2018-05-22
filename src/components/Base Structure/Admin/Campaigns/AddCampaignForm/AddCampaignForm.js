import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddCampaignForm extends Component {
    constructor(props){
        super(props);
        this.state = ({
            newCampaign: {
                organization: '',
                name: '',
                campaignUrl: '',
                infoUrl: '',
                notes: '',
                startDate: '',
                endDate: '',
                salesGoal: '',
                product1: '',
                product2: ''
            }
        });
    };

    addCampaign = (event) => {
        event.preventDefault();
        console.log(this.state.newCampaign);
        
        // this.props.dispatch({
        //     type: 'POST_CAMPAIGN',
        //     payload: this.state.newCampaign
        // })
        // Clear input fields after dispatching
        this.setState({
            newCampaign: {
                organization: '',
                name: '',
                campaignUrl: '',
                infoUrl: '',
                notes: '',
                startDate: '',
                endDate: '',
                salesGoal: '',
                product1: '',
                product2: ''
            }
        })
    };

    // Capture user inputs so we can store in our local state
    handleInput = (propertyName) => {
        return (event) => {          
            // Set state as the previous state + the updated given property added by the user
            this.setState({
                newCampaign: {
                    ...this.state.newCampaign,
                    [propertyName]: event.target.value,
                }
            })
        }
    }

    render(){
        return(
            <div>
                <h4>Add Campaign</h4>
                <form id="addCampForm">
                    <input value={this.state.newCampaign.organization} placeholder="Organization" onChange={this.handleInput("organization")}/>
                    <input value={this.state.newCampaign.name} placeholder="Campaign Name" onChange={this.handleInput("name")}/>
                    <input value={this.state.newCampaign.campaignUrl} placeholder="Campaign URL" onChange={this.handleInput("campaignUrl")}/>
                    <input value={this.state.newCampaign.infoUrl} placeholder="Info URL" onChange={this.handleInput("infoUrl")}/>
                    <input value={this.state.newCampaign.notes} placeholder="Notes" onChange={this.handleInput("notes")}/>
                    <input value={this.state.newCampaign.startDate} placeholder="Start Date" onChange={this.handleInput("startDate")}/>
                    <input value={this.state.newCampaign.endDate} placeholder="End Date" onChange={this.handleInput("endDate")}/>
                    <input value={this.state.newCampaign.salesGoal} placeholder="Sales Goal ($)" onChange={this.handleInput("salesGoal")}/>
                    <input value={this.state.newCampaign.product1} placeholder="Product 1" onChange={this.handleInput("product1")}/>
                    <input value={this.state.newCampaign.product2} placeholder="Product 2" onChange={this.handleInput("product2")}/>
                    <button type="submit" onClick={this.addCampaign}>Create!</button>
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
export default connect(mapReduxStateToProps)(AddCampaignForm);