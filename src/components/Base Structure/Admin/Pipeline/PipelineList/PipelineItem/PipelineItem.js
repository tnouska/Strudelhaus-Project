import React, { Component } from 'react';
import { connect } from 'react-redux';


class PipelineItem extends Component {

    render(){

        return(
            <div className="pipelineItem">
                <p>{this.props.pipelineItem.campaign_name} - {this.props.pipelineItem.organization_name} 
                    - Ends {this.props.pipelineItem.campaign_date_end}</p>
                <hr/>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(PipelineItem);