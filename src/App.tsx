import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import TimeTablePage from "./TimeTablePage.tsx";
import TimeDescriptionPage from "./TimeDescriptionPage.tsx";
import ModeratorTimeTablePage from "./ModeratorTimeTablePage.tsx";
import TimeTableFormPage from "./TimeTableFormPage.tsx";

import StudentPage from "./StudentPage.tsx";
import StudentsList from "./StudentsList.tsx";
import ModeratorStudentListPage from "./ModeratorStudentListPage.tsx";

import LoginPage from "./LoginPage.tsx";
import RegisterPage from "./RegisterPage.tsx";
import ProfilePage from "./ProfilePage.tsx";

import Page403 from "./Page403.tsx";
import Page404 from "./Page404.tsx";
// import {useEffect} from "react";


function App() {
    // useEffect(() => {
    //     // Check if we're in a Tauri environment
    //     if (window.__TAURI__) {
    //         const { invoke } = window.__TAURI__.tauri;
    //
    //         invoke('tauri', { cmd: 'create' })
    //             .then((response: any) => console.log(response))
    //             .catch((error: any) => console.log(error));
    //
    //         return () => {
    //             invoke('tauri', { cmd: 'close' })
    //                 .then((response: any) => console.log(response))
    //                 .catch((error: any) => console.log(error));
    //         };
    //     }
    // }, []);

    return (
        <Router basename="/polyclinic-frontend">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/timetable" element={<TimeTablePage />} />
                <Route path="/timetable/:timeTableId" element={<TimeDescriptionPage />} />
                <Route path="/manage-timetable" element={<ModeratorTimeTablePage />} />
                <Route path="/manage-timetable/edit/:id" element={<TimeTableFormPage />} />
                <Route path="/manage-timetable/create/new" element={<TimeTableFormPage />} />


                <Route path="/student/:studentId" element={<StudentPage />} />
                <Route path="/list-students" element={<StudentsList />} />
                <Route path="/manage-students" element={<ModeratorStudentListPage />} />


                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                <Route path="/403" element={<Page403 />} />
                <Route path="/404" element={<Page404 />} />
            </Routes>
        </Router>
    );
}

export default App;