import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTimeTable, deleteTime } from "./redux/timetableSlice";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs.tsx";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";

// Анимация плавного появления карточек
const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.5 },
    }),
};

const ModeratorTimeTablePage = () => {
    const dispatch = useDispatch();
    const { timetable, isLoading, error } = useSelector((state) => state.timetable);

    useEffect(() => {
        dispatch(fetchTimeTable());
    }, [dispatch]);

    const handleDelete = async (id: number) => {
        await dispatch(deleteTime(id));
        dispatch(fetchTimeTable()); // 🔄 Обновление списка после удаления
    };

    return (
        <div className="min-h-screen bg-gray-100 font-roboto">
            <Navbar />
            <Breadcrumbs path="/manage-timetable" />

            <div className="container mx-auto p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Управление расписанием</h1>

                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[30vh]">
                        <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-t-4 border-gray-300 border-t-[#144ECA] rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : timetable.length === 0 ? (
                    <p className="text-center text-gray-500">Нет доступных услуг.</p>
                ) : (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-4 max-w-4xl mx-auto"
                    >
                        {timetable.map((time, index) => (
                            <motion.div
                                key={time.pk}
                                variants={itemVariants}
                                custom={index}
                                className="bg-white flex items-center p-4 rounded-lg shadow-md hover:shadow-lg"
                            >
                                <img src={time.picture_url} alt={time.title} className="w-16 h-16 object-contain mr-4" />
                                <span className="flex-1 text-lg font-semibold">{time.title}</span>

                                {/* Кнопки редактирования и удаления */}
                                <Link
                                    to={`/manage-timetable/edit/${time.pk}`}
                                    className="text-blue-600 hover:text-blue-800 text-xl mx-2"
                                >
                                    <FaEdit />
                                </Link>
                                <button
                                    onClick={() => handleDelete(time.pk)}
                                    className="text-red-500 hover:text-red-700 text-xl"
                                >
                                    <FaTrash />
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Кнопка "Добавить услугу" */}
                <div className="flex justify-center mt-6">
                    <Link to="/manage-timetable/create/new" className="text-green-600 hover:text-green-800 text-4xl">
                        <FaPlusCircle />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ModeratorTimeTablePage;
