import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddOrgForm extends Component {
    constructor(props){
        super(props);
        this.state = ({
            newOrg: {
                name: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                leaderName: '',
                leaderPhone: '',
                leaderEmail: ''
            }
        });
    };

    addOrganization = (event) => {
        event.preventDefault();
        console.log(this.state.newOrg);
        
        // this.props.dispatch({
        //     type: 'POST_ORGANIZATION',
        //     payload: this.state.newOrg
        // })
        // Clear input fields after dispatching
        this.setState({
            newOrg: {
                name: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                leaderName: '',
                leaderPhone: '',
                leaderEmail: ''
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
                <h4>Add Organization</h4>
                <form id="addOrgForm">
                    <input value={this.state.newOrg.name} placeholder="Name" onChange={this.handleInput("name")}/>
                    <input value={this.state.newOrg.address} placeholder="Mailing Address" onChange={this.handleInput("address")}/>
                    <input value={this.state.newOrg.city} placeholder="City" onChange={this.handleInput("city")}/>
                    <input value={this.state.newOrg.state} placeholder="State" onChange={this.handleInput("state")}/>
                    <input value={this.state.newOrg.zip} placeholder="Zip" onChange={this.handleInput("zip")}/>
                    <br/>
                    <input value={this.state.newOrg.leaderName} placeholder="Leader Name" onChange={this.handleInput("leaderName")}/>
                    <input value={this.state.newOrg.leaderPhone} placeholder="Leader Phone" onChange={this.handleInput("leaderPhone")}/>
                    <input value={this.state.newOrg.leaderEmail} placeholder="Leader Email" onChange={this.handleInput("leaderEmail")}/>
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