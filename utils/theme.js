import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { deepPurple, amber } from "@mui/material/colors";

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