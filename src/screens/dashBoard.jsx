import React, { Component } from 'react';
import CreateNote from '../components/createNote';
import AppbarComponent from '../components/appBar';
import Notes from '../components/notes';
export default class dashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideCards: false,
            reminder: false,
            archive: false,
        }
        this.getNewNote = this.getNewNote.bind(this);
        this.noteToCards = React.createRef();
        this.slideCards = this.slideCards.bind(this);
    }
     /**
     * @description:it performs the card action
     */
    slideCards() {
        try {
            this.setState({ slideCards: !this.state.slideCards })
        } catch (err) {
            console.log("error at slideCards in dashBoard");
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
                    />
                </div>
                <div className="setFixedMargin">
                    {this.state.archive ?
                        <div id="dashboard1">
                            <Notes
                                noteProps={this.state.cardStyles}
                                ref={this.noteToCards}
                            />
                        </div>
                    :
                <div id="dashboard">
                            <CreateNote
                                getNewNote={this.getNewNote}
                            />
                            <Notes
                                ref={this.noteToCards}
                            />
                        </div>
                    }
                </div>
                </div>
        )
    }
}
              
