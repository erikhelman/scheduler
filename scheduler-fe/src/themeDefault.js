import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue600, grey900 , white} from 'material-ui/styles/colors';
const themeDefault = getMuiTheme({
  palette: {
    pickerHeaderColor:blue600,
    primary1Color: blue600,
    accent1Color: blue600,
  },
  appBar: {
    height: 57,
    color: blue600
  },
  drawer: {
    width: 230,
    color: grey900
  },
  raisedButton: {
    primaryColor: blue600,
  },
  datePicker: {
    color: blue600,
    selectColor: blue600,
    calendarYearBackgroundColor: blue600,
    pickerHeaderColor:blue600,
    primary1Color: blue600,
    primary2Color: blue600,
    primary3Color: blue600,
    accent1Color: blue600,
    accent2Color: blue600,
    accent3Color: blue600,
    borderColor: blue600,
  },
  snackbar: {
    primaryColor:blue600,
    backgroundColor:blue600,

  }
});


export default themeDefault;
