import React from "react";
import styles from "./Invocations.module.css";
import create from "../../photos/create.png";
import like from "../../photos/like.png";
import share from "../../photos/share.png";

export default function Invocations() {
    return (
         <div className={styles.container}>
            <div className={styles.create}>
                <img src={create} alt="create"/>
            </div>

            <div className={styles.like}>
                <img src={like} alt="like"/>
            </div>

            <div className={styles.share}>
                <img src={share} alt="share"/>
            </div>
        </div>

    );
}