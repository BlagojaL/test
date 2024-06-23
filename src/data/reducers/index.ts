import { combineReducers } from '@reduxjs/toolkit';
import dogs from './dogs';
import theme from './theme';
import store from '../../store';

const rootReducer = combineReducers({
  dogs,
  theme,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends RootState { }
}

export default rootReducer;
