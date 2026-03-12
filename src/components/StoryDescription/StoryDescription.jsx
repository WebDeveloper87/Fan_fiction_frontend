import React from "react";
import styles from "./StoryDescription.module.css";
import {useTranslation} from "react-i18next";

export default function StoryDescription({story}) {
    const {t} = useTranslation();
    if (!story) return null;

    return (
        <aside className={styles.sidebar}>
            <h1 className={styles.title}>{t("story.Title")}{story.title}</h1>

            <div className={styles.infoBlock}>
                <div className={styles.infoItem}>
                    <span className={styles.label}>{t("story.Fandom")}:</span>
                    <span className={styles.value}>{story.fandom}</span>
                </div>

                <div className={styles.infoItem}>
                    <span className={styles.label}>{t("story.Genre")}:</span>
                    <span className={styles.value}>{story.genre}</span>
                </div>
                <div className={styles.infoItem}>
                <span className={styles.label}>{t("story.CreatedAt")}:</span>
                <span className={styles.value}>{new Date(story.createdAt).toLocaleDateString()}</span>
            </div>
                <div className={styles.infoItem}>
                    <span className={styles.label}>{t("story.Author")}:</span>
                    <h2 className={styles.name}>{story.user.username}</h2>
                </div>
            </div>
        </aside>

    );
}