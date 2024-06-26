import styles from './CardEpisode.module.css';
import { FaRegClock, FaCalendarDays, FaStar } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";
import api from '../../services/api';
import React, { useState } from 'react';

function CardEpisode({ episode, serieId, onEpisodeClick, seen }) {
  const [isSeen, setIsSeen] = useState(seen);

  function handleClickedEpisode() {
    onEpisodeClick(episode);
  }

  const handleClickSeen = (e) => {
    e.stopPropagation();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    const data = {
      series_id: episode.show_id,
      season_number: episode.season_number,
      episode_numbers: episode.episode_number
    };

    if(seen){
      api.delete(`/api/user/watched_episodes`, { data, ...config })
      .then((response) => {
        setIsSeen(false);
      })
      .catch((error) => {

      });
    } else{
      api.post(`/api/user/watched_episodes`, data, config)
      .then((response) => {
        setIsSeen(true);
      })
      .catch((error) => {
        
      });
    }
  }

  return (
    <div className={styles.CardEpisode} onClick={handleClickedEpisode}>
      <div className={styles.BackgroundImg} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${episode.still_path})`}}>
        <div className={styles.FadeEpisode}>
          {isSeen ? (
            <IoEye className={styles.seenIcon} onClick={handleClickSeen}/>
          ) : (
            <IoEyeOff className={styles.unSeenIcon} onClick={handleClickSeen}/>
          )}
          {episode.runtime && (
            <div className={styles.DivRuntime}>
              <FaRegClock className={styles.RuntimeClock}/>
              <p>{episode.runtime} Mins</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.EpisodeInfos}>
        <h2 className={styles.EpisodeTitle}>{episode.episode_number}. {episode.name}</h2>
        <p className={styles.EpisodeOverview}>{episode.overview}</p>
        <div className={styles.EpisodeBottomInfos}>
          <span className={styles.BottomInfo}>
            <FaCalendarDays/>
            <p>{episode.air_date}</p>
          </span>
          <span className={styles.BottomInfo}>
            <FaStar/>
            <p>{episode.vote_average.toFixed(1)}</p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CardEpisode;
