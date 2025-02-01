import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
    path: string;
}

interface PathNames {
    [key: string]: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path }) => {
    const paths = path.split('/').filter(Boolean);

    // Соответствие между путями и их читаемыми именами
    const pathNames: PathNames = {
        timetable: 'Услуги',
    };

    return (
        <nav className="flex items-center space-x-2 text-black ml-8 mt-5 font-roboto text-sm">
            <Link to="/" className="text-gray-400 hover:text-black">
                Главная
            </Link>
            {paths.map((segment, index) => (
                <React.Fragment key={index}>
                    <span>&gt;</span>
                    {index === paths.length - 1 ? (
                        <span className="text-black">
                            {pathNames[segment] || segment}
                        </span>
                    ) : (
                        <Link
                            to={`/${paths.slice(0, index + 1).join('>')}`}
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
