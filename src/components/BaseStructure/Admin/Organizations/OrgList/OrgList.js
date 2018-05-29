import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrgItem from './OrgItem/OrgItem';

// This component displays a high level list of all Organizations. 

class OrgList extends Component {

    render() {
        // map over all Organizations to create unique items for each Org Object
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