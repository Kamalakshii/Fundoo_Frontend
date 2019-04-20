/*****************************************************************************************************
 *  @Purpose        : to create the appbar that contains all required appbar components.
 *  @file           : appBar.jsx       
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 20-03-2019
 *****************************************************************************************************/
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Tooltip } from '@material-ui/core';
import Drawer from '../components/drawer';
import PersistentDrawerLeft from '../components/drawer';
import { fade } from '@material-ui/core/styles/colorManipulator';
import UserProfile from "./userProfile";
import CardsView from "../components/cardsView";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      fontsize: 22
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 6,
      width: 'auto',
      height: 46,
      opacity: .54
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: .54
  },
  inputRoot: {
    color: 'primary',
    width: '100%',
  },
  inputInput: {
    position: 'relative',
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 550,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

});

class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      name: "Fundoo"
    };
  }
  handleRefresh = (event) => {
    event.preventDefault();
    window.location.reload();
  }
  handleToggle = () => {
    this.props.slideCards();
    this.setState({ open: !this.state.open });
  }
  handleAppbar = () => {
    this.props.notePropsToApp();
  }
  handleName = (event) => {
    this.setState({ name: event })
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="inherit" id="AppBar" >
          <Toolbar>
            <IconButton className={classes.menuButton}
              id="Button" color="inherit" onClick={this.handleToggle} >
              <Tooltip title="main menu">
                <MenuIcon />
              </Tooltip>
            </IconButton>
            {this.state.name === "Fundoo" ?
              <img src={require("../assets/keep.png")}
                alt="" />
              :
              null
            }
            <div id="fundoo-font-dashboard">
              {this.state.name}
              <div style={{ "paddingLeft": "40px" }} />
            </div>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <div className="search" >
                <InputBase
                  placeholder="Search"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </div>
            <div className={classes.grow} />
            <div id="refreshicon">
              <Tooltip title="refresh" onClick={this.handleRefresh} >
                <img src={require('../assets/refresh.svg')} alt="reminder icon"
                  style={{ opacity: .54 }} />
              </Tooltip>
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
          <PersistentDrawerLeft appBarProps={this.state.open} />
          <Drawer
            appBarProps={this.state.open}
            name={this.handleName}
            handleNavigation={this.props.handleNavigation}
          />
        </AppBar>
      </div>
    );
  }
}
PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(PrimarySearchAppBar);