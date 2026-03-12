import React, {useEffect, useRef, useState} from 'react'
import {getStories} from "../../API/StoriesService";
import Loader from "../../UI/Loader/Loader";
import style from "./stories.module.css";
import {useObserver} from "../../hooks/useObserver";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

function Stories() {

    let [stories, setStories] = useState([]);
    let [loading, setLoading] = useState(false);
    let [limit, setLimit] = useState(10)
    let [cursor, setCursor] = useState(null);
    let [page, setPage] = useState(1);

    const lastElement = useRef()
    const navigate = useNavigate();

    const { t } = useTranslation();

    //const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


    const fetchStories = async () => {
        try {
            setLoading(true);


            //await sleep(5000);

            const data = await getStories(limit, cursor, t);
            console.log(data)
            setCursor(data.nextCursor)
            setStories(prev => [...prev, ...data.stories])
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStories();
    }, [page])

    useObserver(lastElement, cursor !== null && cursor > 1, loading,
        () => setPage(prev => prev + 1)
    );

    const toggleLike = async (storyId) => {

        const token = localStorage.getItem("JWT_TOKEN");
        const access_token = localStorage.getItem("JWT_ACCESS_TOKEN");

        if (!token || !access_token) {
            throw new Error(t("errors.mustBeLoggedIn"));
        }

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}likes/${storyId}/like`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-refresh-token" : `${access_token}`,
                }
            }
        );

        return response.json();
    };

    const handleLike = async (storyId) => {

        setStories(prev =>
            prev.map(s =>
                s.id === storyId
                    ? {
                        ...s,
                        isLiked: !s.isLiked,
                        likesCount: s.isLiked
                            ? s.likesCount - 1
                            : s.likesCount + 1
                    }
                    : s
            )
        );

        await toggleLike(storyId);
    };


    return (
        <div className={style.contentStories}>
            <div className={style.stories}>
                {stories.map((story) => (
                    <div onClick={() => navigate(`/story/${story.id}`)} key={story.id}>
                        <div className={style.story}>
                            <b>{t('stories.title')} : {story.title}</b>
                            <p>{t('stories.author')} : <Link to={`/user/${story.user.username}`}>{story.user.username}</Link></p>
                            <button className={style.like} onClick={() => handleLike(story.id)}>
                                {story.isLiked ? <i className='bx bxs-heart'></i> : <i className='bx bx-heart' ></i>} {story.likesCount}
                            </button>
                            <div className={style.arrow}>
                                <i className='bx bx-right-arrow-alt'></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {loading && <Loader /> }
            <div ref={lastElement} style={{height: 20, width: '100%'}} />
        </div>

    )
}

export default Stories
