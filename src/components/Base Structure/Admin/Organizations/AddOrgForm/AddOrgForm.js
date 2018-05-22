import React from 'react';

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
            <div id="addOrgForm">
                <h2>Enter Organization Details</h2>
                <input value={this.state.newOrg.name} placeholder="Name" onChange={this.handleInput("name")}/>
                <input value={this.state.newOrg.address} placeholder="Mailing Address" onChange={this.handleInput("address")}/>
                <input value={this.state.newOrg.city} placeholder="City" onChange={this.handleInput("city")}/>
            </div>
        )
    }
}