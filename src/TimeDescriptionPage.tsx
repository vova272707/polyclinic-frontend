import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTimeTableById } from "./redux/timetableSlice";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs";

const TimeDescriptionPage = () => {
    const { timeTableId } = useParams<{ timeTableId: string }>();
    const dispatch = useDispatch();
    const { selectedTimeTable, isLoading, error } = useSelector((state) => state.timetable);

    useEffect(() => {
        if (timeTableId) {
            dispatch(fetchTimeTableById(Number(timeTableId)));
        }
    }, [dispatch, timeTableId]);

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = event.target as HTMLImageElement;
        target.src = "/polyclinic-frontend/default_time.svg";
    };

    return (
        <div className="min-h-screen bg-gray-100 font-roboto">
            <Navbar />
            <Breadcrumbs path={`/timetable/${selectedTimeTable?.title}`} />
            <div className="flex flex-col items-center p-6">
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-[#144ECA] rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : selectedTimeTable ? (
                    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 animate-fade-in">
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center">{selectedTimeTable.title}</h1>

                        <div className="mt-6 bg-[#3B6E85] text-white p-6 rounded-lg shadow-md animate-slide-up relative">
                            <img
                                src={selectedTimeTable.picture_url}
                                alt="Иконка"
                                className="w-16 h-16 md:w-32 md:h-32 object-cover rounded-md shadow-md float-right ml-4"
                                onError={handleImageError}
                            />
                            <h2 className="text-xl md:text-2xl font-semibold">Полезная информация</h2>
                            <p className="mt-4 text-sm md:text-lg leading-relaxed">{selectedTimeTable.description}</p>
                            <div className="clear-both"></div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600">Расписание не найдено</p>
                )}
            </div>
        </div>
    );
};

export default TimeDescriptionPage;
