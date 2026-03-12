import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styles from "./user.module.css";
import icon from "../../photos/user_icon.png";
import ChangeUsername from "../../components/ChangeName/ChangeName";
import StoriesStatus from "../../components/StoriesStatus/StoriesStatus";
import {useTranslation} from "react-i18next";
import toast from "react-hot-toast";

export default function UserPage() {
    const {username} = useParams();
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [stories, setStories] = useState([]);

    const isOwner = !username;

    const fetchUser = async () => {
        try {
            const url = isOwner
                ? `${process.env.REACT_APP_API_URL}users/me`
                : `${process.env.REACT_APP_API_URL}users/username/${username}`;

            const headers = {};

            if (isOwner) {
                const token = localStorage.getItem("JWT_TOKEN");

                if (!token) {
                    throw new Error(t("errors.NotLoggedIn"));
                }

                headers.Authorization = `Bearer ${token}`;
            }

            const response = await fetch(url, {
                method: "GET",
                headers,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || t("errors.UserNotFound"));
            }

            setUser(data);
        } catch (error) {
            toast.error(error.message || t("errors.UserNotFound"));
        }
    };

    const fetchStories = async () => {
        try {
            const url = isOwner
                ? `${process.env.REACT_APP_API_URL}stories/my-stories`
                : `${process.env.REACT_APP_API_URL}stories/user/${username}`;

            const headers = {};

            if (isOwner) {
                const token = localStorage.getItem("JWT_TOKEN");

                if (!token) {
                    throw new Error(t("errors.NotLoggedIn"));
                }

                headers.Authorization = `Bearer ${token}`;
            }

            const response = await fetch(url, {
                method: "GET",
                headers,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || t("errors.StoriesNotFound"));
            }

            const storiesArray = data.stories || data || [];
            setStories(storiesArray);
        } catch (error) {
            toast.error(error.message || t("errors.StoriesNotFound"));
        }
    };

    useEffect(() => {
        fetchUser();
        fetchStories();
    }, [username]);

    return (
        <div className={styles.userBlock}>
            <div className={styles.leftSide}>
                <img src={icon} alt={t("user.AvatarAlt")} className={styles.avatar} />

                {isOwner && user && (
                    <ChangeUsername user={user} setUser={setUser} />
                )}
            </div>

            <div className={styles.rightSide}>
                {user && (
                    <>
                        <h2 className={styles.name}>{user.username}</h2>

                        <p className={styles.createdAt}>
                            {t("user.RegisteredAt")}{" "}
                            {new Date(user.createdAt).toLocaleDateString()}
                        </p>

                        <p className={styles.countStories}>
                            {t("user.PublishedStoriesCount", {
                                count: user.publishedStoriesCount || 0,
                            })}
                        </p>

                        <StoriesStatus
                            stories={stories}
                            isOwner={isOwner}
                            setStories={setStories}
                            setUser={setUser}
                        />
                    </>
                )}
            </div>
        </div>
    );
}