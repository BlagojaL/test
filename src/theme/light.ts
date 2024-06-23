import { createTheme, ThemeOptions } from '@mui/material/styles';
import colors from './colors';

const light: ThemeOptions = {
  palette: {
    mode: 'light',
    text: {
      primary: colors.light.text.primary,
      secondary: colors.light.text.secondary,
      disabled: colors.light.text.disabled,
    },
  },
};

export default createTheme(light);
