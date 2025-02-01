const Header = () => {
    return (
        <header className="flex justify-between items-center p-6 bg-white shadow-md">
            <div className="flex items-center space-x-3">
                <a href="/">
                    <img src="/logo.png" alt="Поликлиника" className="h-10" />
                </a>
                <div>
                    <a href="/" className="text-xl font-semibold">Поликлиника</a>
                    <p className="text-gray-500 text-sm">МГТУ им. Н. Э. Баумана</p>
                </div>
            </div>
            <nav className="space-x-6 text-gray-600 font-medium">
                <a href="/timetable" className="hover:text-cyan-300">Расписание</a>
                {/*<a href="#" className="hover:text-cyan-300">Заявки студентов</a>*/}
            </nav>
        </header>
    );
};

export default Header;