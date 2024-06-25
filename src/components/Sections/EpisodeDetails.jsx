import React from "react";
import styles from "./EpisodeDetails.module.css";
import { FaClock, FaStar, FaCalendar } from "react-icons/fa6";
import Person from "../Person";
import api from "../../services/api";
import { useEffect, useState } from "react";

function EpisodeDetails({ episode }) {
  const [credits, setCredits] = useState(null);

  useEffect(() => {
      api.get(`tmdb/credits?id=${episode.show_id}&season_number=${episode.season_number}&episode_number=${episode.episode_number}`)
      .then((response) => {
        setCredits(response.data)
      })
    }, [episode])

  return (
    <>
      <div className={styles.divEp}>
        {episode ? (
          <>
            <div className={styles.divPreview}>
              <img
                src={`https://image.tmdb.org/t/p/original/${episode.still_path}`}
                alt=""
              />
            </div>
            <div className={styles.divDetails}>
              <h1 className={styles.EpName}>{episode.name}</h1>
              <p className={styles.overview}>{episode.overview}</p>
              <div className={styles.divInfos}>
                <span>
                  <FaClock />
                  {episode.runtime} min
                </span>
                <span>
                  <FaStar />
                  {episode.vote_average.toFixed(1)}
                </span>
                <span>
                  <FaCalendar />
                  {episode.air_date}
                </span>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div className={styles.persons}>
        {credits && (
          <>
            {credits.cast.map((person, index) => (
              person.profile_path && <Person key={index} name={person.name} image={person.profile_path} id={person.id} role={person.character.split('(')[0]}/>
            ))}
            {credits.guest_stars.map((person, index) => (
              person.profile_path && <Person key={index} name={person.name} image={person.profile_path} id={person.id} role={person.character.split('(')[0]}/>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default EpisodeDetails;
