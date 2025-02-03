import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import TimeTablePage from "./TimeTablePage.tsx";
import TimeDescriptionPage from "./TimeDescriptionPage.tsx";
import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        // Проверяем, что работаем в среде Tauri
        invoke('tauri', { cmd: 'create' })
            .then(response => console.log(response))
            .catch(error => console.log(error));

        return () => {
            invoke('tauri', { cmd: 'close' })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/timetable" element={<TimeTablePage />} />
                <Route path="/timetable/:timeTableId" element={<TimeDescriptionPage />} />
            </Routes>
        </Router>
    );
}

export default App;
