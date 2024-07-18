import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParameterState {
    value: string;
}

const initialState: ParameterState = {
    value: '',
};

export const parameterSlice = createSlice({
    name: 'parameter',
    initialState,
    reducers: {
        setParameter: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setParameter } = parameterSlice.actions;
export default parameterSlice.reducer;
