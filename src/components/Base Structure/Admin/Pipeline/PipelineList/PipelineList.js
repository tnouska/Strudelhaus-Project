import React, { Component } from 'react';
import { connect } from 'react-redux';
import PipelineItem from './PipelineItem/PipelineItem';

class PipelineList extends Component {

    render(){
        let pipelineList = this.props.reduxState.pipeline.map( (pipelineItem) => {
            return <PipelineItem key={pipelineItem.campaign_id} pipelineItem={pipelineItem}/>
        })
        return(
            <div>
                <h4>Pipeline List</h4>
                {pipelineList}
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(PipelineList);