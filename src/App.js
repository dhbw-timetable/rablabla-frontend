import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { lightTheme, darkTheme, alternativeTheme } from './Themes';
import NavigationBar from './NavigationBar';
import Header from './Header';
import Body from './Body';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: darkTheme,
    };
  }

  setTheme(themeString) {
    let theme;
    if (themeString === 'dark') {
      theme = darkTheme;
    } else {
      theme = themeString === 'light' ? lightTheme : alternativeTheme;
    }
    this.setState({ theme });
  }

  render() {
    return (
      <MuiThemeProvider theme={this.state.theme}>
        <NavigationBar title="Rablabla" />
        <Header />
        <Body setTheme={this.setTheme.bind(this)} />
      </MuiThemeProvider>
    );
  }
}
