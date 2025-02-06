import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTimeTable,
    searchTimeTable,
    addTimeToStudent,
    setInput,
} from "./redux/timetableSlice";
import { fetchCurrentStudent } from "./redux/studentSlice";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs.tsx";
import { Link } from "react-router-dom";
import basket from "../public/basket.png";
import { motion } from "framer-motion";

const TimeTablePage = () => {
    const dispatch = useDispatch();
    const { timetable, input, isLoading } = useSelector(
        (state) => state.timetable
    );
    const { currentStudentId, currentCount } = useSelector((state) => state.student);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchCurrentStudent()); // Загружаем текущую заявку
        if (timetable.length === 0) {
            dispatch(fetchTimeTable());
        }
    }, [dispatch]); // Убрали `timetable.length` (лишний параметр)

    // Следим за `currentStudentId`, если он изменился — обновляем заявку
    useEffect(() => {
        dispatch(fetchCurrentStudent());
    }, [dispatch]);

    const searchTime = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(searchTimeTable(input));
    };

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        (event.target as HTMLImageElement).src = "/polyclinic-frontend/default_time.svg";
    };

    const handleAddToStudent = (timeTableId: number) => {
        dispatch(addTimeToStudent(timeTableId)).then(() => {
            dispatch(fetchCurrentStudent()); // Обновляем заявку после добавления времени
        });
    };

    // Анимация карточек
    const cardVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.5 },
        }),
    };

    return (
        <div className="min-h-screen bg-gray-100 font-roboto">
            <Navbar />
            <Breadcrumbs path="/timetable" />
            <div className="container mx-auto p-6 flex flex-col items-center">
                <form onSubmit={searchTime} className="mb-6 flex items-center w-full max-w-[900px]">
                    <input
                        type="text"
                        placeholder="Введите время..."
                        value={input}
                        onChange={(e) => dispatch(setInput(e.target.value))}
                        className="border p-1 w-full rounded-md shadow-sm text-lg"
                    />
                    <button
                        type="submit"
                        className="ml-2 px-5 py-1 bg-[#144ECA] text-white hover:bg-white hover:text-[#144ECA] duration-300 rounded-md text-lg border border-[#144ECA]"
                    >
                        Поиск
                    </button>
                </form>

                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Доступное время записи</h2>

                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-[#144ECA] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 max-w-[1000px] gap-x-8 gap-y-8">
                        {timetable.map((item, index) => (
                            <motion.div
                                key={item.pk}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                custom={index}
                                className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
                            >
                                <img
                                    src={item.picture_url}
                                    alt={item.title}
                                    className="w-28 h-28 object-contain"
                                    onError={handleImageError}
                                />
                                <span className="mt-2 text-sm font-medium bg-gray-100 px-3 py-1 rounded-lg">
                                    {item.title}
                                </span>
                                <Link
                                    to={`/timetable/${item.pk}`}
                                    className="mt-4 px-4 py-1 bg-[#144ECA] text-white hover:bg-white hover:text-[#144ECA] duration-300 border border-[#144ECA] rounded-md text-sm"
                                >
                                    Подробнее
                                </Link>
                                <button
                                    onClick={() => handleAddToStudent(item.pk)}
                                    className="mt-2 px-6 py-1 bg-cyan-300 text-white hover:bg-white hover:text-cyan-300 duration-300 border border-cyan-300 rounded-md text-sm"
                                >
                                    В заявку
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {isAuthenticated && currentCount > 0 && (
                <div className="fixed bottom-2 right-2">
                    <Link to={`/student/${currentStudentId}/`} className="no-underline">
                        <div className="relative">
                            <img className="h-16 w-16" src={basket} alt="store icon" />
                            <div className="absolute top-[37px] left-[37px] flex items-center justify-center w-7 h-7 bg-blue-500 border border-white rounded-full">
                                <p className="font-roboto text-white font-bold text-xl">{currentCount}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default TimeTablePage;
