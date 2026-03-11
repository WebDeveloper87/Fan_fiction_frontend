import React, {useEffect, useRef, useState} from 'react'
import {getStories} from "../../API/StoriesService";
import Loader from "../../UI/Loader/Loader";
import style from "./stories.module.css";
import {useObserver} from "../../hooks/useObserver";

function Stories() {

    let [stories, setStories] = useState([]);
    let [loading, setLoading] = useState(false);
    let [limit, setLimit] = useState(10)
    let [cursor, setCursor] = useState(null);
    let [page, setPage] = useState(1);

    const lastElement = useRef()

    //const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


    const fetchStories = async () => {
        try {
            setLoading(true);


            //await sleep(5000);

            const data = await getStories(limit, cursor);
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



    return (
        <div className={style.contentStories}>
            <div className={style.stories}>
                {stories.map((story) => (
                    <div key={story.id}>
                        <div className={style.story}>
                            <p>{story.id}</p>
                            <b>Title : {story.title}</b>
                            <p>Author : <a href="">{story.user.username}</a></p>
                            <i className='bx bx-right-arrow-alt'></i>
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
