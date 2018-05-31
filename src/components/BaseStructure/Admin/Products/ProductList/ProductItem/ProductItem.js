import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Panel } from 'react-bootstrap';

// This component displays more info related to each unique Strudel

class ProductItem extends Component {
    constructor(props){
        super(props);
        // ensure the expansion panel is set to closed upon load
        this.state = ({
            panelOpen: false
        })
    };

    // delete a specific Org by dispatching to saga
    deleteProduct = () => {
        this.props.dispatch({
            type: 'DELETE_PRODUCT',
            payload: this.props.product
        })
    };

    render() {

        let panelColor = {backgroundColor: '#880F1B'};

        return(
            <div>
                <Panel className="productPanel">
                    <Panel.Heading style={panelColor}>
                        <Panel.Title className="panelTitle" toggle>
                        {this.props.product.name}
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <img className="smallProductImg" src={this.props.product.img_url_1} alt="strudel" />
                            <br/>
                            <Button>Edit</Button>
                            <Button onClick={this.deleteProduct}>Delete</Button>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </div>
        )
    }
}



const mapReduxStateToProps = reduxState => ({
    user: reduxState.user,
    reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(ProductItem);