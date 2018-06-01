import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, FormGroup, ControlLabel}  from 'react-bootstrap';


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

    fillForm = () =>{
        this.setState({
            newOrg: {
                name: 'test',
                street_address: '807 oriole ln',
                city: 'chaska',
                state: 'MN',
                zip_code: '55318',
                contact_name: 'Teagan',
                contact_phone: '952-250-7726',
                contact_email: 'tnouska@gmail.com'
            }
        })
    }

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
                    <FormGroup>
                        <FormControl value={this.state.newOrg.name} placeholder="Name" onChange={this.handleInput("name")}/>
                        <FormControl value={this.state.newOrg.street_address} placeholder="Mailing Address" onChange={this.handleInput("street_address")}/>
                        <FormControl value={this.state.newOrg.city} placeholder="City" onChange={this.handleInput("city")}/>
                        <FormControl value={this.state.newOrg.state} placeholder="State" onChange={this.handleInput("state")}/>
                        <FormControl value={this.state.newOrg.zip_code} placeholder="Zip" onChange={this.handleInput("zip_code")}/>
                        <FormControl value={this.state.newOrg.contact_name} placeholder="Contact Name" onChange={this.handleInput("contact_name")}/>
                        <FormControl value={this.state.newOrg.contact_phone} placeholder="Contact Phone" onChange={this.handleInput("contact_phone")}/>
                        <FormControl value={this.state.newOrg.contact_email} placeholder="Contact Email" onChange={this.handleInput("contact_email")}/>
                        <div onClick={this.fillForm}> </div>{/* special blank character in between  */}
                        <Button type="submit" onClick={this.addOrganization}>Create!</Button>

                    </FormGroup>
                </form>
                <Button type="submit" onClick={this.addOrganization}>Create!</Button>
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