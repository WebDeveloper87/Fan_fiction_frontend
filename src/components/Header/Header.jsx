import React, {useContext, useState} from 'react'
import style from './header.module.css';
import { useTranslation } from "react-i18next";
import {ThemeContext} from "../../context/ThemeContext";
import {LanguageContext} from "../../context/LanguageContext";
import {Link, useNavigate} from "react-router-dom";
import logo from './logo.png';

function Header() {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { lang, toggleLanguage } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header className={style.header}>
            <img src={logo}  alt="" className={style.logo}/>


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
                    {theme === 'light' ? <i className='bx bx-moon'></i> : <i className='bx bx-sun'></i>}
                </button>

                <button
                    className={style['account-btn']}
                    onClick={() => navigate("/auth")}>
                    {t("header.account")}
                </button>
            </div>
            <button className={style.menu} onClick={() => setIsOpen(prev => !prev)}>{isOpen ? <i className='bx bx-x'></i> : <i className='bx bx-menu'></i>}</button>
        </header>
    )
}

export default Header
