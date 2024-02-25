import { createTheme } from "@mui/material/styles";

let theme = createTheme({
    palette: {
        secondary:{
          main: '#c5832b'
        },
        primary:{
          main: '#0d1321'
        }
    }
});

// const Theme = responsiveFontSizes(theme);

export default theme;