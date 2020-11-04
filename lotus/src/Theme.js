import {
  createMuiTheme,
  responsiveFontSizes,
  Theme,
} from '@material-ui/core/styles';


export const baseTheme = createMuiTheme({
  spacing: (factor) => `${0.5 * factor}rem`,
  palette: {
    primary: {
      main: '#F6831F',
      dark: '#899393',
    },
    common: {
      white: '#fff',
      black: '#000',
    },
  },
  overrides: {
    MuiInputLabel: {
      outlined: {
        fontFamily: 'Regular',
        color: '#707070',
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 'none',

        color: '#fff',

        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        },
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        },
      },
    },
  },

  typography: {
    h1: {
      color: '#fff',
      fontSize: '1.3rem',
    },
    h2: {
      color: '#fff',
      fontSize: '1rem',
    },
  },
});

export const theme = responsiveFontSizes(baseTheme, {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
});
