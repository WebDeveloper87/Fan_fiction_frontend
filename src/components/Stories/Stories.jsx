import React, {useEffect, useState} from 'react'
import {getStories} from "../../API/StoriesService";
import Loader from "../../UI/Loader/Loader";
import style from "./stories.module.css";

function Stories() {

    let [stories, setStories] = useState([]);
    let [loading, setLoading] = useState(false);
    let [totalPages, setTotalPages] = useState(0);
    let [limit, setLimit] = useState(10)
    let [cursor, setCursor] = useState(null);


    useEffect(() => {
        const fetchStories = async () => {
            try {
                setLoading(true);
                const data = await getStories(limit, cursor);
                setTotalPages(Math.ceil(data.totalCount / 20));
                setCursor(data.nextCursor)
                setStories([...stories, ...data.stories])
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    return (
        <div className={style.stories}>
            {loading && <Loader /> }
            {stories.map((story) => (
                <div key={story.id}>
                    <p>{story.id}</p>
                    <div className={style.story}>{story.title}</div>
                </div>
            ))}
        </div>
    )
}

export default Stories
