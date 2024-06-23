import React, { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from './store'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { useTheme } from './theme';
import PetTable from './pages/PetTable';

export type EmptyObject = Record<string, never>;

export type AnyObject = Record<string, unknown>;

export interface Component<P = EmptyObject> {
  (props: P): ReactElement | null;
}

export type ChildrenProps = { children?: ReactNode };

export type ClassNameProps = { className?: string };

export const StyleProviders: Component<ChildrenProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

const App: Component = () => {

  return (
    <Provider store={store}>
      {/* <StyleProviders> */}
        <PetTable />
      {/* </StyleProviders> */}
    </Provider>
  );
};

export default App;
