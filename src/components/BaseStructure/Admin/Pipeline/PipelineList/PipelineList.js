import React, { Component } from 'react';
import { connect } from 'react-redux';
import PipelineItem from './PipelineItem/PipelineItem';
import moment from 'moment';

// This component displays a high level list of all Campaigns in the "Pipeline" (nearing completion)

class PipelineList extends Component {
    // filterCampaigns =()=>{
    //     let today =  moment().format("M-D-YY");
    //     let currentOrders = moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
    //     console.log(today)
    //     const dateSort = (item => item.due_date != currentDate );
    //     let upcommingOrders = this.props.reduxState.pipeline.filter(dateSort);
    //     console.log('upcomming orders', upcommingOrders)
    // }
    filterFunctionInside = (pipelineItem)=>{
        //convert Campaign end date to moment format
        let endDate = moment(pipelineItem.campaign_date_end).format("M-D-YY");
        // calculate delivery due date based on campaign end date (10 days)
        let dueDate = moment(endDate).add(10, 'days').format("M-D-YY");
        let today =  moment().format("M-D-YY");
        return moment( today ).isBetween( endDate , dueDate )
    }
    filterFunctionOutside = (pipelineItem)=>{
        //convert Campaign end date to moment format
        let endDate = moment(pipelineItem.campaign_date_end).format("M-D-YY");
        // calculate delivery due date based on campaign end date (10 days)
        let dueDate = moment(endDate).add(10, 'days').format("M-D-YY");
        let today =  moment().format("M-D-YY");
        return !moment( today ).isBetween( endDate , dueDate )
    }
    componentDidMount() {
   
    }
    render(){
        
       
        let pipelineListNeeded = this.props.reduxState.pipeline && this.props.reduxState.pipeline.filter(this.filterFunctionInside);
        console.log('pipelinelist', pipelineListNeeded)
        let pipelineListOthers = this.props.reduxState.pipeline && this.props.reduxState.pipeline.filter(this.filterFunctionOutside);
         // map over all Pipeline Campaigns to create unique items for each
        let pipelineListDeadline = pipelineListNeeded.map( (pipelineItem) => {
            return <div className="upcomming"><PipelineItem key={pipelineItem.campaign_id} pipelineItem={pipelineItem}/></div>
        })
        let pipelineListMoreTime = pipelineListOthers.map( (pipelineItem) => {
            return <PipelineItem key={pipelineItem.campaign_id} pipelineItem={pipelineItem}/>
        })
        pipelineListMoreTime.reverse();
        return(
            <div id="pipelineList">
                {pipelineListDeadline}
                {pipelineListMoreTime}
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