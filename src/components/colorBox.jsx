/*****************************************************************************************************
 *  @Purpose        : to set the color for a particular note
 *  @file           : colorBox.jsx       
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 26-03-2019
 *****************************************************************************************************/
import React, { Component } from 'react';
import { IconButton, Tooltip, Card } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
/**
 * @description:this will define the color using rgb-color code
 */
const colorCodesAndNames = [{ name: "default", colorCode: "rgb(255, 255, 255)" },
{ name: "Red", colorCode: "rgb(242,139,130)" },
{ name: "Orange", colorCode: "rgb(247,188,2)" },
{ name: "Yellow", colorCode: "rgb(252,244,117)" },
{ name: "Green", colorCode: "rgb(204,255,143)" },
{ name: "Teal", colorCode: "rgb(167,255,235)" },
{ name: "Blue", colorCode: "rgb(203,240,248)" },
{ name: "Dark Blue", colorCode: "rgb(174,203,250)" },
{ name: "Purple", colorCode: "rgb(215,174,251)" },
{ name: "Pink", colorCode: "rgb(251,207,232)" },
{ name: "Brown", colorCode: "rgb(230,201,168)" },
{ name: "Gray", colorCode: "rgb(232,234,237)" }
]
export default class ColorPallete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
        }
    }
    /**
     * @description:it will display the color box when mouse is omn the color icon
     */
    handleMouseEnter=()=> {
        try {
            this.setState({ open: true });
            // this.props.handleToggle(!this.state.open)
        } catch (err) {
            console.log("error at handleMouseEnter in colorBox");
        }
    }
    handleMouseLeave=() =>{
        this.setState({ open: false });
         this.props.handleToggle(!this.state.open)
    }
    /**
     * @description:it will handle the selecting color event
     * @param {*changing color event} event 
     */
    handleColor=(event) =>{
        try {
            console.log("changing color", this.props.noteID)
            this.props.toolsPropsToColorpallete(event.target.value, this.props.noteID);
        } catch (err) {
            console.log("error at handleColor in colorBox");
        }
    }
    /**
     * @description:it will close the color popper box
     */
    closePopper() {
        try {
            this.setState({
                open: false
            })
        } catch (err) {
            console.log("error at closePopper in colorBox");
        }
    }
    /**
     * @description:it will toggle the color icon
     */
    handleToggle=()=> {
        try {
            this.setState({ open: !this.state.open });
            this.props.handleToggle(!this.state.open)
            
        } catch (err) {
            console.log("error at handleToggle in colorBox");
        }
    }
    render() {
        // const { anchorEl, open } = this.state;
        const changeCardColor = colorCodesAndNames.map((colorKey) =>
            <Tooltip title={colorKey.name}>
                <IconButton style={{ backgroundColor: colorKey.colorCode, "margin": "2px" }}
                    value={colorKey.colorCode}
                    onClick={this.handleColor}
                >
                </IconButton>
            </Tooltip>     
        );
        return (
            <div>
                <Tooltip title="Change Color">
                <div id="pallette">
                    <img src={require('../assets/pallete.svg')}
                        // className="colorPalleteIcon"
                        alt="change color"
                         onMouseEnter={this.handleMouseEnter}
                        onClick={this.handleToggle}
                       //  onMouseLeave={this.handleMouseLeave}
                    />
                    </div>
                </Tooltip>
                <div>
                    {this.state.open ?
                        <ClickAwayListener onClick={() => this.closePopper()}>
                            <Card className="colorPalleteCard">
                                {changeCardColor}
                            </Card>
                        </ClickAwayListener>
                        : null}
                </div>
            </div>
        )
    }
}