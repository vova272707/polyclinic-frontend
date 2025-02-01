import { configureStore } from '@reduxjs/toolkit';
import timetableReducer from './timetableSlice';

const store = configureStore({
    reducer: {
        timetable: timetableReducer,
    },
});

export default store;