import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styles from "./Story.module.css";
import {useTranslation} from "react-i18next";
import toast from "react-hot-toast";
import StoryDescription from "../StoryDescription/StoryDescription";

export default function Story() {
    const {id} = useParams();
    const {t} = useTranslation();

    const [story, setStory] = useState(null);

    const fetchStory = async () => {
        try {
            const token = localStorage.getItem("JWT_TOKEN");
            if (!token) {
                throw new Error(t("errors.mustBeLoggedIn"));
            }

            const accessToken = localStorage.getItem("JWT_ACCESS_TOKEN");
            if (!accessToken) {
                throw new Error(t("errors.mustBeLoggedIn"));
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}stories/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-refresh-token": accessToken,
                },
            });

            const data = await response.json();
console.log(data);
            if (!response.ok) {
                throw new Error(data.message || t("errors.StoryNotFound"));
            }

            setStory(data);
        } catch (error) {
            toast.error(error.message || t("errors.StoryNotFound"));
        }
    };

    useEffect(() => {
        fetchStory();
    }, [id]);

    if (!story) return null;

    return (
        <div className={styles.page}>
            <div className={styles.layout}>
                <div className={styles.wrapper}>
                    <div className={styles.text}>
                        {story.content}
                    </div>
                </div>

                <StoryDescription story={story} />
            </div>
        </div>
    );
}