/****************************************************************************************
 *  @Purpose        : to create the drawer component.
 *  @file           : drawer.jsx       
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 25-03-2019
 *****************************************************************************************/
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { MenuItem } from '@material-ui/core';
const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 70
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  menuItem: {
    "&:focus": {
      backgroundColor: "#feefc3",
      borderRadius: '0 25px 25px 0'
    }
  }
});

class PersistentDrawerLeft extends React.Component {
  state = {
    open: false,
    navigateArchived: false,
  };
  handleClose = (event) => {
    this.props.name(event);
  }
  async handleArchived() {
    await this.setState({
        navigateReminder: false,
        navigateArchived: true,
        navigateTrashed: false
    })
    this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
}
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.props.appBarProps}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div >
            <MenuItem id="noteMenu" className={classes.menuItem} onClick={()=>this.handleClose("Fundoo")}  >
           <img src={require('../assets/note.svg')} alt="note icon"
                style={{ marginRight: "50px" }} />
              Notes
           </MenuItem>
          </div>
          <div>
            <MenuItem id="reminderMenu" className={classes.menuItem} onClick={()=>this.handleClose("Reminders")}>
              <img src={require('../assets/remainder.svg')} alt="reminder icon"
                style={{ marginRight: "50px" }} />
              Reminders
           </MenuItem>
          </div>

          <div style={{ borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey" }}>
            <div style={{ padding: "3.5% 8%", fontSize: "12px", marginBottom: "15px", marginTop: "10px", fontFamily: "arial", color: "gray" }}>
              LABELS
             </div>

            <div>
              <MenuItem id="labelMenu" onClick={this.handleEditLabel}>
                <img src={require('../assets/edit.svg')} alt="edit icon"
                  style={{ marginRight: "50px" }} />
                Edit Labels
               </MenuItem>
            </div>

          </div>
          <div >
            <MenuItem id="archiveMenu" className={classes.menuItem} onClick={() => this.handleArchived()}>
              <img src={require('../assets/archive.svg')} alt="archive icon"
                style={{ marginRight: "50px" }} />
              Archive
          </MenuItem>
          </div>
          <div>
            <MenuItem id="trashMenu" className={classes.menuItem} onClick={()=>this.handleClose("Bin")}>
              <img src={require('../assets/trash.svg')} alt="trash icon" 
                style={{ marginRight: "50px" }} />
              Bin
                    </MenuItem>
          </div>
        </Drawer>

      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);