import "./styles/App.css";
import {BrowserRouter} from "react-router-dom";
import {LanguageProvider} from "./context/LanguageContext";
import "./styles/theme.module.css";
import {ThemeProvider} from "./context/ThemeContext";
import {Toaster} from "react-hot-toast";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import {AuthProvider} from "./context/AuthContext";

function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <LanguageProvider>
                    <ThemeProvider>

                        <Toaster
                            position="bottom-right"
                            toastOptions={{
                                style: {
                                    fontFamily: '"Nunito", sans-serif',
                                },
                            }}
                        />

                        <AppRoutes/>

                    </ThemeProvider>
                </LanguageProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;