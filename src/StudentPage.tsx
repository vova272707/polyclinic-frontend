import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchStudentData,
    deleteTimeFromStudent,
    updateStudentData,
    updateCost,
    formStudent,
    deleteStudent,
} from "./redux/studentSlice";
import Navbar from "./components/Navbar";
import { FaTrash, FaCheck, FaCheckCircle } from "react-icons/fa";
import Breadcrumbs from "./components/Breadcrumbs.tsx";

const StudentPage = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { fullName, group, currentTimeTable, isLoading, error } = useSelector(
        (state) => state.student
    );

    const [editableName, setEditableName] = useState(fullName);
    const [editableGroup, setEditableGroup] = useState(group);
    const [costs, setCosts] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        if (studentId) {
            dispatch(fetchStudentData(studentId));
        }
    }, [studentId, dispatch]);

    useEffect(() => {
        setEditableName(fullName);
        setEditableGroup(group);
    }, [fullName, group]);

    const handleUpdateStudent = () => {
        if (studentId) {
            dispatch(updateStudentData({ studentId, fullName: editableName, group: editableGroup }));
        }
    };

    const handleCostChange = (timeId: number, value: string) => {
        setCosts((prev) => ({ ...prev, [timeId]: value }));
    };

    const handleUpdateCost = (timeId: number) => {
        if (studentId && costs[timeId] !== undefined) {
            dispatch(updateCost({ studentId, timeId, cost: costs[timeId] }));
        }
    };

    const handleDeleteTime = (timeId: number) => {
        if (studentId) {
            dispatch(deleteTimeFromStudent({ studentId, timeId }));
        }
    };

    const handleDeleteStudent = () => {
        if (studentId) {
            dispatch(deleteStudent(studentId));
            navigate("/timetable");
        }
    };

    const handleFormStudent = () => {
        if (studentId) {
            dispatch(formStudent(studentId));
            navigate("/timetable");
        }
    };

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        (event.target as HTMLImageElement).src = "/polyclinic-frontend/default_time.svg";
    };

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 font-roboto">
            <Navbar />
            <Breadcrumbs path={`/timetable/student`} />

            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Текущая заявка студента
                </h1>

                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[30vh]">
                        <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-[#144ECA] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-2xl mx-auto">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">ФИО</label>
                                <input
                                    type="text"
                                    value={editableName}
                                    onChange={(e) => setEditableName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#144ECA] focus:border-[#144ECA]"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Группа</label>
                                <input
                                    type="text"
                                    value={editableGroup}
                                    onChange={(e) => setEditableGroup(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#144ECA] focus:border-[#144ECA]"
                                />
                            </div>
                            <button
                                onClick={handleUpdateStudent}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300"
                            >
                                Обновить
                            </button>
                        </div>

                        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                            {currentTimeTable.map((time) => (
                                <div
                                    key={time.pk}
                                    className="bg-white flex items-center p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                                >
                                    <img
                                        src={time.picture_url}
                                        alt={time.title}
                                        className="w-16 h-16 object-contain mr-4"
                                        onError={handleImageError}
                                    />

                                    <div className="flex-1">
                                        <span className="block text-lg font-semibold">{time.title}</span>
                                        <div className="flex items-center mt-2">
                                            <input
                                                type="number"
                                                value={costs[time.pk] ?? time.cost ?? ""}
                                                onChange={(e) => handleCostChange(time.pk, e.target.value)}
                                                className="border px-3 py-1 rounded-md w-36 mr-2"
                                                placeholder="Стоимость"
                                            />
                                            <button
                                                onClick={() => handleUpdateCost(time.pk)}
                                                className="text-green-600 hover:text-green-800 text-xl"
                                            >
                                                <FaCheck />
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDeleteTime(time.pk)}
                                        className="text-red-500 hover:text-red-700 text-xl ml-4"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-4 my-6">
                            <button
                                onClick={handleFormStudent}
                                className="flex items-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-300"
                            >
                                <FaCheckCircle className="mr-2" /> Сформировать
                            </button>
                            <button
                                onClick={handleDeleteStudent}
                                className="flex items-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all duration-300"
                            >
                                <FaTrash className="mr-2" /> Удалить
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default StudentPage;
