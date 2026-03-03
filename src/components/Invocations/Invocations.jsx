import React from "react";
import styles from "./Invocations.module.css";
import create from "../../photos/create.png";
import like from "../../photos/like.png";
import share from "../../photos/share.png";

export default function Invocations() {
    return (
         <div className={styles.container}>
            <div className={styles.create}>
                <h1> Create</h1> <img src={create} alt="create"/>
            </div>

            <div className={styles.like}>
              <h1> Like </h1>  <img src={like} alt="like"/>
            </div>

             <div className={styles.share}>
                 <h1> Share </h1> <img src={share} alt="share"/>
             </div>
         </div>

    );
}