import { createSlice } from '@reduxjs/toolkit';

export const parameterSlice = createSlice({
    name: 'parameter',
    initialState: '',
    reducers: {
        setParameter: (state, action) => action.payload,
    },
});

export const { setParameter } = parameterSlice.actions;
export default parameterSlice.reducer;
