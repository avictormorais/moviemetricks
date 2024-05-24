import React from 'react';
import { redirect, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import ProfileInfos from '../components/Sections/ProfileInfos';
import CardsByGenre from '../components/Grids/CardsByGenre';
import styles from './User.module.css';
import { FaUserSlash, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loading from '../components/Layouts/Loading';
import Review from '../components/Reviews/Review';

function User() {
  const [tvShows, setTvShows] = useState(null);
  const [movies, setMovies] = useState(null);
  const [comments, setComments] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [notLogged, setNotLogged] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      setNotLogged(true);
      setLoaded(true)
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
          username: username
        }
      };

      api.get(`/api/personByUser/${username}`)
        .then(response => {
          if (response.data.personId) {
            console.log(response.data.personId)
            navigate(`/person/${response.data.personId}`)
          }
        })
        .catch(error => {
          console.log(error.response)
        })

      api.get(`/api/user/get_profile`, config)
        .then(response => {
          const watchedMedia = response.data.watched_media;
          setIsOwner(response.data.isOwner)
          const moviesList = watchedMedia.filter(item => item.media_type === 'movie');
          const tvShowsList = watchedMedia.filter(item => item.media_type === 'tv');
          setLoaded(true)
          setMovies(moviesList);
          setTvShows(tvShowsList);
          api.get(`/api/comment/user/${username}`, config)
            .then(response => {
              setComments(response.data.comments.reverse())
              console.log(response.data)
            })
        })
        .catch(error => {
          if (error.response.status == 404) {
            setLoaded(true)
            setNotFound(true);
          };
        });
    }
  }, [username]);

  return (
    loaded ? (
      <>
        {notLogged && (
          <div className={styles.notLogged}>
            <FaKey />
            <h1>Você precisa estar logado para acessar essa página.</h1>
            <Link to="/login">Fazer login.</Link>
          </div>
        )}
        {notFound && (
          <div className={styles.notFound}>
            <FaUserSlash />
            <h1>Usuário não encontrado.</h1>
          </div>
        )}
        {movies && tvShows && comments && (
          <>
            <ProfileInfos username={username} tvShows={tvShows.length} movies={movies.length} showEdit={false} showLogout={isOwner} />
            {tvShows.length > 0 && (
              <CardsByGenre title={"Séries vistas"} type={"tv"} showGenres={false} list={tvShows} />
            )}
            {movies.length > 0 && (
              <CardsByGenre title={"Filmes vistos"} type={"tv"} showGenres={false} list={movies} />)
            }
            <div className={styles.divReviews}>
              <h1>Avaliações</h1>
              <div>
                {comments.map((comment) => (
                  <Review
                    key={`${comment.username}_${comment.review}`}
                    content={comment}
                    redirectToContent={true}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </>
    ) : (
      <Loading />
    )
  )
}

export default User;