import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto', // Modern and clean, widely used in material design
      'Open Sans', // Versatile and legible, good for body text
      'Lato', // Friendly and warm, often used for headings
      'Montserrat', // Stylish and strong, often used for headlines
      'Arial', // Classic and widely supported fallback
      'sans-serif', // General fallback
    ].join(','),
  },
  palette: {
    background: {
      default: '#f4f4f4',
    },
    
  },
});

export default theme;
