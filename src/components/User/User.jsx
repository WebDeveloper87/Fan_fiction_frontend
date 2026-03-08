import React, { useEffect, useState } from "react";
import styles from "./user.module.css";
import { useTranslation } from "react-i18next";
import icon from "../../photos/user_icon.png";

export default function User() {
    const { t } = useTranslation();
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/users/me`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "User not found");
            }

            setUser(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className={styles.userBlock}>
            <div className={styles.leftSide}>
                <img src={icon} alt="user" className={styles.avatar}/>
                <button className={styles.changename}>Change username</button>
            </div>

            <div className={styles.rightSide}>
                <h2 className={styles.name}>Artem</h2>
                <p className={styles.createdAt}>Registered at 08.03.2026</p>
                <p className={styles.countStories}>12 published stories</p>

                <div className={styles.storySection}>
                    <h3 className={styles.sectionTitle}>Published stories</h3>
                    <div className={styles.storiesGrid}>
                        <div className={styles.published}>Beautiful Country</div>
                        <div className={styles.published}>Beautiful Country 2</div>
                        <div className={styles.published}>Beautiful Country 3</div>
                    </div>
                </div>

                <div className={styles.storySection}>
                    <h3 className={styles.sectionTitle}>Archived stories</h3>
                    <div className={styles.storiesGrid}>
                        <div className={styles.archived}>Archived story 1</div>
                        <div className={styles.archived}>Archived story 2</div>
                    </div>
                </div>
            </div>
        </div>
    )
    {/*
               {user && (
                <div className={styles.userInfo}>
                    <h2>{user.username}</h2>
                    <p>
                        {t("user.joined")}{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                    </p>

                    <p>
                        {t("user.published")}: {user.publishedStoriesCount}
                    </p>

                    {user.privateStoriesCount !== undefined && (
                        <p>
                            {t("user.private")}: {user.privateStoriesCount}
                        </p>
                    )}
                </div>
            )}
            */
    }
}