import React, {useContext, useState} from 'react'
import style from './header.module.css';
import { useTranslation } from "react-i18next";
import {ThemeContext} from "../../context/ThemeContext";
import {LanguageContext} from "../../context/LanguageContext";
import {Link, useNavigate} from "react-router-dom";

function Header() {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { lang, toggleLanguage } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        // <div className={style.headerWrapper}>
        <header className={style.header}>
            <p className={style.logo}>
                F<span className={style.accent}>a</span>nF<span className={style.accent}>i</span>c
            </p>

            <hr/>

            <Link className={style.link} to='/'>{t("header.home")}</Link>
            <Link className={style.link} to='/fanfics'>{t("header.fanfics")}</Link>

            <div className={style.settings}>
                <button
                    className={style["button-toggle"]}
                    onClick={toggleLanguage}>
                    {lang === 'en' ? "UA"  : "EN"}
                </button>
                <hr/>

                <button
                    className={style["button-toggle"]}
                    onClick={toggleTheme}>
                    {theme == 'light' ? <i className='bx bx-moon'></i> : <i className='bx bx-sun'></i>}
                </button>

                <button
                    className={style['account-btn']}
                    onClick={() => navigate("/auth")}>
                    {t("header.account")}
                </button>
            </div>
            <button className={style.menu} onClick={() => setIsOpen(prev => !prev)}>{isOpen ? <i className='bx bx-x'></i> : <i className='bx bx-menu'></i>}</button>
        </header>
    // <div className={`${style.mobileMenu} ${isOpen ? style.open : ""}`}>
    //     <Link className={style["mobile-link"]} to='/'>{t("home")}</Link>
    //     <Link className={style["mobile-link"]} to='/fanfics'>{t("fanfics")}</Link>
    //     <button className={style['account-btn']}>{t("account")}</button>
    // </div>
    //  </div>
    )
}

export default Header
