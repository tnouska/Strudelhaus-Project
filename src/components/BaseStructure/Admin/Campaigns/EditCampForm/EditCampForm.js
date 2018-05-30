import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, FormGroup, ControlLabel}  from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
let moment = require('moment');

class EditCampForm extends Component {
    constructor(props) {
        super(props);
        this.state =({
            updateCamp: {
                url: this.props.campaign.url,
                name: this.props.campaign.name,
                date_start: this.props.campaign.date_start,
                date_end: this.props.campaign.date_end,
                notes: this.props.campaign.notes,
                goal: this.props.campaign.goal,
                campaign_id: this.props.campaign.campaign_id,
            },
            startDate: '',
            endDate: ''
        });
    };

    editCampaign = (event) => {
        event.preventDefault();
        this.props.editCamp(this.state.updateCamp);
        this.setState({
            updateCamp: {
                url: '',
                name: '',
                date_start: '',
                date_end: '',
                notes: '',
                goal: '',
            }
        })
    };

    handleStartDate = (date) => {
        this.setState({
            updateCamp: {
                ...this.state.updateCamp,
                date_start: moment(date).format("MM-DD-YYYY")
            },
            startDate: date
        })
    };

    handleEndDate = (date) => {
        this.setState({
            updateCamp: {
                ...this.state.updateCamp,
                date_end: moment(date).format("MM-DD-YYYY")
            },
            endDate: date
        })
    };

    handleInput = (propertyName) => {
        return (event) => {
            this.setState({
                updateCamp: {
                    ...this.state.updateCamp,
                    [propertyName]: event.target.value,
                }
            })
            
        }
    };

    render(){
        return (
            <div>
                <form>
                    <FormGroup>
                        <FormControl value={this.state.updateCamp.url} placeholder="URL" onChange={this.handleInput("url")}/>
                        <FormControl value={this.state.updateCamp.name} placeholder="Name" onChange={this.handleInput("name")}/>
                        <DatePicker
                            dateFormat="MM/DD/YY"
                            selected={this.state.startDate}
                            placeholderText="Start Date"
                            onChange={this.handleStartDate}
                        />
                        <DatePicker
                            dateFormat="MM/DD/YY"
                            selected={this.state.endDate}
                            placeholderText="End Date"
                            onChange={this.handleEndDate}
                        />
                        <FormControl value={this.state.updateCamp.notes} placeholder="Notes" onChange={this.handleInput("notes")}/>
                        <FormControl value={this.state.updateCamp.goal} placeholder="Goal" onChange={this.handleInput("goal")}/>
                        <Button type="submit" onClick={this.editCampaign}>Save</Button>
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

export default connect(mapReduxStateToProps)(EditCampForm);