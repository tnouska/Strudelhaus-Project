import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import { triggerLogout } from '../../../../redux/actions/loginActions';
import AdminNav from '../../../Nav/AdminNav';

class Pipeline extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        // this.props.dispatch({type: 'GET_PIPELINE'});
      }
    
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null ) {
            this.props.history.push('home');
        }
        if (!this.props.user.isLoading && this.props.user.userRole !== "admin"){
            this.props.history.push('home');
        }
    }
    
    logout = () => {
        this.props.dispatch(triggerLogout());
        // this.props.history.push('home');
    }


    render(){
        // let showPipeline = this.props.state.pipeline.map( (activeCampaign) => {
        //     return <div>{activeCampaign.organization_name}</div>
        // })
        return(
            <div>
                <AdminNav/>
                <button onClick={this.logout}>Log Out</button>
                <h1>PIPELINE PAGE</h1>
                {/* {showPipeline} */}
            </div>
        )
    }
}


const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState

});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(Pipeline);