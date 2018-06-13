import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import moment from 'moment';
import 'moment/locale/de';
import 'moment/locale/en-gb';
import { lightTheme, darkTheme, alternativeTheme } from './Themes';
import NavigationBar from './NavigationBar';
import Preferences from './Preferences';
import getWeekEvents from './BackendConnection';
import germanLang from './Texts_de';
import englishLang from './Texts_en';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    moment.locale('en');

    this.state = {
      theme: darkTheme,
      displayDate: moment(),
      preferencesOpen: false,
      datePickerOpen: false,
      weekStartsOnMonday: true,
      languageSetting: 'english',
      language: englishLang,
    };
  }

  setWeekStartsOnMonday = (weekStartsOnMonday) => {
    this.setState({ weekStartsOnMonday });
  }

  getLanguage = (languageString) => {
    return languageString === 'german' ? germanLang : englishLang;
  };

  setLanguage = (languageString) => {
    moment.locale(languageString === 'german' ? 'de' : 'en');
    // rebuild the moment to apply the new locale
    const d = this.state.displayDate;
    this.setState({
      displayDate: moment(`${d.month() + 1}-${d.date()}-${d.year()}`, 'MM-DD-YYYY'),
      languageSetting: languageString,
      language: this.getLanguage(languageString),
    });
  }

  setTheme = (themeString) => {
    let theme;
    if (themeString === 'dark') {
      theme = darkTheme;
    } else {
      theme = themeString === 'light' ? lightTheme : alternativeTheme;
    }
    this.setState({ theme });
  }

  getThemeString = (theme) => {
    if (theme === darkTheme) {
      return 'dark';
    } else if (theme === lightTheme) {
      return 'light';
    }
    return 'alternative';
  }

  setDisplayDate = (displayDate) => {
    // TODO: Fetch event data
    this.setState({ displayDate });
  }

  doRefresh = () => {
    getWeekEvents(this.state.url, this.state.displayDate,
      this.onGetDone, this.onGetFail);
  }

  showPreferences = () => {
    this.setState({ preferencesOpen: true });
  }

  hidePreferences = () => {
    this.setState({ preferencesOpen: false });
  }

  showDatePicker = () => {
    this.setState({ datePickerOpen: true });
  }

  hideDatePicker = () => {
    this.setState({ datePickerOpen: false });
  }

  onGetDone = () => {

  }

  onGetFail = () => {

  }

  render() {
    const { displayDate, theme, preferencesOpen, weekStartsOnMonday,
      languageSetting, language } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <NavigationBar
            language={language}
            displayDate={displayDate}
            setDisplayDate={this.setDisplayDate}
            doRefresh={this.doRefresh}
            darkFont={theme === lightTheme}
            showPreferences={this.showPreferences}
            showDatePicker={this.showDatePicker}
          />
          <Preferences
            language={language}
            open={preferencesOpen}
            setTheme={this.setTheme}
            theme={this.getThemeString(theme)}
            setLanguage={this.setLanguage}
            languageSetting={languageSetting}
            hidePreferences={this.hidePreferences}
            weekStartsOnMonday={weekStartsOnMonday}
            setWeekStartsOnMonday={this.setWeekStartsOnMonday}
          />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}
