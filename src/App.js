import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import "./styles/theme.module.css";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";
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