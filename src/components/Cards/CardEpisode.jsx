import styles from './CardEpisode.module.css';
import { FaRegClock, FaCalendarDays, FaStar } from "react-icons/fa6";

function CardEpisode({ episode, serieId }) {

  function handleClickedEpisode() {
    console.log(`${serieId}: ${episode.season_number} - ${episode.episode_number}`)
  }

  return (
    <div className={styles.CardEpisode} onClick={handleClickedEpisode}>
      <div className={styles.BackgroundImg} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${episode.still_path})`}}>
        <div className={styles.FadeEpisode}>
          {episode.runtime && (
            <div className={styles.DivRuntime}>
              <FaRegClock className={styles.RuntimeClock}/>
              <p>{episode.runtime} Mins</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.EpisodeInfos}>
        <h2 className={styles.EpisodeTitle}>{episode.name}</h2>
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