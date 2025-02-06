import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync } from '../redux/authSlice'; // Импорт logoutAsync из authSlice
import { FaSignOutAlt, FaUserCircle, FaSignInAlt } from 'react-icons/fa'; // Импорт иконок

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Состояние для отображения выпадающего меню
    const dispatch = useDispatch();
    const { isAuthenticated, username } = useSelector((state) => state.auth);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const closeMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(false);
    };

    const handleLogout = async () => {
        await dispatch(logoutAsync());
        setIsMenuOpen(false); // Закрываем меню после выхода
        navigate('/');
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

            {/* Навигация для мобильных устройств */}
            <div className="lg:hidden mt-2">
                <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Меню для мобильных устройств */}
            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleMenu}
            >
                <div
                    className={`absolute top-0 right-0 w-3/4 h-full bg-white shadow-lg p-6 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Кнопка закрытия меню */}
                    <button
                        onClick={closeMenu}
                        className="absolute top-4 left-4 text-2xl text-gray-600 focus:outline-none"
                    >
                        &times;
                    </button>
                    <nav className="space-y-6 text-gray-600 font-medium mt-12">
                        <Link to="/timetable" className="block hover:text-cyan-300" onClick={toggleMenu}>
                            Расписание
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/list-students" className="block hover:text-cyan-300" onClick={toggleMenu}>
                                    Мои заявки
                                </Link>
                                <Link to="/profile" className="block hover:text-cyan-300" onClick={toggleMenu}>
                                    Личный кабинет
                                    <FaUserCircle className="inline-block ml-2 mb-1" />
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
                </div>
            </div>

            {/* Навигация для десктопов */}
            <nav className="hidden lg:flex space-x-6 text-gray-600 font-medium">
                <Link to="/timetable" className="hover:text-cyan-300">
                    Расписание
                </Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/list-students" className="hover:text-cyan-300">
                            Мои заявки
                        </Link>
                        <div
                            className="relative"
                            onMouseEnter={() => setIsDropdownVisible(true)} // Показываем меню при наведении
                            onMouseLeave={() => setIsDropdownVisible(false)} // Скрываем меню при уходе
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
                        <button
                            onClick={handleLogout}
                            className="hover:text-cyan-300 flex items-center"
                        >
                            <FaSignOutAlt className="inline-block mr-2" />
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="hover:text-cyan-300 flex items-center">
                        <FaSignInAlt className="inline-block mr-2" />
                        Вход
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
