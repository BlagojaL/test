import { configureStore } from '@reduxjs/toolkit';
import reducer from './data/reducers';
import { thunk } from 'redux-thunk';

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store;
