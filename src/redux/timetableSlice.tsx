import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    input: '',
    timetable: [],
};

const timetableSlice = createSlice({
    name: 'timetable',
    initialState,
    reducers: {
        setTimeTable: (state, action) => {
            state.timetable = action.payload;
        },
        setInput: (state, action) => {
            state.input = action.payload;
        },
    },
});

export const {
    setTimeTable,
    setInput,
} = timetableSlice.actions;

export default timetableSlice.reducer;