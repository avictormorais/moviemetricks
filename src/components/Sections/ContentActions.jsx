import styles from './ContentActions.module.css';
import { FaRegEye, FaRegEyeSlash, FaEllipsisVertical, FaVideo } from "react-icons/fa6";
import api from '../../services/api';
import { useEffect, useState } from 'react';
import ModalPlaylists from '../ModalPlaylists';
import { IoNotificationsOutline, IoNotificationsSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

function ContentActions({tipo, id, onTrailerCLick}){
  const [seen, setSeen] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [notification, setNotification] = useState(false);
  const [showNotificationOptions, setShowNotificationOptions] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  };

  api.get(`/api/notification/${tipo == 'tv' ? 'series' : 'movie'}?id=${id}`, config)
    .then(response => {
      setNotification(response.data.notification_enabled)
    })
    .catch(error => {
      console.log(error);
    });

  api.get(`/api/user/media/seen?type=${tipo}&id=${id}`, config)
    .then(response => {
      setSeen(response.data.seen)
    })
    .catch(error => {
      console.log(error);
    });

    const handleClickMore = () => {
      setOpenModal(!openModal);
    };    

  const handleMarkAsSeen = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    };

    api.get(`/api/user/media/seen?type=${tipo}&id=${id}`, config)
      .then(response => {
        setSeen(response.data.seen)
        if (response.data.seen) {
          api.delete('/api/user/watched', {
            data: {
              tmdb_id: id,
              media_type: tipo
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          })
            .then(response => {
              document.querySelector(`.${styles.MarkAsSeen}`).textContent = 'Marcar como visto';
            })
            .catch(error => {
              console.error(error);
            });
          } else {
            api.post('/api/user/watched', {
              tmdb_id: id,
              media_type: tipo
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
              }
            })
              .then(response => {
                document.querySelector(`.${styles.MarkAsSeen}`).textContent = 'Visto';
              })
              .catch(error => {
                console.error(error);
              });
          }
      })
      .catch(error => {
        console.log(error);
      });

  }

  const handleShowNotificationOptions = () => {
    setShowNotificationOptions(!showNotificationOptions);
  }

  const handleNotification = (useEmail) => {
    handleShowNotificationOptions()
    const contentNotification = {
      id: id,
      send_email: useEmail
    };
  
    if(notification){
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        data: {
          id: id
        }
      };

      api.delete(`/api/notification/${tipo == 'tv' ? 'series' : 'movie'}`, config)
      .then(response => {
        setNotification(false)
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      api.post(`/api/notification/${tipo == 'tv' ? 'series' : 'movie'}`, contentNotification, config)
        .then(response => {
          setNotification(true)
        })
        .catch(error => {
          setNotification(false)
          console.error(error)
        });
    }
}

  return(
    <div className={styles.DivContentActions}>
      <div className={styles.DivTrailer} onClick={onTrailerCLick}>
        <FaVideo className={styles.IconVideo}/>
        <h2>Ver trailer</h2>
      </div>
      {seen ? <h2 className={styles.MarkAsSeen} onClick={handleMarkAsSeen}>Visto</h2> : <h2 className={styles.MarkAsSeen} onClick={handleMarkAsSeen}>Marcar como visto</h2>}
      {seen ? <FaRegEye data-testid="eye-icon" className={styles.Eye} onClick={handleMarkAsSeen}/> : <FaRegEyeSlash data-testid="eye-icon" className={styles.Eye} onClick={handleMarkAsSeen}/>}
      {notification ? (
        <IoNotificationsSharp onClick={() => { handleNotification(); setShowNotificationOptions(false); }} className={styles.notificationIcon}/>
      ) : (
        <IoNotificationsOutline onClick={handleShowNotificationOptions} className={styles.notificationIcon}/>
      )}
      <div className={styles.divOptionsNotification} style={{display: showNotificationOptions ? 'flex' : 'none'}}>
        <p>Opções notificação</p>
        <div  onClick={() => handleNotification(true)} className={styles.optionNotification}>
          <MdEmail/>
          <h2>Notificar também por email</h2>
        </div>
        <div  onClick={() => handleNotification(false)} className={styles.optionNotification}>
          <IoNotificationsSharp/>
          <h2>Apenas no Moviemetricks</h2>
        </div>
      </div>
      <FaEllipsisVertical className={styles.Ellipsis} onClick={handleClickMore} />
      <ModalPlaylists isOpen={openModal} setOpenModal={() => setOpenModal(!openModal)} idContent={id} tipo={tipo}/>
    </div>
  )

}

export default ContentActions;