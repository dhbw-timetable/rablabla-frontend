import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

export default class Preferences extends React.Component {
  linkRef = null;

  constructor(props) {
    super(props);
    this.state = {};

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
    this.props.hidePreferences(this.linkRef.value);
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
          <DialogTitle id="form-pref-dialog-title">{language.PREFERENCES}</DialogTitle>
          <DialogContent>
            <Typography variant="title" component="h4">
              {language.TIMETABLE_CONNECTION}
            </Typography>
            <DialogContentText>
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
              defaultValue={this.props.raplaLink}
              margin="dense"
              id="pref-link"
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
              {language.DESIGN_THEME}
            </Typography>
            <DialogContentText>
              {language.DESIGN_THEME_DESCRIPTION}
            </DialogContentText>
            <Select
              value={this.props.theme}
              style={{ width: '100%', maxWidth: '250px' }}
              onChange={(e) => { this.props.setTheme(e.target.value); }}
              inputProps={{
                name: 'theme',
                id: 'pref-theme',
              }}
            >
              <MenuItem value="dark">{language.DESIGN_THEME_DARK}</MenuItem>
              <MenuItem value="light">{language.DESIGN_THEME_LIGHT}</MenuItem>
              <MenuItem value="classic">{language.DESIGN_THEME_CLASSIC}</MenuItem>
              <MenuItem value="alternative">{language.DESIGN_THEME_ALTERNATIVE}</MenuItem>
            </Select>
            <Typography
              variant="title"
              component="h4"
              style={{ marginTop: '25px' }}
            >
              {language.WEEK_STARTING_DAY}
            </Typography>
            <DialogContentText style={{ display: 'inline' }}>
              {language.WEEK_STARTING_DAY_DESCRIPTION}
            </DialogContentText>
            <Checkbox
              style={{ height: 'auto' }}
              checked={this.props.weekStartsOnMonday}
              onChange={(e) => { this.props.setWeekStartsOnMonday(e.target.checked); }}
            />
            <Typography
              variant="title"
              component="h4"
              style={{ marginTop: '25px' }}
            >
              {language.LANGUAGE}
            </Typography>
            <DialogContentText>
              {language.LANGUAGE_DESCRIPTION}
            </DialogContentText>
            <Select
              value={this.props.languageSetting}
              style={{ width: '100%', maxWidth: '250px' }}
              onChange={(e) => { this.props.setLanguage(e.target.value); }}
              inputProps={{
                name: 'language',
                id: 'pref-language',
              }}
            >
              <MenuItem value="german">Deutsch</MenuItem>
              <MenuItem value="english">English</MenuItem>
            </Select>
            <DialogContentText className="version-content">
              {language.VERSION}
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
  weekStartsOnMonday: PropTypes.bool.isRequired,
  setWeekStartsOnMonday: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
  languageSetting: PropTypes.string.isRequired,
  language: PropTypes.object.isRequired,
  setLanguage: PropTypes.func.isRequired,
  hidePreferences: PropTypes.func.isRequired,
  raplaLink: PropTypes.string,
};

Preferences.defaultProps = {
  raplaLink: '',
};
