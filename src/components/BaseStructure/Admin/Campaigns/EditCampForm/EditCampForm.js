import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, FormGroup, ControlLabel}  from 'react-bootstrap';

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
            }
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
    }

    handleInput = (propertyName) => {
        return (event) => {
            this.setState({
                updateCamp: {
                    ...this.state.updateCamp,
                    [propertyName]: event.target.value,
                }
            })
            
        }
    }

    render(){
        return (
            <div>
                <form>
                    <FormGroup>
                        <FormControl value={this.state.updateCamp.url} placeholder="URL" onChange={this.handleInput("url")}/>
                        <FormControl value={this.state.updateCamp.name} placeholder="Name" onChange={this.handleInput("name")}/>
                        <FormControl value={this.state.updateCamp.date_start} placeholder="Date Start" onChange={this.handleInput("date_start")}/>
                        <FormControl value={this.state.updateCamp.date_end} placeholder="Date End" onChange={this.handleInput("date_end")}/>
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