import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {api} from "../api";

type TimeTableItem = {
    pk: number;
    title: string;
    description: string;
    picture_url: string;
};

type TimeTableState = {
    input: string;
    timetable: TimeTableItem[];
    selectedTimeTable: TimeTableItem | null;
    currentStudentId: null,
    currentCount: 0;
    isLoading: boolean;
    error: string | null;
};

const initialState: TimeTableState = {
    input: "",
    timetable: [],
    selectedTimeTable: null,
    currentStudentId: null,
    currentCount: 0,
    isLoading: false,
    error: null,
};

api.instance.defaults.baseURL = '/api';

// Асинхронный thunk для загрузки всего расписания
export const fetchTimeTable = createAsyncThunk(
    "timetable/fetchTimeTable",
    async (_, { rejectWithValue }) => {
    try {
        const response = await api.timetables.timetablesList();
        return response.data.filter((item: TimeTableItem) => item.pk);
    } catch (error) {
        return rejectWithValue("Ошибка загрузки расписания");
    }
});

// Асинхронный thunk для поиска расписания по названию
export const searchTimeTable = createAsyncThunk("timetable/searchTimeTable", async (input, { rejectWithValue }) => {
    try {
        const response = await api.timetables.timetablesList({ title: input });
        return response.data.filter((item: TimeTableItem) => item.pk);
    } catch (error) {
        return rejectWithValue("Ошибка поиска расписания");
    }
});

// Асинхронный thunk для загрузки конкретного расписания по ID
export const fetchTimeTableById = createAsyncThunk("timetable/fetchTimeTableById", async (timeId: number, { rejectWithValue }) => {
    try {
        const response = await api.timetables.timetablesRead(timeId);
        return response.data;
    } catch (error) {
        return rejectWithValue("Ошибка загрузки расписания");
    }
});

export const addTimeToStudent = createAsyncThunk('timetable/addTimeToStudent', async (timeTableId, { getState, rejectWithValue }) => {
    try {
        const csrfToken = Cookies.get('csrftoken');
        const sessionid = Cookies.get('sessionid');
        await api.timetables.timetablesAddCreate(timeTableId, {}, {
            headers: {
                'X-CSRFToken': csrfToken,
                'sessionid': sessionid,
            },
        });
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const timetableSlice = createSlice({
    name: "timetable",
    initialState,
    reducers: {
        setTimeTable: (state, action) => {
            state.timetable = action.payload;
        },
        setInput: (state, action) => {
            state.input = action.payload;
        },
        setCurrentStudentId: (state, action) => {
            state.currentStudentId = action.payload;
        },
        setCount: (state, action) => {
            state.currentCount = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTimeTable.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTimeTable.fulfilled, (state, action) => {
                state.isLoading = false;
                state.timetable = action.payload;
            })
            .addCase(fetchTimeTable.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(searchTimeTable.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(searchTimeTable.fulfilled, (state, action) => {
                state.isLoading = false;
                state.timetable = action.payload;
            })
            .addCase(searchTimeTable.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchTimeTableById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.selectedTimeTable = null;
            })
            .addCase(fetchTimeTableById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedTimeTable = action.payload;
            })
            .addCase(fetchTimeTableById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(addTimeToStudent.fulfilled, (state, action) => {
                state.currentCount += 1;
            })
            .addCase(addTimeToStudent.rejected, (state, action) => {
                state.error = action.payload as string;
            })
    },
});

export const { setInput } = timetableSlice.actions;
export default timetableSlice.reducer;
