import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

const initialState = {
    students: [],
    currentStudentId: null,
    currentCount: 0,
    currentTimeTable: [],
    fullName: "",
    group: "",
    cost: 0,
    studentStatus: "",
    isLoading: false,
    error: null,
};

api.instance.defaults.baseURL = '/api';

// Асинхронный thunk для загрузки текущей заявки
export const fetchCurrentStudent = createAsyncThunk("timetable/fetchCurrentStudent", async (_, { rejectWithValue }) => {
    try {
        const response = await api.timetables.timetablesList();
        const draft_request_id = response.data.find(item => item.draft_request_id).draft_request_id;
        const current_count = response.data.find(item => item.current_count).current_count;
        console.log(response.data, draft_request_id, current_count);
        return { draft_request_id, current_count };
    } catch (error) {
        return rejectWithValue("Ошибка загрузки расписания");
    }
});

export const fetchStudents = createAsyncThunk(
    "student/fetchStudents",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.listStudents.listStudentsList();
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue("Ошибка при загрузке заявок");
        }
    }
);

export const fetchStudentData = createAsyncThunk(
    "student/fetchStudentData",
    async (studentId, { rejectWithValue }) => {
        try {
            const response = await api.student.studentRead(studentId);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue("Заявка не найдена");
        }
    }
);

export const deleteTimeFromStudent = createAsyncThunk(
    "student/deleteTimeFromStudent",
    async ({ studentId, timeId }, { rejectWithValue }) => {
        try {
            await api.deleteFromStudent.deleteFromStudentTimetableDelete(studentId, timeId);
            return timeId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateStudentData = createAsyncThunk(
    "student/updateStudentData",
    async ({ studentId, fullName, group }, { rejectWithValue }) => {
        try {
            const response = await api.student.studentUpdate(studentId, {
                full_name: fullName,
                group: group,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCost = createAsyncThunk(
    "student/updateCost",
    async ({ studentId, timeId, cost }, { rejectWithValue }) => {
        try {
            await api.addCostToStudent.addCostToStudentTimetableUpdate(studentId, timeId, { cost: cost });
            return { timeId, cost };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const formStudent = createAsyncThunk(
    "student/formStudent",
    async (studentId, { rejectWithValue }) => {
        try {
            await api.formStudent.formStudentUpdate(studentId);
            return null;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteStudent = createAsyncThunk(
    "student/deleteStudent",
    async (studentId, { rejectWithValue }) => {
        try {
            await api.deleteStudent.deleteStudentDelete(studentId);
            return null;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const moderateStudent = createAsyncThunk(
    "student/moderateStudent",
    async ({ studentId, accept }, { rejectWithValue }) => {
        try {
            await api.moderateStudent.moderateStudentUpdate(studentId, { "accept" : accept });
            return studentId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setCurrentStudentId: (state, action) => {
            state.currentStudentId = action.payload;
        },
        setCurrentCount: (state, action) => {
            state.currentCount = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentStudent.fulfilled, (state, action) => {
                state.currentStudentId = action.payload.draft_request_id;
                state.currentCount = action.payload.current_count;
            })
            .addCase(fetchCurrentStudent.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(fetchStudents.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.students = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchStudentData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchStudentData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentTimeTable = action.payload.timetables;
                state.fullName = action.payload.full_name;
                state.group = action.payload.group;
                state.studentStatus = action.payload.status;
            })
            .addCase(fetchStudentData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteTimeFromStudent.fulfilled, (state, action) => {
                state.currentTimeTable = state.currentTimeTable.filter(
                    (time) => time.pk !== action.payload
                );
            })

            .addCase(updateStudentData.fulfilled, (state, action) => {
                state.fullName = action.payload.full_name;
                state.group = action.payload.group;
            })

            .addCase(updateCost.fulfilled, (state, action) => {
                const { timeId, cost } = action.payload;
                const time = state.currentTimeTable.find((time) => time.pk === timeId);
                if (time) time.cost = cost;
            })

            .addCase(formStudent.fulfilled, (state) => {
                state.currentStudentId = null;
                state.currentCount = 0;
            })

            .addCase(deleteStudent.fulfilled, (state) => {
                state.currentStudentId = null;
                state.currentCount = 0;
            })
    },
});

export default studentSlice.reducer;
