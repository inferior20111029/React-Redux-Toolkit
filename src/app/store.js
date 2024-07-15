// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';

import parameterReducer from '../reducers/parameterSlice';

export const store = configureStore({
    reducer: {
        parameter: parameterReducer,
    },
});

export default store;