import React, { Component } from 'react';
import { connect } from 'react-redux';

// This component is a form which the Admin uses to create a new Organization

class AddOrgForm extends Component {
    constructor(props){
        super(props);
        this.state = ({
            newOrg: {
                name: '',
                street_address: '',
                city: '',
                state: '',
                zip_code: '',
                contact_name: '',
                contact_phone: '',
                contact_email: ''
            }
        });
    };

    // dispatch action to saga to create new Org and display on DOM
    addOrganization = (event) => {
        event.preventDefault();
        this.props.addOrganization(this.state.newOrg);
        this.setState({
            newOrg: {
                name: '',
                street_address: '',
                city: '',
                state: '',
                zip_code: '',
                contact_name: '',
                contact_phone: '',
                contact_email: ''
            }
        })
    };

    // Capture user inputs so we can store in our local state
    handleInput = (propertyName) => {
        return (event) => {          
            // Set state as the previous state + the updated given property added by the user
            this.setState({
                newOrg: {
                    ...this.state.newOrg,
                    [propertyName]: event.target.value,
                }
            })
        }
    }

    render(){
        return(
            <div>
                <form id="addOrgForm">
                    <input value={this.state.newOrg.name} placeholder="Name" onChange={this.handleInput("name")}/>
                    <input value={this.state.newOrg.street_address} placeholder="Mailing Address" onChange={this.handleInput("street_address")}/>
                    <input value={this.state.newOrg.city} placeholder="City" onChange={this.handleInput("city")}/>
                    <input value={this.state.newOrg.state} placeholder="State" onChange={this.handleInput("state")}/>
                    <input value={this.state.newOrg.zip_code} placeholder="Zip" onChange={this.handleInput("zip_code")}/>
                    <br/>
                    <input value={this.state.newOrg.contact_name} placeholder="Contact Name" onChange={this.handleInput("contact_name")}/>
                    <input value={this.state.newOrg.contact_phone} placeholder="Contact Phone" onChange={this.handleInput("contact_phone")}/>
                    <input value={this.state.newOrg.contact_email} placeholder="Contact Email" onChange={this.handleInput("contact_email")}/>
                    <button type="submit" onClick={this.addOrganization}>Create!</button>
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
export default connect(mapReduxStateToProps)(AddOrgForm);