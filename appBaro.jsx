
import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Tooltip, MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import DrawerMenu from '../components/drawerMenu';
import CardsView from "../components/cardsView";
import UserProfile from "../components/userProfile";
import "../App.css";
const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paperAnchorLeft: {
                top: 70,
                width: 300,
                background: 'white'
            },
            paperAnchorDockedLeft: {
                borderColor: "white"
            }
        },
        MuiAppBar: {
            root: {
                display: 'flex',
                flexDirection: "row"

            },
            colorPrimary: {
                color: "gray",
                fontSize: 25,
                fontFamily: "georgia"
            },
        },
        MuiDrawer: {
            regular: {
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                backgroundColor:"white"
            },
            root: {
                position: "absolute",
                alignItems: "center",
                border: "1px solid #E0E0E0"
            },
        },
        MuiMenuItem: {
            root: {
                borderBottomRightRadius: "25px",
                borderTopRightRadius: "25px",
                height: "30px"
            },
        },
    },
    typography: {
        useNextVariants: true,
    },
})
export default class appBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            left: true,
            open: false,
            searchNote: ""
        };
        this.handleSearchBar = this.handleSearchBar.bind(this);

        this.handleAppbar = this.handleAppbar.bind(this);
    }
    /**
     * @description:it will toggle the menu bar
     */
    handleToggle = () => {
        try {
            this.props.slideCards();
            this.setState({ open: !this.state.open });
        } catch (err) {
            console.log("error at handleToggle in appBar");
        }
    }
    /**
     * @description:it will handle the search bar event
     * @param {event for search input} evt 
     */
    handleSearchBar(evt) {
        try {
            this.setState({ searchNote: evt.target.value });
            this.props.getSearchedNotes(evt.target.value);
        } catch (err) {
            console.log("error at handleSearchBar in appBar");
        }
    }


    handleRefresh(evt) {
        evt.preventDefault();
        window.location.reload();
    }

    handleAppbar() {
        this.props.notePropsToApp();
    }

    searchLabels(value) {
        this.props.searchLabels(value)
    }

    render() {
        // const { open } = this.state;
        return (
            <div>
                <div className="root">
                    <MuiThemeProvider theme={theme}>
                        <AppBar position="fixed" color="inherit">
                            <Toolbar>
                                <div id="appBarMenu">
                                    <div>
                                        <IconButton color="inherit" aria-label="Open drawer" >
                                            <Tooltip title="Menu">
                                                <MenuIcon id="menu" onClick={this.handleToggle} />
                                            </Tooltip>
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="keepImage">
                                    <img src={require("../assets/images/keep_48dp.png")}
                                        alt="" />
                                </div>
                                <div className="fundoTitle">
                                    <span>Fundoo</span>
                                </div>
                                <div className="search">
                                    <div className="searchIcon">
                                        <Tooltip title="Search">
                                            <SearchIcon />
                                        </Tooltip>
                                    </div>
                                    <div className="searchField">
                                        <InputBase
                                            id="searchInputBase"
                                            value={this.state.searchNote}
                                            onChange={this.handleSearchBar}
                                            placeholder="Search"
                                            className="inputRoot"
                                        />
                                    </div>
                                </div>
                                <div className="appList">
                                    <CardsView
                                        appPropstoCardsView={this.handleAppbar}
                                    />
                                </div>
                                <div>
                                    <UserProfile props={this.props} />
                                </div>
                            </Toolbar>
                            <DrawerMenu
                                appBarProps={this.state.open}

                                handleNavigation={this.props.handleNavigation}
                                searchLabels={(value) => this.searchLabels(value)}
                                makeLabelFalse={this.props.makeLabelFalse} 
                                />
                        </AppBar>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}
