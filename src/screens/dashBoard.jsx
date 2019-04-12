/****************************************************************************************
 *  @Purpose        : to create a dashboard that contains components. 
 *  @file           : dashBoard.jsx       
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 27-03-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import CreateNote from '../components/createNote';
import AppbarComponent from '../components/appBar';
import Notes from '../components/notes';
import "../App.css"
export default class dashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideCards: false,
            cardStyles: false,
            reminder: false,
            archive: false,
            trash: false
        }
        this.getNewNote = this.getNewNote.bind(this);
        this.noteToCards = React.createRef();
        this.handleCardStyle = this.handleCardStyle.bind(this);
        this.slideCards = this.slideCards.bind(this);
    }
    /**
    * @description:it performs the card action
    */
    slideCards = () => {
        try {
            this.setState({ slideCards: !this.state.slideCards })
        } catch (err) {
            console.log("error at slideCards in dashBoard");
        }
    }
    /**
 * @description:it handles the cards style
 */
    handleCardStyle = () => {
        try {
            this.setState({ cardStyles: !this.state.cardStyles });
        } catch (err) {
            console.log("error at handleCardStyle in dashBoard");
        }
    }
    /**
    * @description:it display the new note
    * @param {*get new card or note} newCard 
    */
    getNewNote(newCard) {
        console.log("new card", newCard);
        try {
            this.noteToCards.current.displayNewCard(newCard);
        } catch (err) {
            console.log("error at getNewNote in dashBoard");
        }
    }
    render() {
        const slidingCards = this.state.slideCards ? "afterSlide" : "beforeSlide"
        return (
            <div className={slidingCards}>
                <div >
                    <AppbarComponent
                        props={this.props}
                        slideCards={this.slideCards}
                        notePropsToApp={this.handleCardStyle}
                    />
                </div>
                <div className="dashboard">
                    <CreateNote
                        getNewNote={this.getNewNote}
                    />
                    <Notes
                        noteProps={this.state.cardStyles}
                        ref={this.noteToCards}
                        uploadImage={this.state.image}
                    />
                    <dilogBox>
                        </dilogBox>
                </div>
                </div>
        )
                }
}

