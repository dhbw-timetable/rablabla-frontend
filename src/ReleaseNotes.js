import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export default class Preferences extends React.Component {

  constructor(props) {
    super(props);

    if (props.open) {
      window.addEventListener('keypress', this.handleKeypress);
    }
  }

  componentDidUpdate = () => {
    if (this.props.open) {
      window.addEventListener('keypress', this.handleKeypress);
    }
  };

  handleKeypress = (e) => {
    if (e.keyCode === 13) this.handleClose();
  };

  handleClose = () => {
    this.props.closeReleaseNotes();
  };

  render() {
    const { language } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-pref-dialog-title"
        >
          <DialogTitle id="form-pref-dialog-title">{language.RELEASE_NOTES}</DialogTitle>
          <DialogContent>
            <Typography variant="title" component="h4" color="secondary">
              {language.RELEASE_NOTE_THEMES_TITLE}
            </Typography>
            <DialogContentText style={{ marginBottom: '30px' }}>
              {language.RELEASE_NOTE_THEMES_DESCRIPTION}
            </DialogContentText>
            <Typography variant="title" component="h4" color="secondary">
              {language.RELEASE_NOTE_PROGRESS_TITLE}
            </Typography>
            <DialogContentText style={{ marginBottom: '30px' }}>
              {language.RELEASE_NOTE_PROGRESS_DESCRIPTION}
            </DialogContentText>
            <Typography variant="title" component="h4" color="secondary">
              {language.RELEASE_NOTE_PREFERENCES_TITLE}
            </Typography>
            <DialogContentText style={{ marginBottom: '30px' }}>
              {language.RELEASE_NOTE_PREFERENCES_DESCRIPTION}
            </DialogContentText>
            <Typography variant="title" component="h4" color="secondary">
              {language.RELEASE_NOTE_WEEKBUTTONS_TITLE}
            </Typography>
            <DialogContentText style={{ marginBottom: '30px' }}>
              {language.RELEASE_NOTE_WEEKBUTTONS_DESCRIPTION}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              {language.CLOSE}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Preferences.propTypes = {
  open: PropTypes.bool.isRequired,
  language: PropTypes.object.isRequired,
  closeReleaseNotes: PropTypes.func.isRequired,
};
