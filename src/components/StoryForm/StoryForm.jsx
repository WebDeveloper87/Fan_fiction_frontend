import React, {useContext, useState} from 'react'
import style from './StoryForm.module.css'
import MyRadio from "../../UI/MyRadio/MyRadio";
import {LanguageContext} from "../../context/LanguageContext";
import {useTranslation} from "react-i18next";
import toast from "react-hot-toast";

function StoryForm() {
    const [genre, setGenre] = useState('');
    const [title, setTitle] = useState('');
    const [fandom, setFandom] = useState('');
    const [character, setCharacter] = useState('');
    const [characters, setCharacters] = useState([]);
    const { t } = useTranslation();
    const { lang, toggleLanguage } = useContext(LanguageContext);

    const addCharacter = (name = '', description = '', templateId = null) => {
        if (!templateId) {
            const characterName = character.trim();
            if (!characterName) return;

            setCharacters(prev => [
                ...prev,
                { id: crypto.randomUUID(), name: characterName, description, templateId: null }
            ]);

            setCharacter('');
            return;
        }

        setCharacters(prev => [
            ...prev,
            { id: crypto.randomUUID(), templateId }
        ]);
    };

    const removeCharacter = (id) => {
        setCharacters(prev => prev.filter(c => c.id !== id));
    };

    const templates = [
        {
            id: 'heroine',
            name: { en: 'Emma', ua: 'Емма' },
            description: {
                en: 'Strong-willed and compassionate. She stands up for what she believes in and never abandons the people she cares about.',
                ua: 'Сильна духом і співчутлива. Вона відстоює те, у що вірить, і ніколи не покидає дорогих їй людей.'
            }
        },
        {
            id: 'villain',
            name: { en: 'Dorian', ua: 'Доріан' },
            description: {
                en: 'Cold, intelligent and manipulative antagonist. Charismatic but ruthless, always planning three steps ahead.',
                ua: 'Холодний, розумний і хитрий. Харизматичний, але безжальний, завжди планує на кілька кроків уперед.'
            }
        },
        {
            id: 'comic',
            name: { en: 'Luna', ua: 'Луна' },
            description: {
                en: 'Cheerful and witty optimist who brings humor to any situation. Loyal friend with a surprisingly sharp mind.',
                ua: 'Весела та дотепна оптимістка, яка додає гумору в будь-яку ситуацію. Вірна подруга з несподівано гострим розумом.'
            }
        },
        {
            id: 'mysterious',
            name: { en: 'Ethan', ua: 'Ітан' },
            description: {
                en: 'Quiet and enigmatic loner with a hidden past. Observant, calm, and far more powerful than they appear.',
                ua: 'Тихий та загадковий одинак із прихованим минулим. Спостережливий, спокійний і значно могутніший, ніж здається.'
            }
        }
    ];

    const genres = [
        { en: "Romance", ua: "Романтика" },
        { en: "Drama", ua: "Драма" },
        { en: "Comedy", ua: "Комедія" },
        { en: "Action", ua: "Екшн" },
        { en: "Adventure", ua: "Пригоди" },
        { en: "Fantasy", ua: "Фентезі" },
        { en: "Horror", ua: "Жахи" },
        { en: "Mystery", ua: "Містика" },
        { en: "Thriller", ua: "Трилер" },
        { en: "Sci-Fi", ua: "Наукова фантастика" },
        { en: "Detective", ua: "Детектив" },
        { en: "Psychological Thriller", ua: "Психологічний трилер" }
    ];

    const storyRequest = async () => {
        const formattedCharacters = characters.map(c => {
            if (c.templateId) {
                const template = templates.find(t => t.id === c.templateId);
                return `${template.name[lang]}: ${template.description[lang]}`;
            } else {
                return c.name.trim();
            }
        }).join('; ');

        const storyData = { language: lang, title, fandom, genre, characters: formattedCharacters };

        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("You must be logged in to create a story.");
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/stories/generate-and-save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(storyData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to generate story");
        }

        console.log(data);
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !fandom.trim() || !genre || characters.length === 0) {
            toast.error("Please fill all fields and add at least one character.");
            return;
        }

        toast.promise(
            storyRequest(),
            {
                loading: "Generating story...",
                success: () => "Story generated successfully!",
                error: (err) => err.message,
            }
        );
    };

    return (
        <div className={style.storyForm}>
            <form  onSubmit={handleSubmit} className={style.form} action="">
                <div className={style.topForm}>
                    <div className={style.formElement}>
                        <label className={style.formTitle} htmlFor='title'>{t("storyForm.title")}</label>
                        <input className={style.formInput} value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder={t("storyForm.titlePlaceholder")} id='title' type="text" required/>
                    </div>
                    <div className={style.formElement}>
                        <label className={style.formTitle} htmlFor="fandom">{t("storyForm.fandom")}</label>
                        <input className={style.formInput} value={fandom} onChange={(e) => {setFandom(e.target.value)}} placeholder={t("storyForm.fandomPlaceholder")} type="text" id='fandom' required/>
                    </div>

                </div>

                <div className={style.middleForm}>
                    <p className={style.formTitle}>{t("storyForm.genre")}</p>
                    <div className={style.genresBox}>{genres.map(e => (
                        <MyRadio
                            key={e.en}
                            name="genre"
                            id={e.en}
                            value={e.en}
                            label={e[lang]}
                            checked={genre === e.en}
                            onChange={() => setGenre(e.en)}
                        />
                    ))}</div>
                </div>


                <div className={style.bottomForm}>
                    <label className={style.formTitle} htmlFor="character">{t("storyForm.character")}</label>
                    <div className={style.inputRow}>
                        <input className={style.formInput} id='character' type="text" placeholder={t("storyForm.characterPlaceholder")}
                               value={character} onChange={(e) => setCharacter(e.target.value)}/>
                        <button type="button" className={style.add} onClick={addCharacter}>{t("storyForm.add")}</button>
                    </div>
                    <p className={style.option}>{t("storyForm.orChoose")}</p>
                    <div className={style.template}>
                        <div className={style.template}>
                            {templates.map(t => {
                                const isSelected = characters.some(c => c.templateId === t.id);
                                return (
                                    <button
                                        key={t.id}
                                        type="button"
                                        className={isSelected ? style.selected : style.person}
                                        onClick={() => {
                                            if (!isSelected) {
                                                addCharacter('', '', t.id)
                                            }
                                        }}
                                    >
                                        <div className={style.checkbox}>{isSelected && <i className='bx bx-check'></i>}</div>
                                        <div className={style.personContent}>
                                            <p className={style.personName}>{t.name[lang]}</p>
                                            <hr />
                                            <p className={style.personDesc}>{t.description[lang]}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className={style.characters}>
                        {characters.map(c => {
                            const template = c.templateId ? templates.find(t => t.id === c.templateId) : null;
                            const name = template ? template.name[lang] : c.name;
                            const description = template ? template.description[lang] : c.description;

                            return (
                                <button type="button" key={c.id} onClick={() => removeCharacter(c.id)} className={style.character}>
                                    {name} <i className='bx bx-x'></i>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <button type='submit' className={style.create} onClick={handleSubmit}>{t("storyForm.create")}</button>
            </form>
        </div>
    )
}

export default StoryForm
