import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import moment from 'moment';
import { lightTheme, darkTheme, alternativeTheme } from './Themes';
import NavigationBar from './NavigationBar';
import Body from './Body';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: darkTheme,
      displayDate: moment(),
    };
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

  setDisplayDate = (displayDate) => {
    this.setState({ displayDate });
  }

  doRefresh = () => {
    // TODO: Implement backend call
  }

  render() {
    const { displayDate, theme } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <NavigationBar
            displayDate={displayDate}
            setDisplayDate={this.setDisplayDate}
            setTheme={this.setTheme}
            doRefresh={this.doRefresh}
            darkFont={theme === lightTheme}
          />
          <Body setTheme={this.setTheme} />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}
