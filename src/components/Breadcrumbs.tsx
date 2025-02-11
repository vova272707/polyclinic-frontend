import React from "react";
import {Link, useParams} from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa"; // Импорт иконок

interface BreadcrumbsProps {
    path: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path }) => {
    const { id } = useParams();
    const paths = path.split("/").filter(Boolean);

    // Соответствие URL и читаемых имен
    const pathNames: Record<string, string> = {
        timetable: "Расписание",
        students: "Мои заявки",
        profile: "Личный кабинет",
        student: "Текущая заявка",
        "manage-timetable": "Управление расписанием",
        "new": "Создание",
        "manage-students": "Управление заявками"
    };

    return (
        <nav className="flex items-center space-x-2 text-black ml-8 mt-5 font-roboto text-sm">
            {/* Домик вместо "Главная" */}
            <Link to="/" className="text-gray-400 hover:text-black text-lg">
                <FaHome />
            </Link>

            {paths.map((segment, index) => (
                <React.Fragment key={index}>
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
