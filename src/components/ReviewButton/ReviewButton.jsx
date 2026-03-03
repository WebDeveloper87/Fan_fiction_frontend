import React from "react";
import styles from "./reviewbutton.module.css";
import {useNavigate} from "react-router-dom";


export default function ReviewButton() {
    const navigate = useNavigate();
    return (
        <div className={styles.review}>
            <button onClick={() => {
                return navigate("/review");
            }}
                    className={styles.reviewbtn}>Leave your review
            </button>
        </div>
    );
}
