import React, { Component } from 'react';

class PerformanceItem extends Component {

    componentDidUpdate(){
        console.log(this.props.selectedCampaign);
        
    }

    render(){
        return(
            <h3>Selected</h3>
        )
    }
}

export default PerformanceItem;