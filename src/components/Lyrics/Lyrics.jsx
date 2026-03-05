import React from "react";
import styles from "./Lyrics.module.css";
import { useTranslation } from "react-i18next";

export default function Lyrics() {
    const { t } = useTranslation();

    return (
        <section className={styles.lyrics}>
            <h1 className={styles.title}>{t("lyrics.title")}</h1>
            <h2 className={styles.subtitle}>{t("lyrics.subtitle")}</h2>
            <p className={styles.text}>{t("lyrics.text")}</p>
        </section>
    );
}