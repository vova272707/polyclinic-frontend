import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.tsx";
import Breadcrumbs from "./components/Breadcrumbs.tsx";

type TimeTableItem = {
    pk: number;
    title: string;
    description: string;
    picture_url: string;
};

const mockTimeTable = [
    { pk: 1, title: "06:00 - 09:00",
        description: "Осень — не только начало учебного года и пора золотого листопада, но и преддверие сезона гриппа. Резкая перемена погоды вызывает стресс, который снижает иммунитет и дает возможность грипповирусу проникнуть в организм. Надежной защитой от этой коварной и изменчивой инфекции, вызывающей серьезные осложнения, станет вакцинация. Она способствует укреплению иммунитета и расширяет наши возможности. Сознательное и ответственное отношение к своему здоровью и здоровью близких очень важно. Процедура займёт всего несколько минут, а эффект сохранится до следующего лета!",
        picture_url: "http://127.0.0.1:9000/poly/69.png" },
    { pk: 2, title: "09:00 - 12:00",
        description: "В связи с поступающими вопросами об обязательной вакцинации работников МГТУ, мы подготовили основные моменты из разъяснений Оперштаба Москвы и Руководителя Управления Роспотребнадзора по Москве, и официальной информации портала mos.ru. Москвичи стали чаще болеть коронавирусом. По данным столичного отделения Роспотребнадзора, в основном болеют работающие люди от 18 до 60 лет. Специалисты связывают это с тем, что москвичи часто посещают общественные места. Поэтому решено ввести обязательную вакцинацию специалистов, которые лично работают с большим потоком клиентов. Мера введена постановлением главного государственного санитарного врача по городу Москве. Граждане, работающие в сфере образования, относятся к категории граждан, подлежащих обязательной вакцинации.",
        picture_url: "http://127.0.0.1:9000/poly/69.png" },
    { pk: 3, title: "12:00 - 15:00",
        description: "Гепатит С — это заболевание, которое вызывается вирусом гепатита С. При этом заболевании поражается преимущественно печень, однако могут повреждаться и другие важные органы, например, почки или щитовидная железа. Если после инфицирования вирусом гепатита С организмом человека не смог самостоятельно или в ходе лечения с ним справиться, и вирус продолжает размножаться более 6 месяцев, значит заболевание перешло в хроническую форму. Хронический гепатит С возникает достаточно часто, в среднем у 3 из 4 человек, инфицированных гепатитом С. У каждого четвертого заболевание проходит самостоятельно и зачастую человек узнает об этом случайно спустя много лет.",
        picture_url: "http://127.0.0.1:9000/poly/69.png" },
];

const TimeDescriptionPage = () => {
    const { timeTableId } = useParams();
    const [timeTable, setTimeTable] = useState<TimeTableItem | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

    const fetchTimeTable = async () => {
        try {
            const response = await fetch(`/api/timetables/${timeTableId}/`);
            const data = await response.json();
            setTimeTable(data);
        } catch {
            const mockTime = mockTimeTable.find(item => item.pk === parseInt(timeTableId ?? "", 10));
            setTimeTable(mockTime);
        } finally {
            setTimeout(() => setIsLoading(false), 200);
        }
    };

    useEffect(() => {
        fetchTimeTable();
    }, [timeTableId]);

    // Функция для обработки ошибки загрузки изображения
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = event.target as HTMLImageElement;
        target.src = "/polyclinic-frontend/default_time.svg"; // Убедитесь, что путь правильный
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <Breadcrumbs path={`/timetable/${timeTable?.title}`} />
            <div className="flex flex-col items-center p-6">
                {/* Индикатор загрузки */}
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-[#144ECA] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    timeTable && (
                        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 animate-fade-in">
                            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center">{timeTable.title}</h1>

                            <div className="mt-6 bg-[#3B6E85] text-white p-6 rounded-lg shadow-md animate-slide-up relative">
                                <img
                                    src={timeTable.picture_url}
                                    alt="Иконка"
                                    className="w-16 h-16 md:w-32 md:h-32 object-cover rounded-md shadow-md float-right ml-4"
                                    onError={handleImageError} // Обработка ошибки загрузки изображения
                                />
                                <h2 className="text-xl md:text-2xl font-semibold">Полезная информация</h2>
                                <p className="mt-4 text-sm md:text-lg leading-relaxed">{timeTable.description}</p>
                                <div className="clear-both"></div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default TimeDescriptionPage;
