import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./redux/studentSlice";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs.tsx";
import { motion } from "framer-motion";

const statusLabels: { [key: string]: string } = {
    pending: "Ожидание",
    formed: "Сформирована",
    completed: "Завершена",
};

// Анимация появления карточек
const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5 },
    }),
};

const StudentsList = () => {
    const dispatch = useDispatch();
    const { students, isLoading, error } = useSelector((state) => state.student);

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-100 font-roboto">
            <Navbar />
            <Breadcrumbs path="/students" />
            <div className="container mx-auto p-4 md:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Мои заявки</h1>

                {/* Обертка для горизонтального скролла */}
                <div className="overflow-x-auto">
                    {/* Заголовки таблицы */}
                    <div className="bg-gray-200 p-3 md:p-4 rounded-lg flex justify-between items-center mb-4 text-xs md:text-base overflow-x-auto">
                        <span className="w-1/5 min-w-[150px] font-semibold">ФИО</span>
                        <span className="w-1/5 min-w-[100px] font-semibold">Группа</span>
                        <span className="w-1/5 min-w-[140px] font-semibold">Статус</span>
                        <span className="w-1/5 min-w-[140px] font-semibold">Создана</span>
                        <span className="w-1/5 min-w-[140px] font-semibold">Сформирована</span>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center min-h-[30vh]">
                            <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-t-4 border-gray-300 border-t-[#144ECA] rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : students.length === 0 ? (
                        <p className="text-center text-gray-500">Заявок пока нет.</p>
                    ) : (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col gap-2 overflow-x-auto"
                        >
                            {students.map((student, index) => (
                                <motion.div
                                    key={student.pk}
                                    variants={itemVariants}
                                    custom={index}
                                    className="bg-white p-3 md:p-4 rounded-lg flex justify-between items-center min-w-[700px] text-xs md:text-base"
                                >
                                    <span className="w-1/5 min-w-[150px]">{student.full_name}</span>
                                    <span className="w-1/5 min-w-[100px]">{student.group}</span>
                                    <span className="w-1/5 min-w-[140px] font-medium text-blue-600">
                                        {statusLabels[student.status] || "Неизвестно"}
                                    </span>
                                    <span className="w-1/5 min-w-[140px] text-gray-500">
                                        {new Date(student.created_at).toLocaleDateString()}
                                    </span>
                                    <span className="w-1/5 min-w-[140px] text-gray-500">
                                        {student.formed_at ? new Date(student.formed_at).toLocaleDateString() : "-"}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentsList;
