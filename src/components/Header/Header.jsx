import React, {useContext, useEffect, useState} from 'react'
import style from './header.module.css';
import { useTranslation } from "react-i18next";
import {ThemeContext} from "../../context/ThemeContext";
import {LanguageContext} from "../../context/LanguageContext";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

function Header() {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { lang, toggleLanguage } = useContext(LanguageContext);
    const {isAuth, setIsAuth, logout} = useContext(AuthContext)
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
                    <>
                        <button
                            className={style.accountBtn}
                            onClick={() => navigate("/story/create")}>
                            Create
                        </button>
                        <button
                            className={style.accountBtn}
                            onClick={logout}>
                            Logout
                        </button>
                    </>
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
             <Link className={style.mobileLink} to='/'>{t("home")}</Link>
             <Link className={style.mobileLink} to='/fanfics'>{t("fanfics")}</Link>
             <button className={style.accountBtn}>{t("account")}</button>
         </div>
          </div>
    )
}

export default Header
