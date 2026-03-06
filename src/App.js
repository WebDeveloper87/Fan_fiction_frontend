import "./styles/App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import "./styles/theme.module.css";
import { ThemeProvider } from "./context/ThemeContext";
import MainPage from "./pages/MainPage";
import FanficsPage from "./pages/FanficsPage";
import AuthPage from "./pages/AuthPage";
import CreateStoryPage from "./pages/CreateStoryPage";
import ReviewPage from "./pages/ReviewPage";
import { Toaster } from "react-hot-toast";
import GuestOnlyRoute from "./components/GuestOnlyRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";

function App() {
    const [, setData] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/test`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error("Error fetching backend:", err));
    }, []);

    return (
        <LanguageProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <Toaster
                        position="bottom-right"
                        toastOptions={{
                            style: {
                                fontFamily: '"Nunito", sans-serif',
                            },
                        }}
                    />

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <GuestOnlyRoute>
                                    <MainPage />
                                </GuestOnlyRoute>
                            }
                        />

                        <Route
                            path="/auth"
                            element={
                                <GuestOnlyRoute>
                                    <AuthPage />
                                </GuestOnlyRoute>
                            }
                        />

                        <Route
                            element={
                                <ProtectedRoute>
                                     <HomePage />
                                </ProtectedRoute>
                            }
                        >
                            <Route path="/fanfics" element={<FanficsPage />} />
                            <Route path="/story/create" element={<CreateStoryPage />} />
                            <Route path="/review" element={<ReviewPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default App;