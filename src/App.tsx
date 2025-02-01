import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import TimeTablePage from "./TimeTablePage.tsx";
import TimeDescriptionPage from "./TimeDescriptionPage.tsx";

function App() {
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