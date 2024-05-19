import { FaStar, FaRegStar, FaFlag, FaPen, FaTrash, FaRegFaceAngry, FaRegFaceMeh, FaRegFaceSmile, FaRegFaceSmileBeam, FaRegFaceGrinHearts } from "react-icons/fa6";
import styles from "./Review.module.css";
import api from "../../services/api";
import { Link } from "react-router-dom";

function Review({stars, review, userName, isSpoiler, isOwner, isAdmin, id, handleGetReviews, redirectToContent, mediaType, mediaId}){

  const handleSpoilerClick = (e) => {
    if (isSpoiler) {
      e.target.classList.toggle(styles.Spoiler);
    }
  };

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

    api.put(`/api/comment/${id}`, editedComment, config)
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

    api.delete(`/api/comment/${id}`, config)
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
          {stars === 1 && <FaRegFaceAngry className={styles.IconProfilePic}/>}
          {stars === 2 && <FaRegFaceMeh className={styles.IconProfilePic}/>}
          {stars === 3 && <FaRegFaceSmile className={styles.IconProfilePic}/>}
          {stars === 4 && <FaRegFaceSmileBeam className={styles.IconProfilePic}/>}
          {stars === 5 && <FaRegFaceGrinHearts className={styles.IconProfilePic}/>}
        </div>
        {redirectToContent ? (
          <Link to={`/details/${mediaType}/${mediaId}`} className={styles.LinkProfile}>{userName}</Link>
        ) : (
          <Link to={`/u/${userName}`} className={styles.LinkProfile}>{userName}</Link>
        )}
        <span />
        {Array.from({ length: stars }, (_, index) => (
          <FaStar key={index} className={styles.FiledStar} />
        ))}
        {Array.from({ length: 5 - stars }, (_, index) => (
          <FaRegStar key={index} className={styles.EmptyStar} />
        ))}
        <div className={styles.DivIcons}>
          {(isOwner || isAdmin) && (
            <>
              {/*<FaPen className={styles.IconControls} onClick={handleEditComment}/>*/}
              <FaTrash className={styles.IconControls} onClick={handleDeletePost}/>
            </>
          )}
          <FaFlag className={styles.Flag}/>
        </div>
      </div>
      {isSpoiler ? (
        <p className={styles.Spoiler} onClick={handleSpoilerClick}>
          {review}
        </p>
      ) : (
        <p>{review}</p>
      )}
    </div>
  );

}

export default Review;