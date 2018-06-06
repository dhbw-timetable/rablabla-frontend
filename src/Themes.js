import { createMuiTheme } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#263238',
      light: '#4f5b62',
      dark: '#000a12',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffad42',
      main: '#f57c00',
      dark: '#bb4d00',
      contrastText: '#ffffff',
    },
    // error: will use the default color
  },
});

const alternativeTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#3057d5',
      light: '#7183ff',
      dark: '#002fa3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8bffdc',
      light: '#c0ffff',
      dark: '#56cbaa',
      contrastText: '#000000',
    },
    // error: will use the default color
  },
});

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#f5f5f5',
      light: '#ffffff',
      dark: '#c2c2c2',
      contrastText: '#000000',
    },
    secondary: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
      contrastText: '#ffffff',
    },
    // error: will use the default color
  },
});

export { lightTheme, darkTheme, alternativeTheme };
