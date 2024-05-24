import { FaStar, FaRegStar, FaFlag, FaPen, FaTrash, FaRegFaceAngry, FaRegFaceMeh, FaRegFaceSmile, FaRegFaceSmileBeam, FaRegFaceGrinHearts, FaMasksTheater } from "react-icons/fa6";
import styles from "./Review.module.css";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { useState } from "react";

function Review({ handleGetReviews, content, isOwner, isAdmin, redirectToContent }) {
  const [personId, setPersonId] = useState(null);

  const handleSpoilerClick = (e) => {
    if (isSpoiler) {
      e.target.classList.toggle(styles.Spoiler);
    }
  };

  if (content.userRole === 'person') {
    if (localStorage.getItem('accessToken')) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      };

      api.get(`/api/personByUser/${content.username}`, config)
        .then(response => {
          if (response.data.personId) {
            setPersonId(response.data.personId)
          }
        })
    }
  }

  const handleEditComment = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    };

    const editedComment = {
      review: 'Comentário editado.',
      stars: '1',
      is_spoiler: false,
    };

    api.put(`/api/comment/${content._id}`, editedComment, config)
      .then(response => {
        handleGetReviews();
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleDeletePost = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    };

    api.delete(`/api/comment/${content._id}`, config)
      .then(response => {
        handleGetReviews();
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className={styles.Review}>
      <div className={styles.DivInfosReview}>
        <div className={styles.divProfilePic}>
          {content.stars === 1 && <FaRegFaceAngry className={styles.IconProfilePic} />}
          {content.stars === 2 && <FaRegFaceMeh className={styles.IconProfilePic} />}
          {content.stars === 3 && <FaRegFaceSmile className={styles.IconProfilePic} />}
          {content.stars === 4 && <FaRegFaceSmileBeam className={styles.IconProfilePic} />}
          {content.stars === 5 && <FaRegFaceGrinHearts className={styles.IconProfilePic} />}
        </div>
        {redirectToContent ? (
          <Link to={`/details/${content.media_type}/${content.media_id}`} className={styles.LinkProfile}>{content.title}</Link>
        ) : (
          <>
            {personId ? (
              <Link to={`/person/${personId}`} className={styles.LinkProfile}>{content.username}</Link>
            ) : (
              <Link to={`/u/${content.username}`} className={styles.LinkProfile}>{content.username}</Link>
            )}
          </>
        )}
        {content.userRole && !redirectToContent && (
          <>
            {content.userRole === 'person' && (
              <FaMasksTheater className={styles.IconRole} title="ator/atriz" />
            )}
            {content.userRole === 'admin' && (
              <FaRegStar className={styles.IconRole} title="ADM"/>
            )}
          </>
        )}
        <span />
        {Array.from({ length: content.stars }, (_, index) => (
          <FaStar key={index} className={styles.FiledStar} />
        ))}
        {Array.from({ length: 5 - content.stars }, (_, index) => (
          <FaRegStar key={index} className={styles.EmptyStar} />
        ))}
        <div className={styles.DivIcons}>
          {(isOwner || isAdmin) && (
            <>
              {/*<FaPen className={styles.IconControls} onClick={handleEditComment}/>*/}
              <FaTrash className={styles.IconControls} onClick={handleDeletePost} />
            </>
          )}
          <FaFlag className={styles.Flag} />
        </div>
      </div>
      {content.is_spoiler ? (
        <p className={styles.Spoiler} data-testid='review' onClick={handleSpoilerClick}>
          {content.review}
        </p>
      ) : (
        <p data-testid='review'>{content.review}</p>
      )}
    </div>
  );

}

export default Review;