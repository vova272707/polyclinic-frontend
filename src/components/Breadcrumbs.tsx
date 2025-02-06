import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa"; // Импорт иконок

interface BreadcrumbsProps {
    path: string;
}

interface PathNames {
    [key: string]: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path }) => {
    const paths = path.split("/").filter(Boolean);

    // Соответствие между путями и их читаемыми именами
    const pathNames: PathNames = {
        timetable: "Расписание",
        students: "Мои заявки",
        profile: "Личный кабинет",
        student: "Текущая заявка",
    };

    return (
        <nav className="flex items-center space-x-2 text-black ml-8 mt-5 font-roboto text-sm">
            {/* Домик вместо "Главная" */}
            <Link to="/" className="text-gray-400 hover:text-black text-lg">
                <FaHome />
            </Link>
            {paths.map((segment, index) => (
                <React.Fragment key={index}>
                    {/* Разделитель - стрелочка */}
                    <FaChevronRight className="text-gray-400 text-xs" />

                    {index === paths.length - 1 ? (
                        <span className="text-black">{pathNames[segment] || segment}</span>
                    ) : (
                        <Link
                            to={`/${paths.slice(0, index + 1).join("/")}`}
                            className="text-gray-400 hover:text-black"
                        >
                            {pathNames[segment] || segment}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
