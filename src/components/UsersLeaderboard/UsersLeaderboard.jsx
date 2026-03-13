import React, {useEffect, useState} from 'react'
import Loader from "../../UI/Loader/Loader";

function UsersLeaderboard() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsersLeaderboard = async () => {
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
        fetchUsersLeaderboard();
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
                        <th>#</th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Fandom</th>
                        <th>Author</th>
                        <th>Likes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stories.map((story, index) => (
                        <tr key={story.id}>
                            <td>{index + 1}</td>
                            <td>{story.title}</td>
                            <td>{story.genre}</td>
                            <td>{story.fandom}</td>
                            <td>{story.author}</td>
                            <td>{story.likesCount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersLeaderboard
