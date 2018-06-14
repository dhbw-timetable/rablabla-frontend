import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export default class Onboarding extends React.Component {
  linkRef = null;

  render() {
    const { language } = this.props;
    return (
      <div>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.props.open}
          aria-labelledby="form-onboarding-dialog-title"
        >
          <DialogTitle id="form-onboarding-dialog-title">{language.ONBOARDING}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {language.ONBOARDING_DESCRIPTION}
              <br /><br />
              {language.TIMETABLE_CONNECTION_DESCRIPTION1}
              <br />
              <code>
                {language.TIMETABLE_CONNECTION_SAMPLE1}
              </code>
              <br />
              {language.TIMETABLE_CONNECTION_DESCRIPTION_OR}
              <br />
              <code>
              {language.TIMETABLE_CONNECTION_SAMPLE2}
              </code>
            </DialogContentText>
            <TextField
              margin="dense"
              id="onboarding-link"
              label={language.TIMETABLE_CONNECTION_LABEL}
              type="link"
              fullWidth
              inputRef={el => this.linkRef = el}
            />
            <Typography
              variant="title"
              component="h4"
              style={{ marginTop: '25px' }}
            >
              {language.LEGAL_TITLE}
            </Typography>
            <DialogContentText>
              {language.LEGAL_DESCRIPTION1}
              <a style={{ textDecoration: 'none' }} href={language.LEGAL_GFONTS_LINK}>
                {language.LEGAL_GFONTS_MORE}
              </a>
              <br /><br />
              {language.LEGAL_DESCRIPTION2}
            </DialogContentText>
           </DialogContent>
          <DialogActions classes={{ root: 'onboarding-actions' }}>
            <Button
              onClick={this.props.toggleLanguage}
              color="secondary"
              style={{}}
            >
              Language
            </Button>
            <Button
              onClick={() => {
                // TODO: validate link
                this.props.applyOnboarding(this.linkRef.value);
              }}
              color="secondary"
            >
              {language.ACCEPT}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Onboarding.propTypes = {
  language: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  applyOnboarding: PropTypes.func.isRequired,
  toggleLanguage: PropTypes.func.isRequired,
};
