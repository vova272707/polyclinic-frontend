import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./redux/studentSlice";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs.tsx";
import { motion } from "framer-motion";
import { FaQrcode, FaLock, FaTimes } from "react-icons/fa"; // Иконки

const statusLabels: { [key: string]: string } = {
    pending: "Ожидание",
    formed: "Сформирована",
    completed: "Завершена",
    cancelled: "Отклонена",
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
    const [qrModal, setQrModal] = useState<{ isOpen: boolean; qrUrl: string | null }>({
        isOpen: false,
        qrUrl: null,
    });

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    // Открытие модального окна с QR-кодом
    const openQrModal = (qrUrl: string) => {
        setQrModal({ isOpen: true, qrUrl });
    };

    // Закрытие модального окна
    const closeQrModal = () => {
        setQrModal({ isOpen: false, qrUrl: null });
    };

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
                        <span className="w-1/5 min-w-[120px] font-semibold">Группа</span>
                        <span className="w-1/5 min-w-[140px] font-semibold">Статус</span>
                        <span className="w-1/5 min-w-[140px] font-semibold">Сформирована</span>
                        <span className="w-1/5 min-w-[80px] font-semibold">QR-код</span>
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
                                    className="bg-white p-3 md:p-4 rounded-lg flex justify-between items-center min-w-[650px] text-xs md:text-base relative"
                                >
                                    <span className="w-1/5 min-w-[150px]">{student.full_name}</span>
                                    <span className="w-1/5 min-w-[120px]">{student.group}</span>
                                    <span className="w-1/5 min-w-[140px] font-medium text-blue-600">
                                        {statusLabels[student.status] || "Неизвестно"}
                                    </span>
                                    <span className="w-1/5 min-w-[140px] text-gray-500">
                                        {student.formed_at ? new Date(student.formed_at).toLocaleDateString() : "-"}
                                    </span>

                                    {/* QR-код */}
                                    <span className="w-1/5 min-w-[80px] flex items-center relative">
                                        {student.status === "completed" && student.qr_code ? (
                                            <button
                                                className="relative cursor-pointer"
                                                onClick={() => openQrModal(student.qr_code)}
                                            >
                                                <FaQrcode className="text-2xl text-green-600 hover:scale-110 transition-transform" />
                                            </button>
                                        ) : (
                                            <FaLock className="text-2xl text-gray-400" />
                                        )}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Модальное окно QR-кода */}
            {qrModal.isOpen && qrModal.qrUrl && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={closeQrModal}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg relative"
                        onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на сам контейнер
                    >
                        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={closeQrModal}>
                            <FaTimes className="text-xl" />
                        </button>
                        <h2 className="text-lg font-semibold text-center mb-4">QR-код студента</h2>
                        <img src={qrModal.qrUrl} alt="QR Code" className="w-64 h-64 mx-auto" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentsList;
