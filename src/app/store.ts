import { configureStore } from '@reduxjs/toolkit';
import parameterReducer from '../reducers/parameterSlice';

export const store = configureStore({
    reducer: {
        parameter: parameterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;