import { configureStore } from '@reduxjs/toolkit';
import timetableReducer from './timetableSlice';
import authReducer from './authSlice';
import studentReducer from './studentSlice';

const store = configureStore({
    reducer: {
        timetable: timetableReducer,
        auth: authReducer,
        student: studentReducer,
    },
});

export default store;