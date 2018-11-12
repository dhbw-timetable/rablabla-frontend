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

  constructor(props) {
    super(props);
    this.state = {
      linkValid: true,
    };

    if (props.open) {
      window.addEventListener('keypress', this.handleKeypress);
    }
  }

  handleKeypress = (e) => {
    if (e.keyCode === 13) this.onAgree();
  };

  isLinkValid = (link) => {
    return /https:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(link);
  };

  onAgree = () => {
    const link = this.linkRef.value;
    const linkValid = this.isLinkValid(link);
    this.setState({ linkValid });
    if (linkValid) {
      window.removeEventListener('keypress', this.handleKeypress);
      const trimmedLink = this.trimLink(link);
      this.props.applyOnboarding(trimmedLink);
    }
  };

  trimLink = (link) => {
    const baseUrl = link.substring(0, link.indexOf('?'));
    const args = link.substring(link.indexOf('?') + 1, link.length).split('&');
    const allowedKeys = ['key', 'user', 'file', 'page'];
    const trimmedArgs = args.filter((el) => {
      try {
        return allowedKeys.some((key) => {
          // console.log(`${key} + ${el} = ${el.split('=')[0].toLowerCase() == key}`);
          return el.split('=')[0].toLowerCase() === key;
        });
      } catch (err) {
        console.log(`Found illegal arg causing: ${err}`);
      }
      return false;
    });
    return `${baseUrl}?${trimmedArgs}`;
  };

  render() {
    const { language, theme } = this.props;
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
              error={!this.state.linkValid}
              margin="dense"
              id="onboarding-link"
              label={language.TIMETABLE_CONNECTION_LABEL}
              helperText={this.state.linkValid ? language.TIMETABLE_CONNECTION_LABEL_VALID
                : language.TIMETABLE_CONNECTION_LABEL_INVALID}
              type="link"
              fullWidth
              inputRef={el => this.linkRef = el}
              onChange={(e) => {
                this.setState({ linkValid: this.isLinkValid(e.target.value) });
              }}
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
              <a
                style={{ textDecoration: 'none', color: theme.palette.primary.main }}
                href={language.LEGAL_GFONTS_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
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
              onClick={this.onAgree}
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
  theme: PropTypes.object.isRequired,
  language: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  applyOnboarding: PropTypes.func.isRequired,
  toggleLanguage: PropTypes.func.isRequired,
};
