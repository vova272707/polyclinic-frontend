import { Link } from 'react-router-dom';

const Page403 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6 font-roboto">
            <h1 className="text-6xl font-bold text-red-500">403</h1>
            <p className="text-xl text-gray-700 mt-4">У вас нет доступа к этой странице.</p>
            <Link to="/" className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Вернуться на главную
            </Link>
        </div>
    );
};

export default Page403;
