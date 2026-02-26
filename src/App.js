import './styles/App.css';
import {useEffect, useState} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {LanguageProvider} from "./context/LanguageContext";
import './styles/theme.module.css'
import {ThemeProvider} from "./context/ThemeContext";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage";
import FanficsPage from "./pages/FanficsPage";
import Footer from "./components/Footer/Footer";
import AuthPage from "./pages/AuthPage";
import MainLayout from "./layouts/MainLayout";
import CreateStoryPage from "./pages/CreateStoryPage";
import {Toaster} from "react-hot-toast";

function App() {
  const [data, setData] = useState(null);

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
            {/*{<h1>{data ? JSON.stringify(data.message) : "Loading..."}</h1>}*/}

              <Toaster position="bottom-right"
                       toastOptions={{
                           style: {
                               fontFamily: '"Nunito", sans-serif'
                           },
                       }}/>
              <Routes>
                  <Route element={<MainLayout />}>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/fanfics" element={<FanficsPage />} />
                      <Route path="/story/create" element={<CreateStoryPage />} />
                  </Route>


                  <Route path="/auth" element={<AuthPage />} />

              </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </LanguageProvider>
  );
}

export default App;
