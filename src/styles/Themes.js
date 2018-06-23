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
  },
  special: {
    body: {
      backgroundColor: '#263238',
    },
    root: {
      backgroundColor: '#4f5b62',
    },
    week: {
      dayview: {
        backgroundColor: '#4f5b62',
      },
      sidetimesview: {
        backgroundColor: '#4f5b62',
        color: '#263238',
      },
      dayheader: {
        backgroundColor: '#4f5b62',
      },
      daybody: {
        backgroundColor: '#4f5b62',
      },
    },
    event: {
      backgroundColor: '#263238',
      boxShadow: '#000a12',
      fontColor: '#ffffff',
    },
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
      main: '#2f57d6',
      light: '#7083ff',
      dark: '#002fa4',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f73996',
      light: '#ff74c7',
      dark: '#bf0068',
      contrastText: '#ffffff',
    },
  },
  special: {
    body: {
      backgroundColor: '#002fa4',
    },
    root: {
      backgroundColor: '#ff74c7',
    },
    week: {
      dayview: {
        backgroundColor: '#ffffff',
      },
      sidetimesview: {
        backgroundColor: '#ffffff',
        color: '#b2b2b2',
      },
      dayheader: {
        backgroundColor: '#ffffff',
      },
      daybody: {
        backgroundColor: '#ffffff',
      },
    },
    event: {
      backgroundColor: '#2f57d6',
      boxShadow: '#002fa4',
      fontColor: '#ffffff',
    },
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
  },
  special: {
    body: {
      backgroundColor: '#c2c2c2',
    },
    root: {
      backgroundColor: '#f2f2f2',
    },
    week: {
      dayview: {
        backgroundColor: '#fff',
      },
      sidetimesview: {
        backgroundColor: '#fff',
        color: '#b2b2b2',
      },
      dayheader: {
        backgroundColor: '#fff',
      },
      daybody: {
        backgroundColor: '#fff',
      },
    },
    event: {
      backgroundColor: '#f44336',
      boxShadow: '#c2c2c2',
      fontColor: '#ffffff',
    },
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
