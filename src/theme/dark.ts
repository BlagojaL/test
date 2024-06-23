import { createTheme, ThemeOptions } from '@mui/material/styles';
import colors from './colors';

const dark: ThemeOptions = {
  palette: {
    mode: 'dark',
    text: {
      primary: colors.dark.text.primary,
      secondary: colors.dark.text.secondary,
      disabled: colors.dark.text.disabled,
    },
  },
};

export default createTheme(dark);
