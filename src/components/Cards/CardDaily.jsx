import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardDaily.module.css';
import { useState, useEffect } from "react";
import { FaStar, FaLanguage, FaRegCalendar } from 'react-icons/fa6';
import api from './../../services/api.js';

function CardDaily({ tipo, id, overview, vote_average, original_language, release_date, backdrop_path, title }) {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    api.get(`/tmdb/logo?tipo=${tipo}&id=${id}&height=w200`)
      .then(response => {
        setLogo(response.data.logo);
      })
      .catch(error => {
        console.log(error.request.responseText);
      });
  }, [id]);

  return (
    <Link to={`/details/${tipo}/${id}`} className={styles.DailyDiv}>
      <div className={styles.DailyBackdrop} style={{ backgroundImage: `url(${backdrop_path})` }}>
        <div className={styles.DailyFade}>
          {logo ? (
            <>
              <img className={styles.DailyLogo} src={logo} alt="" />
              <p className={styles.DailyOverview}>{overview}</p>
            </>
          ) : (
            <>
              <h1 className={styles.DailyTitle}>{title}</h1>
              <p className={styles.DailyOverview}>{overview}</p>
            </>
          )}
        </div>
      </div>
      <div className={styles.DailyInfos}>
        <div className={styles.DailyInfo}>
          <FaStar></FaStar>
          <p>{vote_average}</p>
        </div>
        <div className={styles.DailyInfo}>
          <FaLanguage></FaLanguage>
          <p>{original_language}</p>
        </div>
        <div className={styles.DailyInfo}>
          <FaRegCalendar></FaRegCalendar>
          <p>{release_date}</p>
        </div>
      </div>
    </Link>
  );
}

export default CardDaily;
