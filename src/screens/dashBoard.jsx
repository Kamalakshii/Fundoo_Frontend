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
        this.noteToCards = React.createRef();
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
    getNewNote=(newCard)=> {
        console.log("new card", newCard);
        try {
            this.noteToCards.current.displayNewCard(newCard);
        } catch (err) {
            console.log("error at getNewNote in dashBoard");
        }
    }
    handleNavigation=(reminder, archive, trash)=> {
        console.log("handleNavigation", reminder, archive, trash);
        if (reminder === true || archive === true || trash === true) {
            this.setState({
                reminder: reminder,
                archive: archive,
                trash: trash
            })
        } else {
            this.setState({
                reminder: false,
                archive: false,
                trash: false
            })
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
                        handleNavigation={this.handleNavigation}
                    />
                </div>
                <div className="setFixedMargin">
                    {this.state.archive  ?
                        <div id="dashboard1">
                            <Notes
                                noteProps={this.state.cardStyles}
                                ref={this.noteToCards}
                                navigateArchived={this.state.archive}
                            />
                        </div>
                        :
                        <div className="dashboard">
                            <CreateNote
                                getNewNote={this.getNewNote}
                            />
                            <Notes
                                noteProps={this.state.cardStyles}
                                ref={this.noteToCards}
                                navigateArchived={this.state.archive}
                            />
                        </div>
                    }
                </div>
            </div>
        )
    }
}
