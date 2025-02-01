import Navbar from "./components/Navbar.tsx";
import { motion } from "framer-motion";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 font-roboto">
            <Navbar />

            <main className="container mx-auto py-16 px-6 flex items-center">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="w-1/2 text-left"
                >
                    <h2 className="text-3xl font-bold text-gray-800">Многопрофильный медицинский центр</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl">
                        Наша поликлиника оказывает профессиональную медицинскую помощь, расширяет спектр услуг, приобретая
                        современное оборудование и лицензируя новые виды медицинской деятельности. В наших стенах ведут
                        прием более 50 квалифицированных врачей-специалистов по 25 медицинским направлениям.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="w-1/2 flex justify-end"
                >
                    <img src="/building-illustration.svg" alt="Поликлиника" className="max-w-full h-auto" />
                </motion.div>
            </main>
        </div>
    );
};

export default HomePage;