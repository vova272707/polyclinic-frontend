import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs.tsx";
import { setTimeTable, setInput } from "./redux/timetableSlice.tsx";
import { useDispatch, useSelector } from "react-redux";

type TimeTableItem = {
    pk: number;
    title: string;
    picture_url: string;
};

const mockTimeTable = [
    { pk: 1, title: "06:00 - 09:00", picture_url: "http://127.0.0.1:9000/poly/69.png" },
    { pk: 2, title: "09:00 - 12:00", picture_url: "http://127.0.0.1:9000/poly/912.png" },
    { pk: 3, title: "12:00 - 15:00", picture_url: "http://127.0.0.1:9000/poly/1215.png" },
];

const TimeTablePage = () => {
    const { timetable, input } = useSelector((state) => state.timetable);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const TimeTableList = async () => {
        try {
            const response = await fetch("/api/timetables/");
            const data = await response.json();
            const timeTableList = data.filter((item: { pk: undefined }) => item.pk !== undefined);
            dispatch(setTimeTable(timeTableList));
        } catch {
            dispatch(setTimeTable(mockTimeTable));
        } finally {
            setTimeout(() => setIsLoading(false), 200);
        }
    };

    useEffect(() => {
        // Загружаем данные только если их нет в хранилище
        if (timetable.length === 0) {
            TimeTableList();
        } else {
            setIsLoading(false);
        }
    }, []);

    const searchTime = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`/api/timetables/?title=${input}`);
            const result = await response.json();
            const filteredTime = result.filter((item: { pk: undefined }) => item.pk !== undefined);
            dispatch(setTimeTable(filteredTime));
        } catch (error) {
            console.error("Ошибка при выполнении поиска:", error);
            dispatch(setTimeTable(mockTimeTable));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-roboto">
            <Navbar />
            <Breadcrumbs path="/timetable" />
            <div className="container mx-auto p-6 flex flex-col items-center">
                {/* Форма поиска */}
                <form onSubmit={searchTime} className="mb-6 flex items-center w-full max-w-[900px]">
                    <input
                        type="text"
                        placeholder="Введите время..."
                        value={input}
                        onChange={(e) => dispatch(setInput(e.target.value))}
                        className="border p-1 w-full rounded-md shadow-sm text-lg"
                    />
                    <button
                        type="submit"
                        className="ml-2 px-5 py-1 bg-[#144ECA] text-white rounded-md text-lg transition-all duration-300
                                   hover:bg-white hover:text-[#144ECA] border border-[#144ECA]"
                    >
                        Поиск
                    </button>
                </form>

                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Доступное время записи</h2>

                {/* Индикатор загрузки */}
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-[#144ECA] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 max-w-[1000px] gap-x-8 gap-y-8">
                        {timetable.map((item: TimeTableItem, index: number) => (
                            <div
                                key={item.pk}
                                className={`bg-white shadow rounded-lg p-4 flex flex-col items-center 
                                            transition-all duration-300 hover:shadow-lg 
                                            animate__animated animate__fadeInUp`}
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <img src={item.picture_url} alt={item.title} className="w-28 h-28 object-contain" />
                                <span className="mt-2 text-sm font-medium bg-gray-100 px-3 py-1 rounded-lg">{item.title}</span>

                                <Link
                                    to={`/timetable/${item.pk}`}
                                    className="mt-4 px-4 py-1 bg-[#144ECA] text-white rounded-md text-sm transition-all duration-300
                           hover:bg-white hover:text-[#144ECA] border border-[#144ECA] text-center w-full text-nowrap"
                                >
                                    Подробнее
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimeTablePage;