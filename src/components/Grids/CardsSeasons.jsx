import React, { useState } from "react";
import styles from './CardsSeasons.module.css';
import CardPoster from "../Cards/CardPoster";
import { FaArrowLeft } from "react-icons/fa6";
import api from "../../services/api";
import CardEpisode from "../Cards/CardEpisode";

function ContainerCards({ temporadas, id }) {
    const [seasonContent, setSeasonContent] = useState(null);
    const [viewingSeasons, setViewingSeasons] = useState(true);
    
    const handleSeasonClick = (seasonNumber) => {
        api.get(`/tmdb/season?id=${id}&season=${seasonNumber}`)
        .then(response => {
            setViewingSeasons(false);
            setSeasonContent(response.data.season);
        })
    };

    const handleGoBack = () => {
        setViewingSeasons(true);
        setSeasonContent(null);
    };

    return (
        <div className={styles.ContainerCards}>
            {viewingSeasons ? (
                <div className={styles.DivSeasons}>
                    <h2 className={styles.SeasonsH2} style={{ marginBottom: '15px' }}>Temporadas</h2>
                    <div className={styles.divCards}>
                        {temporadas.map(item => (
                            item.season_number !== 0 && (
                                <CardPoster
                                    key={item.season_number}
                                    onClick={() => handleSeasonClick(item.season_number)}
                                    img={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                    title={item.name}
                                    data={item.air_date && item.air_date.split("-")[0]}
                                    eps={item.episode_count && item.episode_count}
                                    id={item.season_number}
                                    tipo='season'
                                />
                            )
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.DivEpisodes}>
                    <span className={styles.DivSeasonTitle}>
                        <FaArrowLeft onClick={handleGoBack} />
                        <h2 className={styles.TitleSeason}>{seasonContent.name}</h2>
                    </span>
                    <div className={styles.gridEpisodes}>
                        {seasonContent.episodes.map(item => (
                            <CardEpisode episode={item} key={item.id}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContainerCards;
