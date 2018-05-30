import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OrgLeaderPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      message: '',
      square_application_id: '',
      square_location_id: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.password === '') {
      this.setState({
        message: 'Choose a password!',
      });
    } else {
      const request = new Request('/api/user/newpassword', {
        method: 'PUT',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          password: this.state.password,
          token: this.props.match.params.token,
          username: this.props.match.params.username,
          square_application_id: this.state.square_application_id,
          square_location_id: this.state.square_location_id
        }),
      });

      
      fetch(request)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={this.registerUser}>
          <h1>Create Password</h1>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="square_application_id">
              Square Application ID:
              <input
                type="square_application_id"
                name="square_application_id"
                value={this.state.square_application_id}
                onChange={this.handleInputChangeFor('square_application_id')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="square_location_id">
              Square Location ID:
              <input
                type="square_location_id"
                name="square_location_id"
                value={this.state.square_location_id}
                onChange={this.handleInputChangeFor('square_location_id')}
              />
            </label>
          </div>
          <div>
            <input
              type="submit"
              name="submit"
              value="Register"
            />
            <Link to="/home">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default OrgLeaderPassword;