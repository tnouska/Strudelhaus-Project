import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, DropdownButton, MenuItem , FormControl, FormGroup, ControlLabel}  from 'react-bootstrap';
import Select from 'react-select';
import * as Animated from 'react-select/lib/animated';


class AddCampaignForm extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            newCampaign: {
                organization_id: '',
                name: '',
                url: '',
                info_url: '',
                notes: '',
                date_start: '',
                date_end: '',
                goal: '',
                products: []
            }
        });
    };

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_ORGANIZATION',
        })
        this.props.dispatch({
            type: 'GET_ALL_PRODUCTS',
        })
    }

    // create campaign by calling addCampaign function on parent component
    addCampaign = (event) => {
        event.preventDefault();
        this.props.addCampaign(this.state.newCampaign)
        // Clear input fields after dispatching
        this.setState({
            newCampaign: {
                organization_id: '',
                name: '',
                url: '',
                info_url: '',
                notes: '',
                date_start: '',
                date_end: '',
                goal: ''
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


    onChange = (value) => {
        let valueArray = [];
        for (let i = 0; i < value.length; i++) {
            valueArray.push(value[i].value)
        }
        this.setState({
            newCampaign: {
                ...this.state.newCampaign,
                products: valueArray
            }
        })
    }

    render() {
        let orgOptions = this.props.reduxState.organization.map((orgOption) => {
            return (<option key={orgOption.organization_id} value={orgOption.organization_id}
            >{orgOption.organization_name}
            </option>)
        })
        let productOption = this.props.reduxState.allProducts

        return (
            <div>
                <form id="addCampForm">
                    <FormGroup>
                        <select title="Organization" id="orgSelect" onChange={this.handleInput("organization_id")}
                            value={this.state.newCampaign.organization_id}>
                            <option>Select Organization</option>
                            {orgOptions}
                        </select>
                        <FormControl value={this.state.newCampaign.name} placeholder="Campaign Name" onChange={this.handleInput("name")} />
                        <FormControl value={this.state.newCampaign.url} placeholder="Campaign URL" onChange={this.handleInput("url")} />
                        <FormControl value={this.state.newCampaign.info_url} placeholder="Info URL" onChange={this.handleInput("info_url")} />
                        <FormControl value={this.state.newCampaign.notes} placeholder="Notes" onChange={this.handleInput("notes")} />
                        <FormControl value={this.state.newCampaign.date_start} placeholder="Start Date" onChange={this.handleInput("date_start")} />
                        <FormControl value={this.state.newCampaign.date_end} placeholder="End Date" onChange={this.handleInput("date_end")} />
                        <FormControl value={this.state.newCampaign.goal} placeholder="Sales Goal ($)" onChange={this.handleInput("goal")} />
                        <Select
                            options={productOption}
                            placeholder="Select Products"
                            className="basic-multi-select"
                            isMulti
                            components={Animated}
                            onChange={this.onChange}
                        />
                        <Button type="submit" onClick={this.addCampaign}>Create!</Button>
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

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(AddCampaignForm);