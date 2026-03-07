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
            text: t("invocations.c"),
            img: create
        },
        {
            title: t("invocations.like"),
            text: t("invocations.l"),
            img: like
        },
        {
            title: t("invocations.share"),
            text: t("invocations.s"),
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