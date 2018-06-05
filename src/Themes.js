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
      main: '#3d70b2',
      light: '#729ee4',
      dark: '#004582',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#5596e6',
      light: '#8cc6ff',
      dark: '#0069b3',
      contrastText: '#ffffff',
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
      main: '#afbdc4',
      light: '#e1eff7',
      dark: '#808d94',
      contrastText: '#000000',
    },
    // error: will use the default color
  },
});

export { lightTheme, darkTheme, alternativeTheme };
