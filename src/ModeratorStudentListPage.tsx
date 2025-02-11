import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, moderateStudent } from "./redux/studentSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs.tsx";
import { FaCheckCircle, FaTrash, FaEye } from "react-icons/fa";

const statusTranslations = {
    draft: "Черновик",
    formed: "Сформирована",
    completed: "Завершена",
    cancelled: "Отменена",
};

const ModeratorStudentListPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { students, isLoading } = useSelector((state) => state.student);

    // Фильтры
    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        status: "",
        creator: "",
    });

    useEffect(() => {
        dispatch(fetchStudents());
        // Short Polling: обновляем заявки каждые 5 секунд
        const interval = setInterval(() => {
            dispatch(fetchStudents());
        }, 5000);

        return () => clearInterval(interval); // Очищаем интервал при размонтировании
    }, [dispatch]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleModeration = async (studentId, accept) => {
        await dispatch(moderateStudent({ studentId, accept }));
        dispatch(fetchStudents()); // Обновляем данные после модерации
    };

    const filteredStudents = students.filter((student) => {
        const createdAt = new Date(student.formed_at);
        const start = filters.startDate ? new Date(filters.startDate) : null;
        const end = filters.endDate ? new Date(filters.endDate + "T23:59:59") : null;

        return (
            (!filters.startDate || createdAt >= start) &&
            (!filters.endDate || createdAt <= end) &&
            (!filters.status || student.status === filters.status) &&
            (!filters.creator || student.username.toLowerCase().includes(filters.creator.toLowerCase()))
        );
    });

    return (
        <div className="min-h-screen bg-gray-100 font-roboto">
            <Navbar />
            <Breadcrumbs path="/manage-students" />

            <div className="container mx-auto p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Управление заявками</h1>

                {/* Фильтры */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                        className="border px-4 py-2 rounded-md shadow-md border-gray-300 focus:ring-2 focus:ring-[#144ECA]"
                    />
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleFilterChange}
                        className="border px-4 py-2 rounded-md shadow-md border-gray-300 focus:ring-2 focus:ring-[#144ECA]"
                    />
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="border px-4 py-2.5 rounded-md shadow-md border-gray-300 focus:ring-2 focus:ring-[#144ECA]"
                    >
                        <option value="">Все статусы</option>
                        <option value="draft">Черновик</option>
                        <option value="formed">Сформирована</option>
                        <option value="completed">Завершена</option>
                        <option value="cancelled">Отменена</option>
                    </select>
                    <input
                        type="text"
                        name="creator"
                        value={filters.creator}
                        onChange={handleFilterChange}
                        placeholder="Имя создателя"
                        className="border px-4 py-2 rounded-md shadow-md border-gray-300 focus:ring-2 focus:ring-[#144ECA]"
                    />
                </div>

                {/* Таблица заявок */}
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[30vh]">
                        <div className="w-10 h-10 border-4 border-t-4 border-gray-300 border-t-[#144ECA] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-200">
                            <tr className="text-left">
                                <th className="px-4 py-2">№</th>
                                <th className="px-4 py-2">Имя студента</th>
                                <th className="px-4 py-2">Группа</th>
                                <th className="px-4 py-2">Статус</th>
                                <th className="px-4 py-2">Дата формирования</th>
                                <th className="px-4 py-2">Создатель</th>
                                <th className="px-4 py-2">Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-gray-500">
                                        Нет заявок по заданным фильтрам.
                                    </td>
                                </tr>
                            ) : (
                                filteredStudents.map((student, index) => (
                                    <tr key={student.pk} className="border-t">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{student.full_name}</td>
                                        <td className="px-4 py-2">{student.group}</td>
                                        <td className="px-4 py-2">{statusTranslations[student.status] || student.status}</td>
                                        <td className="px-4 py-2">{new Date(student.formed_at).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">{student.username}</td>
                                        <td className="px-4 py-2 flex gap-2">
                                            <button
                                                onClick={() => navigate(`/student/${student.pk}`)}
                                                className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-all duration-300"
                                            >
                                                <FaEye className="mr-1" />
                                                Просмотр
                                            </button>
                                            {student.status === "formed" && (
                                                <>
                                                    <button
                                                        onClick={() => handleModeration(student.pk, true)}
                                                        className="flex items-center bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-all duration-300"
                                                    >
                                                        <FaCheckCircle className="mr-1" />
                                                        Одобрить
                                                    </button>
                                                    <button
                                                        onClick={() => handleModeration(student.pk, false)}
                                                        className="flex items-center bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-all duration-300"
                                                    >
                                                        <FaTrash className="mr-1" />
                                                        Отклонить
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModeratorStudentListPage;
