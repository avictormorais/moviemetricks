import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import ProfileInfos from '../components/Sections/ProfileInfos';
import CardsByGenre from '../components/Grids/CardsByGenre';
import styles from './User.module.css';
import { FaUserSlash, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function User() {
  const [tvShows, setTvShows] = useState(null);
  const [movies, setMovies] = useState(null);
  const [comments, setComments] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [notLogged, setNotLogged] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const { username } = useParams();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      setNotLogged(true);
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
          username: username
        }
      };

      api.get(`/api/user/get_profile`, config)
        .then(response => {
          const watchedMedia = response.data.watched_media;
          setIsOwner(response.data.isOwner)
          const moviesList = watchedMedia.filter(item => item.media_type === 'movie');
          const tvShowsList = watchedMedia.filter(item => item.media_type === 'tv');
          setMovies(moviesList);
          setTvShows(tvShowsList);
          api.get(`/api/comment/user/${username}`, config)
            .then(response => {
              setComments(response.data)
              console.log(response.data)
            })
        })
        .catch(error => {
          if (error.response.status == 404) {
            setNotFound(true);
          };
        });
    }
  }, [username]);

  return (
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
        </>
      )}
    </>
  )

}

export default User;