import React, { useEffect } from 'react';
import styles from './Profile.module.css';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import ProfileInfos from '../components/Sections/ProfileInfos';
import CardsByGenre from '../components/Grids/CardsByGenre';
import { useState } from 'react';

function Profile() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [username, setUsername] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      api.get(`/api/user_name`, config)
      .then(response => {
        setUsername(response.data.user)
        api.get(`/api/comment/user/${response.data.user}`, config)
        .then(response => {
          console.log(response.data)
        })
      })

      api.get(`/api/user/watched`, config)
        .then(response => {
          const watchedMedia = response.data.watched_media;
          const moviesList = watchedMedia.filter(item => item.media_type === 'movie');
          const tvShowsList = watchedMedia.filter(item => item.media_type === 'tv');
          setMovies(moviesList);
          setTvShows(tvShowsList);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [navigate]);

  return (
    <div>
      {movies && tvShows && username && (
        <ProfileInfos username={username} tvShows={tvShows.length} movies={movies.length} />
      )}
      {tvShows.length != 0 && (
        <CardsByGenre title={"Séries vistas"} type={"tv"} showGenres={false} list={tvShows}/>
      )}
      {movies.length != 0 && (
        <CardsByGenre title={"Filmes vistos"} type={"tv"} showGenres={false} list={movies}/>
      )}
    </div>
  );
}

export default Profile;