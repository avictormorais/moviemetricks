import React, { useEffect } from 'react';
import styles from './Profile.module.css';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import ProfileInfos from '../components/Sections/ProfileInfos';
import CardsByGenre from '../components/Grids/CardsByGenre';
import { useState } from 'react';
import Loading from '../components/Layouts/Loading';

function Profile() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState(null);
  const [username, setUsername] = useState(null);
  const [tvShows, setTvShows] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  
  const [novaSenha, setNovaSenha] = useState('');
  const [usernameEdit, setUsernameEdit] = useState('');
  const [email, setEmail] = useState('');
  const handleNovaSenhaChange = (event) => setNovaSenha(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleUsernameChange = (event) => {
    const lowercaseUsername = event.target.value.toLowerCase();
    setUsernameEdit(lowercaseUsername.replace(/\s/g, ''));
  };

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      api.get(`/api/user/profile`, config)
      .then(response => {
        setUsername(response.data.username)
        setUsernameEdit(response.data.username)
        setEmail(response.data.email)
        api.get(`/api/comment/user/${response.data.username}`, config)
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

  const handleEdit = () => {
    setShowEdit(!showEdit);
  }

  const handleSendEdit = () => {

    if(novaSenha) {
      if (novaSenha.length < 6) {
        document.querySelector(`.${styles.pError}`).style.display = 'block';
        document.querySelector(`.${styles.pError}`).innerHTML = 'A senha deve ter no mínimo 6 caracteres.';
        return;
      }
    }

    if(!usernameEdit){
      document.querySelector(`.${styles.pError}`).style.display = 'block';
      document.querySelector(`.${styles.pError}`).innerHTML = 'Por favor, insira um nome de usuário.';
      return;
    }

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1){
      document.querySelector(`.${styles.pError}`).style.display = 'block';
      document.querySelector(`.${styles.pError}`).innerHTML = 'Por favor, insira um email válido.';
      return;
    }

    const config = {
      headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    };

    const data = new FormData();
    data.append('new_password', novaSenha);
    data.append('username', usernameEdit);
    data.append('email', email);

    api.put(`/api/user/profile`, data, config)
    .then(response => {
      console.log(response.data)
      window.location.reload();
    })
    .catch(error => {
      if(error.response.status === 401){
        document.querySelector(`.${styles.pError}`).style.display = 'block';
        document.querySelector(`.${styles.pError}`).innerHTML = 'Email já em uso.';
        return;
      } if(error.response.status === 400){
        document.querySelector(`.${styles.pError}`).style.display = 'block';
        document.querySelector(`.${styles.pError}`).innerHTML = 'User já em uso.';
        return;
      }
    });

  }

  return (
    <div>
      {movies && tvShows && username ? (
        <>
          <ProfileInfos username={username} tvShows={tvShows.length} movies={movies.length} handleEdit={handleEdit} />
          {showEdit && (
            <>
              <h1 className={styles.EditTitle}>Editar perfil</h1>
              <div className={styles.DivEdit}>
                <div className={styles.divInput}>
                  <p>Nova senha</p>
                  <input
                    type="password"
                    placeholder="Senha"
                    value={novaSenha}
                    onChange={handleNovaSenhaChange}
                  />
                </div>
                <div className={styles.divInput}>
                  <p>Usuário</p>
                  <input
                        type="text"
                        placeholder="Nome de usuário"
                        value={usernameEdit}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className={styles.divInput}>
                  <p>Email</p>
                    <input
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                </div>
              </div>
              <div className={styles.ActionsEdit}>
                <button type="submit" onClick={handleSendEdit}>Editar</button>
                <p className={styles.pError}>Senha inválida.</p>
              </div>
            </>
          )}
          <CardsByGenre title={"Séries vistas"} type={"tv"} showGenres={false} list={tvShows}/>
          <CardsByGenre title={"Filmes vistos"} type={"tv"} showGenres={false} list={movies}/>
        </>
      ) : (
        <Loading/>
      )}
    </div>
  );
}

export default Profile;