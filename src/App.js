import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';
import 'moment/locale/de';
import 'moment/locale/en-gb';
import { lightTheme, darkTheme, alternativeTheme } from './Themes';
import StatusBar from './StatusBar';
import NavigationBar from './NavigationBar';
import Preferences from './Preferences';
import WeekView from './WeekView';
import Onboarding from './Onboarding';
import SideTimeView from './SideTimeView';
import getWeekEvents from './BackendConnection';
import germanLang from './Texts_de';
import englishLang from './Texts_en';

export default class App extends React.Component {
  raplaLink = null;
  datePickerInput = null;
  navbar = null;

  constructor(props) {
    super(props);

    let onboardingOpen = false;
    this.raplaLink = window.localStorage.getItem('raplaLink');
    if (this.raplaLink === null) {
      onboardingOpen = true;
    }

    let weekStartsOnMonday = window.localStorage.getItem('weekStartsOnMonday');
    if (weekStartsOnMonday === null) {
      weekStartsOnMonday = true;
    } else {
      weekStartsOnMonday = weekStartsOnMonday === true;
    }

    // TODO: Set week starting day in moment js

    moment.locale(window.localStorage.getItem('mmtLocale') || 'de');

    const languageSetting = window.localStorage.getItem('language') || 'german';

    const themeString = window.localStorage.getItem('theme');
    const theme = themeString !== null ? this.getTheme(themeString) : darkTheme;

    document.querySelector('body').style['background-color'] = theme.palette.primary.light;

    this.state = {
      navbarHeight: 0,
      onboardingOpen,
      theme,
      displayDate: moment(),
      preferencesOpen: false,
      weekStartsOnMonday,
      languageSetting,
      language: languageSetting === 'german' ? germanLang : englishLang,
    };

    window.addEventListener('resize', () => {
      this.setState({ navbarHeight: document.querySelector('header.navbar').clientHeight });
    });
  }

  setWeekStartsOnMonday = (weekStartsOnMonday) => {
    window.localStorage.setItem('weekStartsOnMonday', weekStartsOnMonday ? 'true' : 'false');
    this.setState({ weekStartsOnMonday });
  }

  getLanguage = (languageString) => {
    return languageString === 'german' ? germanLang : englishLang;
  };

  setLanguage = (languageString) => {
    const mmtLocale = languageString === 'german' ? 'de' : 'en';
    window.localStorage.setItem('mmtLocale', mmtLocale);
    moment.locale(mmtLocale);
    // force rebuild the moment to apply the new locale
    const d = this.state.displayDate;
    window.localStorage.setItem('language', languageString);
    this.setState({
      displayDate: moment(`${d.month() + 1}-${d.date()}-${d.year()}`, 'MM-DD-YYYY'),
      languageSetting: languageString,
      language: this.getLanguage(languageString),
    });
  }

  toggleLanguage = () => {
    this.setLanguage(this.state.languageSetting === 'german' ? 'english' : 'german');
  }

  getTheme = (themeString) => {
    if (themeString === 'dark') {
      return darkTheme;
    }
    return themeString === 'light' ? lightTheme : alternativeTheme;
  };

  setTheme = (themeString) => {
    const theme = this.getTheme(themeString);
    window.localStorage.setItem('theme', themeString);

    document.querySelector('body').style['background-color'] = theme.palette.primary.light;

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
    // TODO: Fetch event data?
    this.setState({ displayDate });
  }

  doRefresh = () => {
    getWeekEvents(this.state.url, this.state.displayDate,
      this.onGetDone, this.onGetFail);
  }

  showPreferences = () => {
    this.setState({ preferencesOpen: true });
  }

  hidePreferences = (link) => {
    this.raplaLink = link;
    window.localStorage.setItem('raplaLink', link);

    this.doRefresh();
    this.setState({ preferencesOpen: false });
  }

  showDatePicker = () => {
    this.datePickerInput.click();
  }

  applyOnboarding = (link) => {
    this.raplaLink = link;
    window.localStorage.setItem('raplaLink', link);
    this.setState({ onboardingOpen: false });
  }

  onGetDone = () => {

  }

  onGetFail = () => {

  }

  componentDidMount() {
    this.setState({ navbarHeight: document.querySelector('header.navbar').clientHeight });
  }

  render() {
    const { displayDate, theme, preferencesOpen, weekStartsOnMonday,
      languageSetting, language, onboardingOpen, navbarHeight } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <StatusBar color={theme.palette.primary.main} />
            <NavigationBar
              language={language}
              displayDate={displayDate}
              setDisplayDate={this.setDisplayDate}
              doRefresh={this.doRefresh}
              darkFont={theme === lightTheme}
              showPreferences={this.showPreferences}
              showDatePicker={this.showDatePicker}
            />
            <DatePicker
              style={{ display: 'none' }}
              showTodayButton
              inputRef={el => this.datePickerInput = el}
              value={displayDate}
              okLabel={language.DATE_PICKER_OK}
              cancelLabel={language.DATE_PICKER_CANCEL}
              todayLabel={language.DATE_PICKER_TODAY}
              onChange={(newValue) => { this.setState({ displayDate: newValue }); }}
              animateYearScrolling={false}
            />
            <Preferences
              language={language}
              open={preferencesOpen}
              setTheme={this.setTheme}
              theme={this.getThemeString(theme)}
              setLanguage={this.setLanguage}
              languageSetting={languageSetting}
              weekStartsOnMonday={weekStartsOnMonday}
              setWeekStartsOnMonday={this.setWeekStartsOnMonday}
              raplaLink={this.raplaLink}
              hidePreferences={this.hidePreferences}
            />
            <WeekView
              style={{
                top: `${navbarHeight}px`,
                height: `calc(100vh - ${navbarHeight}px)`,
              }}
              theme={theme}
              language={language}
            />
            <SideTimeView theme={theme} />
            <Onboarding
              language={language}
              open={onboardingOpen}
              applyOnboarding={this.applyOnboarding}
              toggleLanguage={this.toggleLanguage}
            />
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}
