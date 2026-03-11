import React, {useContext, useEffect, useState} from 'react'
import style from './header.module.css';
import { useTranslation } from "react-i18next";
import {ThemeContext} from "../../context/ThemeContext";
import {LanguageContext} from "../../context/LanguageContext";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext";

function Header() {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { lang, toggleLanguage } = useContext(LanguageContext);
    const {isAuth, user, setUser, logout} = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1050) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("JWT_TOKEN");
            const access_token = localStorage.getItem("JWT_ACCESS_TOKEN");

            if (!token || !access_token) {
                throw new Error(t("errors.mustBeLoggedIn"));
            }

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}users/me`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "x-refresh-token" : `${access_token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "User not found");
            }

            console.log(data);
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    };


        useEffect(() => {
            if (isAuth) {
                fetchUser()
            }
        }, [isAuth])





    return (
        <div className={style.headerWrapper}>
        <header className={style.header}>
            <p className={style.logo}>
                F<span className={style.accent}>a</span>nF<span className={style.accent}>i</span>c
            </p>

            <hr/>
            { isAuth ? (
                <>
                    <Link className={style.link} to='/'>{t("header.home")}</Link>
                    <Link className={style.link} to='/fanfics'>{t("header.fanfics")}</Link>
                </>
                ) : (
                <>
                <Link className={style.link} to='/'>{t("header.home")}</Link>
                </>
                )
            }

            <div className={style.settings}>
                <button
                    className={style.buttonToggle}
                    onClick={toggleLanguage}>
                    {lang === 'en' ? "UA" : "EN"}
                </button>
                <hr/>

                <button
                    className={style.buttonToggle}
                    onClick={toggleTheme}>
                    {theme === 'light' ? <i className='bx bx-moon'></i> : <i className='bx bx-sun'></i>}
                </button>

                { isAuth ? (
                    <div>
                        <button
                            className={style.accountBtn}
                            onClick={() => navigate("/story/create")}>
                            {t("header.create")}
                        </button>
                        <button
                            className={style.accountBtn}
                            onClick={logout}>
                            {t("header.logout")}
                        </button>
                        <button onClick={() => navigate("/user")} className={style.profile}>
                            {user?.username?.[0]?.toUpperCase() || "U"}
                        </button>
                    </div>
                ) : (
                    <button
                        className={style.accountBtn}
                        onClick={() => navigate("/auth")}>
                        {t("header.account")}
                    </button>
                )
                }


            </div>
            <button className={style.menu} onClick={() => setIsOpen(prev => !prev)}>{isOpen ?
                <i className='bx bx-x'></i> : <i className='bx bx-menu'></i>}</button>
        </header>

            <div className={`${style.mobileMenu} ${isOpen ? style.open : ""}`}>
                <Link className={style.mobileLink} to="/">{t("header.home")}</Link>
                <Link className={style.mobileLink} to="/fanfics">{t("header.fanfics")}</Link>


                <div className={style.mobileSettings}>
                    <button onClick={toggleLanguage}>
                        {lang === 'en' ? "UA" : "EN"}
                    </button>
                    <button onClick={toggleTheme}>
                        {theme === 'light' ? <i className='bx bx-moon'></i> : <i className='bx bx-sun'></i>}
                    </button>
                </div>

                <div className={style.mobileAuth}>
                    {isAuth ? (
                        <>
                            <button onClick={() => navigate("/story/create")}>
                                {t("header.create")}
                            </button>
                            <button onClick={() => navigate("/user")}>
                                {t("header.profile")}
                            </button>
                            <button onClick={logout}>
                                {t("header.logout")}
                            </button>
                        </>
                    ) : (
                        <button onClick={() => navigate("/auth")}>
                            {t("header.account")}
                        </button>
                    )}
                </div>
            </div>
          </div>
    )
}

export default Header
