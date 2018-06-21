import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DatePicker } from 'material-ui-pickers';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';
import 'moment/locale/de';
import 'moment/locale/en-gb';
import { lightTheme, darkTheme, alternativeTheme } from './Themes';
import StatusBar from './StatusBar';
import NavigationBar from './NavigationBar';
import SideTimeView from './SideTimeView';
import Preferences from './Preferences';
import WeekView from './WeekView';
import Onboarding from './Onboarding';
import getWeekEvents from './BackendConnection';
import germanLang from './Texts_de';
import englishLang from './Texts_en';

export default class App extends React.Component {
  raplaLink = null;
  datePickerInput = null;
  navbar = null;
  mounted = false;

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
      weekStartsOnMonday = weekStartsOnMonday === 'true';
    }

    moment.locale(window.localStorage.getItem('mmtLocale') || 'de');

    const languageSetting = window.localStorage.getItem('language') || 'german';

    const themeString = window.localStorage.getItem('theme');
    const theme = themeString !== null ? this.getTheme(themeString) : darkTheme;

    document.querySelector('body').style['background-color'] = theme.palette.primary.main;
    document.querySelector('#root').style['background-color'] = theme.palette.primary.light;

    const displayDate = moment('2017-07-24');

    let eventData = JSON.parse(window.localStorage.getItem('eventData'));
    if (eventData) {
      // parse moment js objects
      Object.keys(eventData).forEach((weekKey) => {
        eventData[weekKey].forEach((eventObj) => {
          eventObj.startMmt = moment(eventObj.startMmt);
          eventObj.endMmt = moment(eventObj.endMmt);
        });
      });
    } else {
      eventData = {};
    }

    this.state = {
      eventData,
      loading: !onboardingOpen,
      navbarHeight: 0,
      onboardingOpen,
      theme,
      displayDate,
      preferencesOpen: false,
      weekStartsOnMonday,
      languageSetting,
      language: languageSetting === 'german' ? germanLang : englishLang,
    };

    window.addEventListener('resize', this.onResize);

    if (!onboardingOpen) {
      this.doRefresh(false);
    }
  }

  onResize = () => {
    this.setState({ navbarHeight: document.querySelector('header.navbar').clientHeight });
  };

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

    document.querySelector('body').style['background-color'] = theme.palette.primary.main;
    document.querySelector('#root').style['background-color'] = theme.palette.primary.light;

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
    this.setState({ displayDate });
    this.doRefresh(true);
  }

  doRefresh = (isMounted) => {
    if (isMounted) {
      this.setState({ loading: true });
    }
    getWeekEvents(this.raplaLink, this.state.displayDate,
      this.onGetDone, this.onGetFail);
  }

  showPreferences = () => {
    this.setState({ preferencesOpen: true });
  }

  hidePreferences = (link) => {
    this.raplaLink = link;
    window.localStorage.setItem('raplaLink', link);

    this.doRefresh(true);
    this.setState({ preferencesOpen: false });
  }

  showDatePicker = () => {
    this.datePickerInput.click();
  }

  applyOnboarding = (link) => {
    this.raplaLink = link;
    window.localStorage.setItem('raplaLink', link);
    this.setState({ onboardingOpen: false });
    this.doRefresh(true);
  }

  onGetDone = (preparedData) => {
    const eventData = Object.keys(this.state.eventData).filter((weekKey) => {
      return Math.abs(moment(weekKey, 'DD.MM.YYYY').diff(moment(), 'days')) <= 42;
    }).reduce((obj, key) => {
      obj[key] = this.state.eventData[key];
      return obj;
    }, {});

    // merge eventData of the last/next 42 days with new preparedData
    Object.assign(eventData, preparedData);

    window.localStorage.setItem('eventData', JSON.stringify(eventData));

    this.setState({ eventData, loading: false });
  }

  onGetFail = (error) => {
    console.error('Ouuups a wild error occured. You can try to continue using the page but we do recommend to reload to page and check your internet and timetable connection!');
    console.error(error);

    this.setState({ loading: false });
  }

  componentDidMount() {
    this.setState({ navbarHeight: document.querySelector('header.navbar').clientHeight });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    const { eventData, displayDate, theme, preferencesOpen, weekStartsOnMonday,
      languageSetting, language, onboardingOpen, navbarHeight, loading } = this.state;
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
              displayDate={displayDate}
              weekStartsOnMonday={weekStartsOnMonday}
              theme={theme}
              eventData={eventData}
              language={language}
            />
            <SideTimeView navbarHeight={navbarHeight} theme={theme} />
            <Onboarding
              language={language}
              open={onboardingOpen}
              applyOnboarding={this.applyOnboarding}
              toggleLanguage={this.toggleLanguage}
            />
            {loading ?
              <LinearProgress style={{ top: `${navbarHeight}px` }} className="progressbar" color="secondary" />
              : <div />
            }
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}
