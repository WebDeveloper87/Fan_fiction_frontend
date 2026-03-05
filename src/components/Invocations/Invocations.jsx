import React from "react";
import styles from "./Invocations.module.css";
import create from "../../photos/create.png";
import like from "../../photos/like.png";
import share from "../../photos/share.png";
import { useTranslation } from "react-i18next";

export default function Invocations() {

    const { t } = useTranslation();

    const blocks = [
        {
            title: t("invocations.create"),
            text: "Create amazing content and bring ideas to life.",
            img: create
        },
        {
            title: t("invocations.like"),
            text: "Support the content you truly enjoy.",
            img: like
        },
        {
            title: t("invocations.share"),
            text: "Share moments and ideas with the world.",
            img: share
        }
    ];

    return (
        <section className={styles.section}>

            {blocks.map((b, i) => (
                <div key={i} className={styles.block}>

                    <div className={styles.text}>
                        <h1>{b.title}</h1>
                        <p>{b.text}</p>
                    </div>

                    <div className={styles.image}>
                        <img src={b.img} alt={b.title}/>
                    </div>

                </div>
            ))}

        </section>
    );
}