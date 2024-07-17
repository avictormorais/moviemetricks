import React, { useEffect, useState } from "react";
import styles from "./MovieCard.module.css";
import { BsClockHistory } from "react-icons/bs";
import { LuPartyPopper } from "react-icons/lu";
import api from "../../../services/api";

function MovieCard({ id }) {
  const [releaseDate, setReleaseDate] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(null);
  const currentDate = new Date();

  useEffect(() => {
    api.get(`/tmdb/release_date?id=${id}`)
      .then((response) => {
        const movieReleaseDate = new Date(response.data.release_dates);
        setReleaseDate(movieReleaseDate);

        const differenceInTime = movieReleaseDate.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        setDaysRemaining(differenceInDays);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!releaseDate) {
    return null;
  } else if (currentDate >= releaseDate) {
    return null;
  } else {
    if (daysRemaining == 0) {
      return (
        <div className={styles.cardMovie}>
          <>
            <LuPartyPopper />
            <div>
              <h1>Hoje é o lançamento!</h1>
              <p>Finalmente! agora você pode assistir este filme.</p>
            </div>
          </>
        </div>
      );
    } else {
      return (
        <div className={styles.cardMovie}>
          <>
            <BsClockHistory />
            <div>
              <h1>
                Faltam <span>{daysRemaining}</span> dias!
              </h1>
              <p>Este filme será lançado em breve.</p>
              <p>Ative a notificação para ser alertado da estreia.</p>
            </div>
          </>
        </div>
      );
    }
  }
}

export default MovieCard;
