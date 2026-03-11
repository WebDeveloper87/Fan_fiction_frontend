import React, { useContext, useState } from "react";
import style from "./StoryForm.module.css";
import MyRadio from "../../UI/MyRadio/MyRadio";
import { LanguageContext } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

function StoryForm() {
    const [genre, setGenre] = useState("");
    const [title, setTitle] = useState("");
    const [fandom, setFandom] = useState("");
    const [character, setCharacter] = useState("");
    const [characters, setCharacters] = useState([]);

    const { t } = useTranslation();
    const { lang } = useContext(LanguageContext);

    const genres = [
        "romance",
        "drama",
        "comedy",
        "action",
        "adventure",
        "fantasy",
        "horror",
        "mystery",
        "thriller",
        "sciFi",
        "detective",
        "psychologicalThriller",
    ];

    const templates = [
        {
            id: "heroine",
            name: { en: "Emma", ua: "Емма" },
            description: {
                en: "Strong-willed and compassionate. She stands up for what she believes in and never abandons the people she cares about.",
                ua: "Сильна духом і співчутлива. Вона відстоює те, у що вірить, і ніколи не покидає дорогих їй людей.",
            },
        },
        {
            id: "villain",
            name: { en: "Dorian", ua: "Доріан" },
            description: {
                en: "Cold, intelligent and manipulative antagonist. Charismatic but ruthless, always planning three steps ahead.",
                ua: "Холодний, розумний і хитрий. Харизматичний, але безжальний, завжди планує на кілька кроків уперед.",
            },
        },
        {
            id: "comic",
            name: { en: "Luna", ua: "Луна" },
            description: {
                en: "Cheerful and witty optimist who brings humor to any situation. Loyal friend with a surprisingly sharp mind.",
                ua: "Весела та дотепна оптимістка, яка додає гумору в будь-яку ситуацію. Вірна подруга з несподівано гострим розумом.",
            },
        },
        {
            id: "mysterious",
            name: { en: "Ethan", ua: "Ітан" },
            description: {
                en: "Quiet and enigmatic loner with a hidden past. Observant, calm, and far more powerful than they appear.",
                ua: "Тихий та загадковий одинак із прихованим минулим. Спостережливий, спокійний і значно могутніший, ніж здається.",
            },
        },
    ];

    const addCharacter = (name = "", description = "", templateId = null) => {
        if (!templateId) {
            const characterName = character.trim();
            if (!characterName) return;

            setCharacters((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    name: characterName,
                    description,
                    templateId: null,
                },
            ]);

            setCharacter("");
            return;
        }

        setCharacters((prev) => [...prev, { id: crypto.randomUUID(), templateId }]);
    };

    const removeCharacter = (id) => {
        setCharacters((prev) => prev.filter((c) => c.id !== id));
    };

    const storyRequest = async () => {
        const formattedCharacters = characters
            .map((c) => {
                if (c.templateId) {
                    const template = templates.find((tpl) => tpl.id === c.templateId);
                    if (!template) return "";
                    return `${template.name[lang]}: ${template.description[lang]}`;
                }
                return c.name.trim();
            })
            .filter(Boolean)
            .join("; ");

        const storyData = {
            language: lang,
            title,
            fandom,
            genre,
            characters: formattedCharacters,
        };

        const token = localStorage.getItem("JWT_TOKEN");
        if (!token) {
            throw new Error(t("errors.mustBeLoggedIn"));
        }

        const access_token = localStorage.getItem("JWT_ACCESS_TOKEN");
        if (!access_token) {
            throw new Error(t("errors.mustBeLoggedIn"));
        }

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}stories/generate-and-save`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "x-refresh-token" : `${access_token}`,
                },
                body: JSON.stringify(storyData),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || t("errors.failedToGenerateStory"));
        }

        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !fandom.trim() || !genre || characters.length === 0) {
            toast.error(t("errors.fillAllFields"));
            return;
        }

        toast.promise(storyRequest(), {
            loading: t("toast.generating"),
            success: () => t("toast.generated"),
            error: (err) => err.message,
        });
    };

    return (
        <div className={style.storyForm}>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.topForm}>
                    <div className={style.formElement}>
                        <label className={style.formTitle} htmlFor="title">
                            {t("storyForm.title")}
                        </label>
                        <input
                            className={style.formInput}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={t("storyForm.titlePlaceholder")}
                            id="title"
                            type="text"
                            required
                        />
                    </div>

                    <div className={style.formElement}>
                        <label className={style.formTitle} htmlFor="fandom">
                            {t("storyForm.fandom")}
                        </label>
                        <input
                            className={style.formInput}
                            value={fandom}
                            onChange={(e) => setFandom(e.target.value)}
                            placeholder={t("storyForm.fandomPlaceholder")}
                            type="text"
                            id="fandom"
                            required
                        />
                    </div>
                </div>

                <div className={style.middleForm}>
                    <p className={style.formTitle}>{t("storyForm.genre")}</p>

                    <div className={style.genresBox}>
                        {genres.map((g) => (
                            <MyRadio
                                key={g}
                                name="genre"
                                id={g}
                                label={t(`storyForm.genres.${g}`)}
                                checked={genre === g}
                                onChange={() => setGenre(g)}
                            />
                        ))}
                    </div>
                </div>

                <div className={style.bottomForm}>
                    <label className={style.formTitle} htmlFor="character">
                        {t("storyForm.character")}
                    </label>

                    <div className={style.inputRow}>
                        <input
                            className={style.formInput}
                            id="character"
                            type="text"
                            placeholder={t("storyForm.characterPlaceholder")}
                            value={character}
                            onChange={(e) => setCharacter(e.target.value)}
                        />

                        <button
                            type="button"
                            className={style.add}
                            onClick={() => addCharacter()}
                        >
                            {t("storyForm.add")}
                        </button>
                    </div>

                    <p className={style.option}>{t("storyForm.orChoose")}</p>

                    <div className={style.template}>
                        {templates.map((tpl) => {
                            const isSelected = characters.some((c) => c.templateId === tpl.id);

                            return (
                                <button
                                    key={tpl.id}
                                    type="button"
                                    className={isSelected ? style.selected : style.person}
                                    onClick={() => {
                                        if (!isSelected) addCharacter("", "", tpl.id);
                                    }}
                                >
                                    <div className={style.checkbox}>
                                        {isSelected && <i className="bx bx-check" />}
                                    </div>

                                    <div className={style.personContent}>
                                        <p className={style.personName}>{tpl.name[lang]}</p>
                                        <hr />
                                        <p className={style.personDesc}>{tpl.description[lang]}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className={style.characters}>
                        {characters.map((c) => {
                            const tpl = c.templateId
                                ? templates.find((x) => x.id === c.templateId)
                                : null;

                            const name = tpl ? tpl.name[lang] : c.name;

                            return (
                                <button
                                    type="button"
                                    key={c.id}
                                    onClick={() => removeCharacter(c.id)}
                                    className={style.character}
                                >
                                    {name} <i className="bx bx-x" />
                                </button>
                            );
                        })}
                    </div>
                </div>

                <button type="submit" className={style.create}>
                    {t("storyForm.create")}
                </button>
            </form>
        </div>
    );
}

export default StoryForm;