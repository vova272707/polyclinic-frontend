import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync } from "./redux/authSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerAsync(formData)).then((action) => {
            if (registerAsync.fulfilled.match(action)) {
                navigate("/");
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Регистрация</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md mb-2"
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Имя пользователя"
                    value={formData.username}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md mb-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md mb-2"
                />

                {error && <p className="text-red-500">{error}</p>}

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md w-full"
                    disabled={status === "loading"}
                >
                    {status === "loading" ? "Загрузка..." : "Зарегистрироваться"}
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
