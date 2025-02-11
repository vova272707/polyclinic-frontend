import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAsync } from "./redux/authSlice";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { username, isAuthenticated, status, error, success } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });

    useEffect(() => {
        if (!isAuthenticated) {
            window.location.href = "/login";
        }
    }, [isAuthenticated]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateProfileAsync(formData));
    };

    return (
        <div className="min-h-screen bg-gray-100 font-roboto">
            {/* Навбар */}
            <Navbar />

            {/* Хлебные крошки */}
            <Breadcrumbs path="/profile" />

            <div className="container mx-auto p-6 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center"
                >
                    {/* Аватар пользователя */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex justify-center mb-4"
                    >
                        <FaUserCircle className="text-6xl text-gray-400" />
                    </motion.div>

                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Профиль</h2>
                    <p className="mb-2 text-gray-600">
                        <strong>Имя пользователя:</strong> {username}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            type="text"
                            name="username"
                            placeholder="Новый логин"
                            value={formData.username}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-[#144ECA] focus:border-[#144ECA]"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Новый пароль"
                            value={formData.password}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-[#144ECA] focus:border-[#144ECA]"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Новая почта"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-[#144ECA] focus:border-[#144ECA]"
                        />

                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}

                        {/* Кнопка с анимацией */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="bg-[#144ECA] text-white py-2 px-4 rounded-md w-full font-semibold transition-all duration-300 shadow-md hover:bg-[#0e3b9e]"
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? (
                                <div className="flex justify-center items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-t-2 border-white border-opacity-50 rounded-full animate-spin"></div>
                                    <span>Обновление...</span>
                                </div>
                            ) : (
                                "Обновить"
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ProfilePage;
