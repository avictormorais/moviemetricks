import { FaCircleUser, FaDoorOpen, FaPencil } from "react-icons/fa6";
import styles from "./ProfileInfos.module.css";
import { useNavigate } from 'react-router-dom';

function ProfileInfos({ username, tvShows, movies, handleEdit, showEdit, showLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <div className={styles.DivProfileInfos}>
      <FaCircleUser className={styles.IconProfile} />
      <div className={styles.MainDivProfile}>
        <h1>{username}</h1>
        <div className={styles.InfosDiv}>
          <p><span>{tvShows}</span> Séries vistas</p>
          <p><span>{movies}</span> Filmes vistos</p>
        </div>
      </div>
      {showEdit && (
        <>
          <div className={styles.DivEdit} onClick={handleEdit}>
            <span>
              <FaPencil className={styles.IconEdit} />
              <p>Editar</p>
            </span>
          </div>
        </>
      )}
      {showLogout && (
        <div className={styles.DivLogout} onClick={handleLogout}>
          <span>
            <FaDoorOpen className={styles.IconLogout} />
            <p>Sair</p>
          </span>
        </div>
      )}
    </div>
  )

}

export default ProfileInfos;