import { createMuiTheme } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      paper: '#263238',
      default: '#263238',
    },
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
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#263238',
      },
    },
    MuiPickersDay: {
      day: {
        color: '#ffffff',
      },
      selected: {
        backgroundColor: '#f57c00',
      },
      current: {
        color: '#bb4d00',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#f57c00',
      },
    },
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
      light: '#f2f2f2',
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
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#c2c2c2',
      },
    },
    MuiPickersDay: {
      day: {
        color: '#000000',
      },
      selected: {
        backgroundColor: '#ff7961',
      },
      current: {
        color: '#f44336',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#000000',
      },
    },
  },
});

export { lightTheme, darkTheme, alternativeTheme };
