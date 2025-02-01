import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import TimeTablePage from "./TimeTablePage.tsx";
import TimeDescriptionPage from "./TimeDescriptionPage.tsx";
import {useEffect} from "react";

function App() {
    useEffect(() => {
        // Check if we're in a Tauri environment
        if (window.__TAURI__) {
            const { invoke } = window.__TAURI__.tauri;

            invoke('tauri', { cmd: 'create' })
                .then((response: any) => console.log(response))
                .catch((error: any) => console.log(error));

            return () => {
                invoke('tauri', { cmd: 'close' })
                    .then((response: any) => console.log(response))
                    .catch((error: any) => console.log(error));
            };
        }
    }, []);

    return (
        <Router basename="/polyclinic-frontend">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/timetable" element={<TimeTablePage />} />
                <Route path="/timetable/:timeTableId" element={<TimeDescriptionPage />} />
            </Routes>
        </Router>
    );
}

export default App;