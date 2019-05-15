import React from 'react';
import { Input, MuiThemeProvider, createMuiTheme, Chip } from '@material-ui/core';
import Tools from '../components/toolbar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paper: {
        borderRadius: "20px",
        overflowY: "inherit",
        border: "none",
      }
    },
    MuiBackdrop:
    {
      root: {
        backgroundColor: "rgba(11, 11, 11, 0.18)"
      }
    },
    MuiInputBase:
    {
      multiline: {
        padding: "9px 30px 7px"
      }
    },
    MuiChip: {
      root: {
        fontSize: "12px",
        height: "30px",
        backgroundColor: "rgba(0, 0, 0, 0.10)",
        cursor: "zoom-in",
        marginTop: "15px"
      }
    },
  },
  typography: {
    useNextVariants: true,
  },
})
class ResponsiveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      note: "",
      title: "",
      description: "",
      color: "",
      archive: "",
      _id: "",
      reminder: "",
      label: ""
    };
    this.getData = this.getData.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleDescClick = this.handleDescClick.bind(this);
  }
  async handleTitleClick(evt) {
    await this.setState({ title: evt.target.value })
  }
  async handleDescClick(evt) {
    await this.setState({ description: evt.target.value })
  }
  handleClose = () => {
    this.props.editTitle(this.state._id, this.state.title)
    this.props.editDescription(this.state._id, this.state.description)
    this.props.close();
  }
  getData(note) {
    console.log("note in dialog==>", note);
    if (note.title !== undefined || note.description !== undefined) {
      this.setState({
        note: note,
        title: note.title,
        color: note.color,
        description: note.description,
        archive: note.archive,
        _id: note._id,
        reminder: note.reminder,
        label:note.label
      })
    }
  }
  archiveNote = (value, noteId) => {
    this.setState({ archive: value })
    this.props.archiveNote(value, noteId)
    this.props.close();
  }
  reminderNote = (value, noteId) => {
    this.setState({ reminder: value })
    this.props.reminder(value, noteId)
  }
  reminderNotes = () => {
    this.setState({ reminder: "" })
    this.props.reminder('', this.state._id)
  }
  createNotePropsToTools = (value, noteID) => {
    this.setState({ color: value })
    this.props.createNotePropsToTools(value, noteID)
  }
  async DeleteLabel(label, id) {
    let newArr = this.state.label;
    newArr = newArr.filter(item => item !== label);
    await this.setState({
    label: newArr
    });
    this.props.deleteLabelFromNote(label, id)
    }
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Dialog
            open={this.props.parentProps}
          >
            <div id="dialogbox" style={{ backgroundColor: this.state.color }} >
              <div className="createNotePinIcon1">
                <Input
                  className="dialogInputBase"
                  disableUnderline={true}
                  placeholder="Title"
                  multiline
                  value={this.state.title}
                  onChange={this.handleTitleClick}
                />

              </div>
              <div className="createNotePinIcon2">
                <Input
                  className="dialogInputBase"
                  disableUnderline={true}
                  placeholder="Note"
                  multiline
                  value={this.state.description}
                  onChange={this.handleDescClick}
                />
              </div>
              {this.state.reminder ?
                <div className="chipdialog">
                  <Chip
                    label={this.state.reminder}
                    onDelete={() => this.reminderNotes()}
                  />
                </div>
                :
                null}

              {this.state.label.length > 0 ?
                this.state.label.map((key1, index) => (

                  <Chip
                    label={key1}
                    onDelete={() => this.DeleteLabel(key1, this.state._id)}
                  />
                ))
                : null
              }
              <div className="cardToolsClose1">
                <Tools
                  createNotePropsToTools={this.createNotePropsToTools}
                  reminder={this.reminderNote}
                  trashNote={this.trashNote}
                  archiveStatus={this.state.archive}
                  archiveNote={this.archiveNote}
                  noteID={this.state._id}
                  addLabelToNote={this.props.addLabelToNote}
                  deleteLabelFromNote={this.props.deleteLabelFromNote}
                />
                <div>
                  <Button onClick={this.handleClose}>close</Button>
                </div>
              </div>
            </div>
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default (ResponsiveDialog);