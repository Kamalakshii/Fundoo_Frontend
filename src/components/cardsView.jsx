import React, { Component } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
export default class cardsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: false,
        }
        this.handleCardsView = this.handleCardsView.bind(this);
    }
    /**
     * @description:it handle the list and grid view event
     * @param {*event for viewing the cardViewIcon} event 
     */
    handleCardsView=(event) =>{
        try {
            event.preventDefault();
            this.setState({ view: !this.state.view });
            this.props.appPropstoCardsView();
        } catch (err) {
            console.log("error at handleCardsView in cardsView");
        }
    }
    render() {
        return (
            this.state.view ?
                <div>
                    <IconButton id="cardViewIcon">
                        <Tooltip title="List View" onClick={this.handleCardsView}>
                            <img src={require('../assets/list-view.svg')} alt="grid icon" 
                        />
                        </Tooltip>
                    </IconButton>
                </div>
                :
                <div>
                    <IconButton id="cardViewIcon">
                        <Tooltip title="Grid View" onClick={this.handleCardsView}>
                            <img src={require('../assets/grid-view.svg')} alt="grid icon" />
                        </Tooltip>
                    </IconButton>
                </div>
        )
    }
}