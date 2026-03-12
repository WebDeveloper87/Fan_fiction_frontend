import React, {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./storiesStatus.module.css";
import {useTranslation} from "react-i18next";
import toast from "react-hot-toast";

export default function StoriesStatus({
                                          stories,
                                          isOwner,
                                          setStories,
                                          setUser,
                                      }) {
    const navigate = useNavigate();
    const [loadingId, setLoadingId] = useState(null);
    const {t} = useTranslation();

    const publicStories = useMemo(
        () => stories.filter((story) => story.status?.toLowerCase() === "public"),
        [stories]
    );

    const privateStories = useMemo(
        () => stories.filter((story) => story.status?.toLowerCase() === "private"),
        [stories]
    );

    const visiblePrivateStories = isOwner ? privateStories : [];

    const handleOpenStory = (storyId) => {
        navigate(`/stories/${storyId}`);
    };

    const handleToggleStatus = async (e, story) => {
        e.stopPropagation();

        const currentStatus = story.status?.toLowerCase();
        const newStatus = currentStatus === "public" ? "private" : "public";

        try {
            setLoadingId(story.id);

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}stories/${story.id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("JWT_TOKEN")}`,
                    },
                    body: JSON.stringify({
                        status: newStatus,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || t("errors.FailedToUpdateStoryStatus"));
            }

            setStories((prevStories) =>
                prevStories.map((item) =>
                    item.id === story.id
                        ? {...item, status: data.status ?? newStatus}
                        : item
                )
            );

            if (typeof setUser === "function") {
                setUser((prevUser) => {
                    if (!prevUser) return prevUser;

                    if (currentStatus === "public" && newStatus === "private") {
                        return {
                            ...prevUser,
                            publishedStoriesCount: Math.max(
                                0,
                                (prevUser.publishedStoriesCount || 0) - 1
                            ),
                            privateStoriesCount:
                                (prevUser.privateStoriesCount || 0) + 1,
                        };
                    }

                    if (currentStatus === "private" && newStatus === "public") {
                        return {
                            ...prevUser,
                            publishedStoriesCount:
                                (prevUser.publishedStoriesCount || 0) + 1,
                            privateStoriesCount: Math.max(
                                0,
                                (prevUser.privateStoriesCount || 0) - 1
                            ),
                        };
                    }

                    return prevUser;
                });
            }

            toast.success(
                newStatus === "public"
                    ? t("user.StoryMadePublic")
                    : t("user.StoryMadePrivate")
            );
        } catch (error) {
            toast.error(error.message || t("errors.FailedToUpdateStoryStatus"));
        } finally {
            setLoadingId(null);
        }
    };

    const renderStoryCard = (story) => {
        const isPublic = story.status?.toLowerCase() === "public";

        return (
            <div
                key={story.id}
                className={isPublic ? styles.publicCard : styles.privateCard}
                onClick={() => handleOpenStory(story.id)}
            >
                <p className={styles.storyTitle}>{story.title}</p>

                {isOwner && (
                    <div className={styles.overlay}>
                        <button
                            className={styles.statusButton}
                            onClick={(e) => handleToggleStatus(e, story)}
                            disabled={loadingId === story.id}
                        >
                            {loadingId === story.id
                                ? t("common.Loading")
                                : isPublic
                                    ? t("user.MakePrivate")
                                    : t("user.MakePublic")
                            }
                        </button>
                    </div>
                )}
            </div>
        );
    };

    if (!publicStories.length && !visiblePrivateStories.length) {
        return (
            <div className={styles.storySection}>
                <h3 className={styles.sectionTitle}>{t("user.Stories")}</h3>
                <p className={styles.empty}>{t("user.NoStoriesYet")}</p>
            </div>
        );
    }

    return (
        <div className={styles.storySection}>
            <h3 className={styles.sectionTitle}>{t("user.Stories")}</h3>

            <div className={styles.groupBlock}>
                <h4 className={styles.groupTitle}>{t("user.Public")}</h4>
                <div className={styles.storiesGrid}>
                    {publicStories.length ? (
                        publicStories.map(renderStoryCard)
                    ) : (
                        <p className={styles.emptySmall}>{t("user.NoPublicStories")}</p>
                    )}
                </div>
            </div>

            {isOwner && (
                <>
                    <hr className={styles.divider} />

                    <div className={styles.groupBlock}>
                        <h4 className={styles.groupTitle}>{t("user.Private")}</h4>
                        <div className={styles.storiesGrid}>
                            {visiblePrivateStories.length ? (
                                visiblePrivateStories.map(renderStoryCard)
                            ) : (
                                <p className={styles.emptySmall}>{t("user.NoPrivateStories")}</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}