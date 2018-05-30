import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, FormGroup, ControlLabel}  from 'react-bootstrap';

class EditOrgForm extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            updateOrg: {
                name: this.props.org.name,
                street_address: this.props.org.street_address,
                city: this.props.org.city,
                state: this.props.org.state,
                zip_code: this.props.org.zip_code,
                contact_name: this.props.org.contact_name,
                contact_phone: this.props.org.contact_phone,
                contact_email: this.props.org.contact_email,
                organization_id: this.props.org.organization_id,
            }
        });
    };
    editOrganization = (event) => {
        event.preventDefault();
        this.props.editOrg(this.state.updateOrg);
        this.setState({
            updateOrg: {
                name: '',
                street_address: '',
                city: '',
                state: '',
                zip_code: '',
                contact_name: '',
                contact_phone: '',
                contact_email: '',
            }
        })
    };

    handleInput = (propertyName) => {
        return (event) => {
            this.setState({
                updateOrg: {
                    ...this.state.updateOrg,
                    [propertyName]: event.target.value,
                }
            })
        }
    }

    render(){
        return(
            <div>
                <form>
                    <FormGroup>
                        <FormControl value={this.state.updateOrg.name} placeholder="Name" onChange={this.handleInput("name")}/>
                        <FormControl value={this.state.updateOrg.street_address} placeholder="Street Address" onChange={this.handleInput("street_address")}/>
                        <FormControl value={this.state.updateOrg.city} placeholder="City" onChange={this.handleInput("city")}/>
                        <FormControl value={this.state.updateOrg.state} placeholder="State" onChange={this.handleInput("state")}/>
                        <FormControl value={this.state.updateOrg.zip_code} placeholder="Zip Code" onChange={this.handleInput("zip_code")}/>
                        <FormControl value={this.state.updateOrg.contact_name} placeholder="Contact Name" onChange={this.handleInput("contact_name")}/>
                        <FormControl value={this.state.updateOrg.contact_phone} placeholder="Contact Phone" onChange={this.handleInput("contact_phone")}/>
                        <FormControl value={this.state.updateOrg.contact_email} placeholder="Contact Email" onChange={this.handleInput("contact_email")}/>
                        <Button type="submit" onClick={this.editOrganization}>Save</Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

export default connect(mapReduxStateToProps)(EditOrgForm);