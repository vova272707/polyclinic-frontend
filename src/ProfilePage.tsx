import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAsync } from "./redux/authSlice";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { username, isAuthenticated, status, error, success } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });

    useEffect(() => {
        if (!isAuthenticated) {
            window.location.href = "/login";
        }
    }, [isAuthenticated]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateProfileAsync(formData));
    };

    return (
        <div className="min-h-screen bg-gray-100 font-roboto">
            {/* Навбар */}
            <Navbar />

            {/* Хлебные крошки */}
            <Breadcrumbs path="/profile" />

            <div className="container mx-auto p-6 flex flex-col items-center">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Профиль</h2>
                    <p className="mb-2 text-center">
                        <strong>Имя пользователя:</strong> {username}
                    </p>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="username"
                            name="username"
                            placeholder="Новый логин"
                            value={formData.username}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-md mb-2"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Новый пароль"
                            value={formData.password}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-md mb-2"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Новая почта"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-md mb-2"
                        />

                        {error && <p className="text-red-500 text-center">{error}</p>}
                        {success && <p className="text-green-500 text-center">{success}</p>}

                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded-md w-full mt-3
                                       hover:bg-blue-700 transition-all duration-300"
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? "Обновление..." : "Обновить"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
