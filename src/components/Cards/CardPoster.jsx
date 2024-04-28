import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardPoster.module.css';
import { FaCalendarDay, FaList, FaQuestion, FaStar } from "react-icons/fa6";

const CardPoster = ({ img, title, estrelas, tipo, id, data, eps, onClick }) => {
    return (
        tipo === "season" ? (
            <div className={styles.CardPoster} onClick={onClick}>
                <img src={img} alt={title} />
                <h3 className={styles.CardPosterH3}>{title}</h3>
                <div className={styles.CardPosterSeasonInfos}>
                    <FaCalendarDay/>
                    <span>{data}</span>
                    <FaList style={{ marginLeft: 'auto' }} />
                    <span>{eps} Eps</span>
                </div>
            </div>
        ) : (
            <Link to={`/details/${tipo}/${id}`} className={styles.CardPoster} onClick={onClick}>
                <img src={img} alt={title} />
                <h3 className={styles.CardPosterH3}>{title}</h3>
                <div className={styles.CardPosterStars}>
                    {estrelas === 0 ? (
                        <FaQuestion className={styles.starIcon} />
                    ) : (
                        Array.from({ length: estrelas }, (_, index) => (
                            <FaStar key={index} className={styles.starIcon} />
                        ))
                    )}
                </div>
            </Link>
        )
    );
}

export default CardPoster;
