import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Person.module.css';
import { FaStar, FaUserSlash, FaCalendarDay, FaFacebookF, FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { FaGlobeAmericas } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import api from '../services/api';
import Loading from '../components/Layouts/Loading';
import CardsByGenre from '../components/Grids/CardsByGenre';
import noImage from '../assets/SI.png';

function Person() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [tvShows, setTvShows] = useState(null);
  const [movies, setMovies] = useState(null);
  const [tvCrew, setTvCrew] = useState(null);
  const [movieCrew, setMovieCrew] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api.get(`/tmdb/person?&id=${id}`)
      .then(response => {
        setContent(response.data.person);
        let tvs = 0
        let movies = 0
        response.data.person.combined_credits.cast.forEach(work => {
          if (work.media_type == 'movie') {
            movies += 1;
          } else {
            tvs += 1;
          }
        });
        setMovies(movies);
        setTvShows(tvs);

        let tvsCrew = 0
        let moviesCrew = 0
        response.data.person.combined_credits.crew.forEach(work => {
          if (work.media_type == 'movie') {
            moviesCrew += 1;
          } else {
            tvsCrew += 1;
          }
        });
        setMovieCrew(moviesCrew);
        setTvCrew(tvsCrew);
        setLoaded(true);
      })
      .catch(error => {
        setLoaded(true);
        console.log(error);
      });

  }, [id]);

  return (
    <>
      {loaded ? (
        <>
          {content ? (
            <div>
              <div className={styles.divInfosPerson}>
                <img src={`https://image.tmdb.org/t/p/w300/${content.profile_path}` || noImage} alt="" />
                <div className={styles.divInfos}>
                  <h1>{content.name}</h1>
                  {/*<h2>@user</h2>*/}
                  {content.place_of_birth && (
                    <span>
                      <FaGlobeAmericas className={styles.localIcon} />
                      <h3 className={styles.local}>{content.place_of_birth}</h3>
                    </span>
                  )}
                  <div className={styles.divListInfos}>

                    {(content.birthday || content.deathday) && (
                      <div className={styles.divInfo}>
                        <h3 className={styles.titleInfo}>Datas</h3>
                        {content.birthday && (
                          <span className={styles.spanInfo}>
                            <FaCalendarDay className={styles.iconInfo} />
                            <h4>{new Date(content.birthday).toLocaleDateString('pt-BR')}</h4>
                          </span>
                        )}
                        {content.deathday && (
                          <span className={styles.spanInfo}>
                            <FaStar className={styles.iconInfo} />
                            <h4>{new Date(content.deathday).toLocaleDateString('pt-BR')}</h4>
                          </span>

                        )}
                      </div>
                    )}

                    {content.external_ids.facebook_id || content.external_ids.instagram_id || content.external_ids.tiktok_id || content.external_ids.twitter_id || content.external_ids.youtube_id ? (
                      <div className={styles.divInfo}>
                        <h3 className={styles.titleInfo}>Redes sociais</h3>
                        <span className={styles.spanInfo}>
                          {content.external_ids.facebook_id && <a target='_blank' href={`https://facebook.com/${content.external_ids.facebook_id}`} className={styles.iconSocialMedia}><FaFacebookF /></a>}
                          {content.external_ids.instagram_id && <a target='_blank' href={`https://instagram.com/${content.external_ids.instagram_id}`} className={styles.iconSocialMedia}><FaInstagram /></a>}
                          {content.external_ids.tiktok_id && <a target='_blank' href={`https://tiktok.com/@${content.external_ids.tiktok_id}`} className={styles.iconSocialMedia}><FaTiktok /></a>}
                          {content.external_ids.twitter_id && <a target='_blank' href={`https://x.com/${content.external_ids.twitter_id}`} className={styles.iconSocialMedia}><FaXTwitter /></a>}
                          {content.external_ids.youtube_id && <a target='_blank' href={`https://youtube.com/${content.external_ids.youtube_id}`} className={styles.youtube_id}><FaYoutube /></a>}
                        </span>
                      </div>
                    ) : null}

                    {tvShows || movies ? (
                      <div className={styles.divInfo}>
                        <h3 className={styles.titleInfo}>Atuou em</h3>
                        {tvShows ? (
                          <span className={styles.spanInfo}>
                            <h4>{tvShows} Séries</h4>
                          </span>
                        ) : null}
                        {movies ? (
                          <span className={styles.spanInfo}>
                            <h4>{movies} Filmes</h4>
                          </span>
                        ) : null}
                      </div>
                    ) : null}

                    {tvCrew || movieCrew ? (
                      <div className={styles.divInfo}>
                        <h3 className={styles.titleInfo}>Trabalhou em</h3>
                        {tvCrew ? (
                          <span className={styles.spanInfo}>
                            <h4>{tvCrew} Séries</h4>
                          </span>
                        ) : null}
                        {movieCrew ? (
                          <span className={styles.spanInfo}>
                            <h4>{movieCrew} Filmes</h4>
                          </span>
                        ) : null}
                      </div>
                    ) : null}

                  </div>
                </div>
              </div>

              {content.biography && (
                <p className={styles.biography}>{content.biography}</p>
              )}


              {tvShows || movies ? (
                <CardsByGenre title={"Atuou em"} type={"movie"} showGenres={false} list={content.combined_credits.cast} />
              ) : null}

              {tvCrew || movieCrew ? (
                <CardsByGenre title={"Trabalhou em"} type={"movie"} showGenres={false} list={content.combined_credits.crew} />
              ) : null}

            </div >
          ) : (
            <div className={styles.notFound}>
              <FaUserSlash />
              <h1>Pessoa não encontrada.</h1>
            </div>
          )}
        </>
      ) : <Loading />}
    </>
  );
}

export default Person;
