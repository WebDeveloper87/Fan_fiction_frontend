import React, {useEffect, useState} from 'react'
import style from './StoriesLeaderboard.module.css'
import Loader from "../../UI/Loader/Loader";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

function StoriesLeaderboard() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const fetchStoriesLeaderboard = async () => {
        try {
            const token = localStorage.getItem("JWT_TOKEN");
            const access_token = localStorage.getItem("JWT_ACCESS_TOKEN");

            if (!token || !access_token) {
                throw new Error("You must be logged in");
            }

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}stories/leaderboard`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "x-refresh-token": access_token,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch leaderboard");
            }

            const data = await response.json();
            setStories(data);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStoriesLeaderboard();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div className={style.container}>
            <h1 className={style.title}>Stories Leaderboard</h1>
            <div className={style.tableWrapper}>
                <table className={style.table}>
                    <thead>
                    <tr>
                        <th>{t("storiesTable.position")}</th>
                        <th>{t("storiesTable.title")}</th>
                        <th>{t("storiesTable.genre")}</th>
                        <th>{t("storiesTable.fandom")}</th>
                        <th>{t("storiesTable.author")}</th>
                        <th>{t("storiesTable.likes")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stories.map((story, index) => (
                        <tr key={story.id}>
                            <td><p>{index + 1}</p></td>
                            <td><p className={style.navigate} onClick={() => {navigate(`/story/${story.id}`)}}>{story.title}</p></td>
                            <td><p>{story.genre}</p></td>
                            <td><p>{story.fandom}</p></td>
                            <td><p className={style.navigate} onClick={() => {navigate(`/user/${story.author}`)}} n>{story.author}</p></td>
                            <td><p>{story.likesCount}</p></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StoriesLeaderboard
