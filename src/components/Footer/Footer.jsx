import React from 'react'
import style from './footer.module.css'
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function Footer() {
    const { t } = useTranslation();

    return (
            <footer className={style.footer}>
                <div className={style.container}>

                    <div className={style.brand}>
                        <p className={style.logo}>
                            F<span className={style.accent}>a</span>nF
                            <span className={style.accent}>i</span>c
                        </p>
                        <p className={style.tagline}>
                            {t("footer.slogan")}
                        </p>
                    </div>

                    <div className={style.section}>
                        <h3>{t("footer.aboutTitle")}</h3>
                        <a href="#">{t("footer.aboutUs")}</a>
                        <a href="#">{t("footer.terms")}</a>
                        <a href="#">{t("footer.privacy")}</a>
                    </div>

                    <div className={style.section}>
                        <h3>{t("footer.journeyTitle")}</h3>
                        <a href="#">{t("footer.story")}</a>
                        <a href="#">{t("footer.roadmap")}</a>
                        <a href="#">{t("footer.community")}</a>
                    </div>

                    <div className={style.section}>
                        <h3>{t("footer.contact")}</h3>
                        <div className={style.socials}>
                            <a href="#"><i className='bx bxl-instagram'></i></a>
                            <a href="#"><i className='bx bxl-twitter'></i></a>
                            <a href="#"><i className='bx bxl-github'></i></a>
                            <a href="#"><i className='bx bxl-discord'></i></a>
                        </div>
                    </div>

                </div>

                <div className={style.bottom}>
                    © {new Date().getFullYear()} FanFic. All rights reserved.
                </div>
            </footer>
    )
}

export default Footer
