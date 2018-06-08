import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError, triggerLogout } from '../../redux/actions/loginActions';
import '../LoginPage/LoginPage.css';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(triggerLogout());
    this.props.dispatch(clearError());
  }

  componentWillReceiveProps(nextProps) {
    
    if (nextProps.user.userName && nextProps.user.userRole === 'admin') {
      this.props.history.push('/pipeline');
      
    } else if(nextProps.user.userName && nextProps.user.userRole === 'leader'){
      this.props.history.push('/performance');
      
    }
  }

  login = (event) => {
    event.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
      
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div className="login">
        { this.renderAlert() }
        <form onSubmit={this.login}>
          <h1 classname="loginText">Login</h1>
          <div>
            <label classname="loginText" htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label classname="loginText" htmlFor="password">
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
            <input
              type="submit"
              name="submit"
              value="Log In"
            />
            {/* <div className="register">
            <Link to="/register">Register</Link>
            </div> */}
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
