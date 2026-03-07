import "./styles/App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import "./styles/theme.module.css";
import { ThemeProvider } from "./context/ThemeContext";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import {privatRoutes, publicRoute} from "./router/routes";

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
                        <Route path="/auth" element={<AuthPage />}/>

                        <Route element={<MainLayout />}>
                            {publicRoute.map(route => {
                                const Component = route.component;
                                return (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={<Component />}
                                    />
                                );
                            })}

                            {privatRoutes.map(route => {
                                const Component = route.component;
                                return (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={<Component />}
                                    />
                                );
                            })}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default App;