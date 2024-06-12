import React from "react";
import styles from "./ModalPlaylists.module.css";
import { MdClose } from "react-icons/md";
import { RiPlayListAddFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import api from "../services/api";
import { FaTrash } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

const ModalPlaylists = ({ isOpen, setOpenModal, idContent, tipo }) => {
  const [playlists, setPlaylists] = useState([{}]);
  const [newPlaylist, setNewPlaylist] = useState("");

  const handleDeletePlaylist = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    api
      .delete(`/api/playlists/${id}/delete`, config)
      .then((response) => {
        console.log(response);
        loadPlaylists();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCreatePlaylist = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    console.log(newPlaylist);

    const data = {
      name: newPlaylist,
    };

    api
      .post(`/api/playlists/create`, data, config)
      .then((response) => {
        loadPlaylists();
        setNewPlaylist("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddToPlaylist = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    const data = {
      tmdb_id: idContent,
      media_type: tipo,
    };

    api
      .post(`/api/playlists/${id}/add`, data, config)
      .then((response) => {
        console.log(response);
        setOpenModal();
      })
      .catch((error) => {
        console.log(error);
      });

    setOpenModal();
  };

  const handleRemoveFromPlaylist = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'application/json',
      },
      data: {
        tmdb_id: idContent,
        media_type: tipo,
      },
    };
  
    api
      .delete(`/api/playlists/${id}/remove`, config)
      .then((response) => {
        console.log(response);
        setOpenModal();
      })
      .catch((error) => {
        console.log(error);
      });
  
    setOpenModal();
  }
  

  const loadPlaylists = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    api.get(`/api/data_user`, config).then((response) => {
      api
        .get(`/api/playlists/user/${response.data._id}`, config)
        .then((response) => {
          setPlaylists(response.data);
        });
    });
  };

  useEffect(() => {
    if (isOpen) {
      loadPlaylists();
    }
  }, [isOpen]);

  if (isOpen) {
    return (
      <div className={styles.backgroundModal}>
        <div className={styles.modalDiv}>
          <div className={styles.divTopModal}>
            <h1>Adicionar a playlist</h1>
            <MdClose onClick={setOpenModal} />
          </div>

          {playlists.length === 0 && (
            <div className={styles.divNoPlaylist}>
              <RiPlayListAddFill />
              <p>Nenhuma playlist!</p>
            </div>
          )}

          {playlists.map((playlist) => {
            return (
              <div className={styles.divPlaylist}>
                {playlist.media && playlist.media.some(item => item.tmdb_id === idContent && item.media_type === tipo) ? (
                  <p onClick={() => handleRemoveFromPlaylist(playlist._id)}>
                    {playlist.name}
                  </p>
                ) : (
                  <p onClick={() => handleAddToPlaylist(playlist._id)}>
                    {playlist.name}
                  </p>
                )}
                {playlist.media && playlist.media.some(item => item.tmdb_id === idContent && item.media_type === tipo) && (
                  <FaRegCheckCircle className={styles.alreadyInList}/>
                )}
                <FaTrash onClick={() => handleDeletePlaylist(playlist._id)} className={styles.deleteIcon}/>
              </div>
            );
          })}

          <div className={styles.divCreatePlaylist}>
            <input
              type="text"
              placeholder="Nome playlist"
              value={newPlaylist}
              onChange={(e) => setNewPlaylist(e.target.value)}
            />
            <button onClick={handleCreatePlaylist}>Criar</button>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalPlaylists;
