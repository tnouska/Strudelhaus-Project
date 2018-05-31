import React, { Component } from 'react';
import { connect } from 'react-redux';
import PipelineItem from './PipelineItem/PipelineItem';
import Moment from 'moment';

// This component displays a high level list of all Campaigns in the "Pipeline" (nearing completion)

class PipelineList extends Component {
    filterCampaigns =()=>{
        console.log(Moment().format('M-D-YY'))
    }
    
    componentDidMount() {
    this.filterCampaigns()
    }
    render(){
        // map over all Pipeline Campaigns to create unique items for each
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