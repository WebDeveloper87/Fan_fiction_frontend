import React, {useState} from "react";
import styles from "./changeName.module.css";
import {useTranslation} from "react-i18next";
import toast from "react-hot-toast";

export default function ChangeUsername({user, setUser}) {
    const [isEditing, setIsEditing] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const [newUsername, setNewUsername] = useState(user.username);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();

    const handleSave = async () => {
        if (!newUsername.trim()) {
            toast.error(t("errors.EmptyUsername"));
            return;
        }

        try {
            setLoading(true);

            const token = localStorage.getItem("JWT_TOKEN");
            const access_token = localStorage.getItem("JWT_ACCESS_TOKEN");

            if (!token || !access_token) {
                throw new Error(t("errors.mustBeLoggedIn"));
            }

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}users/update-username`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        "x-refresh-token": access_token,
                    },
                    body: JSON.stringify({
                        newUsername: newUsername.trim(),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || t("errors.FailedToUpdateUsername"));
            }

            setUser((prev) => ({
                ...prev,
                username: data.username,
            }));

            setIsEditing(false);
            setShowActions(false);

            toast.success(t("user.UsernameUpdated"));
        } catch (error) {
            toast.error(error.message || t("errors.FailedToUpdateUsername"));
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setNewUsername(user.username);
        setIsEditing(false);
        setShowActions(false);
    };

    return (
        <div className={styles.wrapper}>
            {!isEditing ? (
                <button
                    className={styles.changeButton}
                    onClick={() => {
                        setNewUsername(user.username);
                        setIsEditing(true);
                    }}
                >
                    {t("user.ChangeUsername")}
                </button>
            ) : (
                <>
                    <input
                        className={styles.input}
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder={t("user.NewUsername")}
                        onFocus={() => setShowActions(true)}
                    />

                    {showActions && (
                        <div className={styles.actions}>
                            <button
                                className={styles.saveButton}
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {loading ? t("common.Saving") : t("common.Save")}
                            </button>

                            <button
                                className={styles.cancelButton}
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                {t("common.Cancel")}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}