import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTimeTableById, createNewTime, updateTime } from "./redux/timetableSlice";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs.tsx";
import { FaSave, FaPlusCircle } from "react-icons/fa";

const TimeTableFormPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedTimeTable, isLoading } = useSelector((state) => state.timetable);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        picture_url: "",
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchTimeTableById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (selectedTimeTable) {
            setFormData({
                title: selectedTimeTable.title || "",
                description: selectedTimeTable.description || "",
                picture_url: selectedTimeTable.picture_url || "",
            });
        }
    }, [selectedTimeTable]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await dispatch(updateTime({ id, ...formData }));
        } else {
            await dispatch(createNewTime(formData));
        }
        navigate("/manage-timetable");
    };

    return (
        <div className="min-h-screen bg-gray-100 font-roboto">
            <Navbar />
            <Breadcrumbs path={id ? `/manage-timetable/${formData.title}` : "/manage-timetable/new"} />

            <div className="container mx-auto p-6 max-w-xl">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
                    {id ? "Форма для редактирования время" : "Форма для создания нового времени"}
                </h1>

                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[30vh]">
                        <div className="w-10 h-10 border-4 border-t-4 border-gray-300 border-t-[#144ECA] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Название</label>
                            <input
                                type="text"
                                name="title"
                                value={id ? formData.title : ""}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#144ECA] focus:border-[#144ECA]"
                                placeholder="Введите время..."
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Описание</label>
                            <textarea
                                name="description"
                                value={id ? formData.description: ""}
                                onChange={handleChange}
                                rows={4}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#144ECA] focus:border-[#144ECA]"
                                placeholder="Введите описание..."
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Ссылка на изображение</label>
                            <input
                                type="text"
                                name="picture_url"
                                value={id ? formData.picture_url : ""}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#144ECA] focus:border-[#144ECA]"
                                placeholder="Изображение..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300"
                        >
                            {id ? <FaSave /> : <FaPlusCircle />}
                            {id ? "Редактировать" : "Создать"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default TimeTableFormPage;
