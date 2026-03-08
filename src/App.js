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
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

function App() {
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

                                    <MainPage />
                            }
                        />

                        <Route
                            path="/auth"
                            element={

                                    <AuthPage />

                            }
                        />

                        <Route element={<HomePage />}/>
                        <Route path="/users/me" element={<UserPage />}/>
                            <Route path="/fanfics" element={<FanficsPage />} />
                            <Route path="/story/create" element={<CreateStoryPage />} />
                            <Route path="/review" element={<ReviewPage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default App;