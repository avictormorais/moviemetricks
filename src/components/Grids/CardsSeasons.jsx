import React, { useState, useEffect } from "react";
import styles from "./CardsSeasons.module.css";
import CardPoster from "../Cards/CardPoster";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";
import CardEpisode from "../Cards/CardEpisode";
import SI from "../../assets/SI.png";
import EpisodeDetails from "../Sections/EpisodeDetails";

function ContainerCards({ temporadas, id }) {
  const [seasonContent, setSeasonContent] = useState(null);
  const [viewingSeasons, setViewingSeasons] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  const handleSeasonClick = (seasonNumber) => {
    api.get(`/tmdb/season?id=${id}&season=${seasonNumber}`).then((response) => {
      setViewingSeasons(false);
      setSeasonContent(response.data.season);
    });

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    
    api.get(`/api/user/watched_episodes/${id}/${seasonNumber}`, config)
    .then((response) => {
      setEpisodes(response.data.episodes)
    })
    .catch(() => {
      setEpisodes([])
    });
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    if(seasonContent){
      api.get(`/api/user/watched_episodes/${id}/${seasonContent.season_number}`, config)
      .then((response) => {
        setEpisodes(response.data.episodes)
        console.log(episodes)
      })
      .catch(() => {
        setEpisodes([])
      });
    }
  }, [viewingSeasons, selectedEpisode])

  const handleGoBack = () => {
    if (selectedEpisode) {
      setSelectedEpisode(null);
    } else {
      setViewingSeasons(true);
      setSeasonContent(null);
    }
  };

  return (
    <>
      {selectedEpisode ? (
        <div className={styles.DivEpisodeDetails}>
          <div className={styles.divBackEp}>
            <FaArrowLeft onClick={handleGoBack} />
            <h2 className={styles.titleEp}>
              {selectedEpisode.episode_number + " - " + selectedEpisode.name}
            </h2>
          </div>
          <EpisodeDetails episode={selectedEpisode} />
        </div>
      ) : (
        <div className={styles.ContainerCards}>
          {viewingSeasons ? (
            <div className={styles.DivSeasons}>
              <h2 className={styles.SeasonsH2} style={{ marginBlock: "15px" }}>
                Temporadas
              </h2>
              <div className={styles.divCards}>
                {temporadas.map(
                  (item) =>
                    item.season_number !== 0 &&
                    item.episode_count !== 0 && (
                      <CardPoster
                        key={item.season_number}
                        onClick={() => handleSeasonClick(item.season_number)}
                        img={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                            : SI
                        }
                        title={item.name}
                        data={
                          item.air_date ? item.air_date.split("-")[0] : null
                        }
                        eps={item.episode_count}
                        id={item.season_number}
                        tipo="season"
                      />
                    )
                )}
              </div>
            </div>
          ) : (
            <div className={styles.DivEpisodes}>
              <span className={styles.DivSeasonTitle}>
                <FaArrowLeft onClick={handleGoBack} />
                <h2 className={styles.TitleSeason}>{seasonContent.name}</h2>
              </span>
              <div className={styles.gridEpisodes}>
                {seasonContent.episodes.map((item) => (
                  <CardEpisode
                    episode={item}
                    serieId={id}
                    key={`${item.id}-${episodes}`}
                    onEpisodeClick={() => setSelectedEpisode(item)}
                    seen={episodes.includes(item.episode_number)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ContainerCards;
