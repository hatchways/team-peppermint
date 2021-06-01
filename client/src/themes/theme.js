import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: 16,
    h1: {
      // could customize the h1 variant as well
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    caption: {},
  },
  palette: {
    primary: { main: '#4178BF' },
    background: {
      default: '#F2EFEB',
      secondary: '#ADC5D9',
    },
  },
})

// /* Color Theme Swatches in Hex */
// .Apollo-Medical-1-hex { color: #2B4C8C; }
// .Apollo-Medical-2-hex { color: #4178BF; }
// .Apollo-Medical-3-hex { color: #517EA6; }
// .Apollo-Medical-4-hex { color: #ADC5D9; }
// .Apollo-Medical-5-hex { color: #F2EFEB; }

// /* Color Theme Swatches in RGBA */
// .Apollo-Medical-1-rgba { color: rgba(43, 75, 140, 1); }
// .Apollo-Medical-2-rgba { color: rgba(65, 119, 191, 1); }
// .Apollo-Medical-3-rgba { color: rgba(81, 126, 165, 1); }
// .Apollo-Medical-4-rgba { color: rgba(173, 196, 216, 1); }
// .Apollo-Medical-5-rgba { color: rgba(242, 238, 234, 1); }

// /* Color Theme Swatches in HSLA */
// .Apollo-Medical-1-hsla { color: hsla(219, 52, 36, 1); }
// .Apollo-Medical-2-hsla { color: hsla(213, 49, 50, 1); }
// .Apollo-Medical-3-hsla { color: hsla(208, 34, 48, 1); }
// .Apollo-Medical-4-hsla { color: hsla(208, 36, 76, 1); }
// .Apollo-Medical-5-hsla { color: hsla(33, 22, 93, 1); }