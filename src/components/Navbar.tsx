import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const closeMenu = (e: React.MouseEvent) => {
        e.stopPropagation(); // Останавливаем событие, чтобы не закрывалось при клике на крестик
        setIsMenuOpen(false);
    };

    return (
        <header className="flex justify-between items-center p-6 bg-white shadow-md">
            <div className="flex items-center space-x-3">
                <Link to="/">
                    <img src="/polyclinic-frontend/logo.png" alt="Поликлиника" className="h-10" />
                </Link>
                <div>
                    <Link to="/" className="text-xl font-semibold">Поликлиника</Link>
                    <p className="text-gray-500 text-sm">МГТУ им. Н. Э. Баумана</p>
                </div>
            </div>

            {/* Навигация для мобильных устройств */}
            <div className="lg:hidden">
                <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Меню для мобильных устройств */}
            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleMenu}
            >
                <div className={`absolute top-0 right-0 w-3/4 h-full bg-white shadow-lg p-6 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
                    {/* Кнопка закрытия меню */}
                    <button
                        onClick={closeMenu} // Закрываем меню только по нажатию на крестик
                        className="absolute top-4 left-4 text-2xl text-gray-600 focus:outline-none"
                    >
                        &times;
                    </button>
                    <nav className="space-y-6 text-gray-600 font-medium mt-12">
                        <Link to="/timetable" className="hover:text-cyan-300" onClick={toggleMenu}>Расписание</Link>
                        {/* Можно добавить другие ссылки сюда */}
                    </nav>
                </div>
            </div>

            {/* Навигация для десктопов */}
            <nav className="hidden lg:flex space-x-6 text-gray-600 font-medium">
                <Link to="/timetable" className="hover:text-cyan-300">Расписание</Link>
                {/*<a href="#" className="hover:text-cyan-300">Заявки студентов</a>*/}
            </nav>
        </header>
    );
};

export default Header;
