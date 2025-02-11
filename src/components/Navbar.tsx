import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../redux/authSlice";
import { FaSignOutAlt, FaUserCircle, FaSignInAlt, FaClipboardList, FaCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dispatch = useDispatch();
    const { isAuthenticated, username, is_staff } = useSelector((state) => state.auth);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const handleLogout = async () => {
        await dispatch(logoutAsync());
        setIsMenuOpen(false);
        navigate("/");
    };

    return (
        <header className="flex justify-between items-center p-6 bg-white shadow-md">
            <div className="flex items-center space-x-3">
                <Link to="/">
                    <img src="/polyclinic-frontend/logo.png" alt="Поликлиника" className="h-10" />
                </Link>
                <div>
                    <Link to="/" className="text-xl font-semibold">
                        Поликлиника
                    </Link>
                    <p className="text-gray-500 text-sm">МГТУ им. Н. Э. Баумана</p>
                </div>
            </div>

            {/* Кнопка меню (мобильная версия) */}
            <div className="lg:hidden mt-2">
                <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Анимированное боковое меню (мобильная версия) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Затемнение фона */}
                        <motion.div
                            className="fixed inset-0 bg-gray-800 bg-opacity-50 z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                        />

                        {/* Боковое меню */}
                        <motion.div
                            className="fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg p-6 z-20"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <button onClick={toggleMenu} className="absolute top-4 left-4 text-2xl text-gray-600 focus:outline-none">
                                &times;
                            </button>
                            <nav className="space-y-6 text-gray-600 font-medium mt-12">
                                {is_staff ? (
                                    <>
                                        <Link to="/manage-timetable" className="block hover:text-cyan-300" onClick={toggleMenu}>
                                            <FaCalendarAlt className="inline-block mr-2 mb-1" /> Управление расписанием
                                        </Link>
                                        <Link to="/manage-students" className="block hover:text-cyan-300" onClick={toggleMenu}>
                                            <FaClipboardList className="inline-block mr-2 mb-1" /> Управление заявками
                                        </Link>
                                    </>
                                ) : (
                                    <Link to="/timetable" className="block hover:text-cyan-300" onClick={toggleMenu}>
                                        Расписание
                                    </Link>
                                )}

                                {isAuthenticated && !is_staff && (
                                    <Link to="/list-students" className="block hover:text-cyan-300" onClick={toggleMenu}>
                                        Мои заявки
                                    </Link>
                                )}

                                {isAuthenticated ? (
                                    <>
                                        <Link to="/profile" className="block hover:text-cyan-300" onClick={toggleMenu}>
                                            <FaUserCircle className="inline-block mr-2 mb-1" /> Личный кабинет
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-white hover:text-red-500 transition-all duration-300 text-center"
                                        >
                                            <FaSignOutAlt className="inline-block mr-1 mb-1" /> Выход
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login" className="block hover:text-cyan-300" onClick={toggleMenu}>
                                        <FaSignInAlt className="inline-block mr-2 mb-1" /> Вход
                                    </Link>
                                )}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Навигация для десктопов */}
            <nav className="hidden lg:flex space-x-6 text-gray-600 font-medium">
                {is_staff ? (
                    <>
                        <Link to="/manage-timetable" className="hover:text-cyan-300">Управление расписанием</Link>
                        <Link to="/manage-students" className="hover:text-cyan-300">Управление заявками</Link>
                    </>
                ) : (
                    <Link to="/timetable" className="hover:text-cyan-300">Расписание</Link>
                )}

                {isAuthenticated && !is_staff && (
                    <Link to="/list-students" className="hover:text-cyan-300">Мои заявки</Link>
                )}

                {isAuthenticated ? (
                    <>
                        <div
                            className="relative"
                            onMouseEnter={() => setIsDropdownVisible(true)}
                            onMouseLeave={() => setIsDropdownVisible(false)}
                        >
                            <Link to="/profile" className="hover:text-cyan-300 flex items-center">
                                <FaUserCircle className="inline-block mt-1" />
                            </Link>
                            {isDropdownVisible && (
                                <div className="absolute right-[-35px] bg-white shadow-lg rounded-md mt-2 py-2 px-4 w-20">
                                    <p className="flex text-gray-600 text-sm justify-center">{username}</p>
                                </div>
                            )}
                        </div>
                        <button onClick={handleLogout} className="hover:text-cyan-300 flex items-center">
                            <FaSignOutAlt className="inline-block mr-2" />
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="hover:text-cyan-300 flex items-center">
                        <FaSignInAlt className="inline-block mr-2" /> Вход
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
