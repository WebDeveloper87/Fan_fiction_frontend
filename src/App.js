import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import "./styles/theme.module.css";
import { ThemeProvider } from "./context/ThemeContext";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import {privatRoutes, publicRoute} from "./router/routes";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import {AuthProvider} from "./context/AuthContext";

function App() {

    return (
        <AuthProvider>
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

                    <AppRoutes />
                </BrowserRouter>
            </ThemeProvider>
        </LanguageProvider>
        </AuthProvider>
    );
}

export default App;