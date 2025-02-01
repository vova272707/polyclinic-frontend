import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import TimeTablePage from "./TimeTablePage.tsx";
import TimeDescriptionPage from "./TimeDescriptionPage.tsx";
// import AnimalPage from "./AnimalPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/timetable" element={<TimeTablePage />} />
                <Route path="/timetable/:timeTableId" element={<TimeDescriptionPage />} />
                {/*<Route path="/animal/:animalId" element={<AnimalPage />} />*/}
            </Routes>
        </Router>
    );
}

export default App;