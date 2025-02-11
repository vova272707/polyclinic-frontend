import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync } from "./redux/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerAsync(formData)).then((action) => {
            if (registerAsync.fulfilled.match(action)) {
                navigate("/");
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
            {/* Фоновое изображение */}
            <div className="absolute inset-0 bg-cover bg-center brightness-75" style={{ backgroundImage: "url('/polyclinic-frontend/clinic-bg.jpg')" }} />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white p-8 rounded-lg shadow-lg relative z-10 w-full max-w-md"
            >
                {/* Логотип и заголовок */}
                <motion.div
                    className="flex flex-col items-center mb-4 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/")}
                >
                    <img src="/polyclinic-frontend/logo.png" alt="Поликлиника" className="h-16 mb-2" />
                    <p className="text-sm text-gray-500">Поликлиника МГТУ им. Н.Э. Баумана</p>
                </motion.div>

                <h2 className="text-3xl font-bold text-center text-[#144ECA] mb-4">
                    Регистрация
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Введите email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-[#144ECA] focus:border-[#144ECA] transition"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Имя пользователя</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Введите имя пользователя"
                            value={formData.username}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-[#144ECA] focus:border-[#144ECA] transition"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Пароль</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Введите пароль"
                            value={formData.password}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-[#144ECA] focus:border-[#144ECA] transition"
                        />
                    </div>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    {/* Кнопка с анимацией */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-[#144ECA] text-white py-2 px-4 rounded-md font-semibold transition-all duration-300 shadow-md hover:bg-[#0e3b9e]"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? (
                            <div className="flex justify-center items-center gap-2">
                                <div className="w-4 h-4 border-2 border-t-2 border-white border-opacity-50 rounded-full animate-spin"></div>
                                <span>Загрузка...</span>
                            </div>
                        ) : (
                            "Зарегистрироваться"
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
