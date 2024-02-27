import { createTheme } from "@mui/material/styles";

let theme = createTheme({
    palette: {
        secondary:{
          main: '#c5832b'
        },
        primary:{
          main: '#0d1321'
        },
        success: {
          main: '#008000'
        }
    }
});

// const Theme = responsiveFontSizes(theme);

export default theme;