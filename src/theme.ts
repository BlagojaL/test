import { useSelector } from 'react-redux';
import darkTheme from '../src/theme/dark';
import lightTheme from '../src/theme/light';
import { RootState } from './data/reducers';
import { ThemeMode } from './data/reducers/theme';

const getThemeMode = (state: RootState): ThemeMode => state.theme.mode;

export const useTheme = () => {
  const themeMode = useSelector(getThemeMode);

  return themeMode === ThemeMode.Dark ? darkTheme : lightTheme;
};
