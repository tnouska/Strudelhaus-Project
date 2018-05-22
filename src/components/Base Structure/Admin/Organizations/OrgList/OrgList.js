import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrgItem from './OrgItem/OrgItem';

class OrgList extends Component {

    render() {

        let orgList = this.props.reduxState.organization.map((org) => {
            return(<OrgItem key={org.organization_id} org={org}/>)
        });


        return(
            <div>
                {orgList}
            </div>
        )
    }
}



const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(OrgList);