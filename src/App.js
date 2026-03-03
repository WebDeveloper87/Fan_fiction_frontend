import './styles/App.css';
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LanguageProvider} from "./context/LanguageContext";
import './styles/theme.module.css'
import {ThemeProvider} from "./context/ThemeContext";
import MainPage from "./pages/MainPage";
import FanficsPage from "./pages/FanficsPage";
import AuthPage from "./pages/AuthPage";
import MainLayout from "./layouts/MainLayout";
import CreateStoryPage from "./pages/CreateStoryPage";
import {Toaster} from "react-hot-toast";
import ReviewPage from "./pages/ReviewPage";


function App() {
  const [setData] = useState(null);

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

              <Toaster position="bottom-right"
                       toastOptions={{
                           style: {
                               fontFamily: '"Nunito", sans-serif'
                           },
                       }}/>
              <Routes>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/fanfics" element={<FanficsPage />} />
                      <Route path="/story/create" element={<CreateStoryPage />} />
                  <Route path="/review" element={<ReviewPage />}></Route>
                  <Route element={<MainLayout />}></Route>


                  <Route path="/auth" element={<AuthPage />} />

              </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </LanguageProvider>
  );
}

export default App;
