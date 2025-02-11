import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginAsync } from "./redux/authSlice";
import { RootState } from "./store/store";
import { motion } from "framer-motion";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state: RootState) => state.auth);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(loginAsync({ username, password }));
        if (loginAsync.fulfilled.match(result)) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
            {/* Фоновое изображение */}
            <div
                className="absolute inset-0 bg-cover bg-center brightness-75"
                style={{ backgroundImage: "url('/polyclinic-frontend/clinic-bg.jpg')" }}
            />

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
                    <img
                        src="/polyclinic-frontend/logo.png"
                        alt="Поликлиника"
                        className="h-16 mb-2"
                    />
                    <p className="text-sm text-gray-500">Поликлиника МГТУ им. Н.Э. Баумана</p>
                </motion.div>

                <h2 className="text-3xl font-bold text-center text-[#144ECA] mb-4">Вход</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-700 font-medium"
                        >
                            Имя пользователя
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#144ECA] focus:border-[#144ECA] transition"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium"
                        >
                            Пароль
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#144ECA] focus:border-[#144ECA] transition"
                            required
                        />
                    </div>

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
                                <span>Вход...</span>
                            </div>
                        ) : (
                            "Войти"
                        )}
                    </motion.button>
                </form>

                {/* Ссылка на регистрацию */}
                <p className="mt-4 text-center text-gray-600">
                    Еще нет аккаунта?{" "}
                    <Link to="/register" className="text-[#144ECA] hover:underline">
                        Зарегистрируйтесь
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;
