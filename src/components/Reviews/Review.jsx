import { FaStar, FaRegStar, FaFlag, FaPen, FaTrash } from "react-icons/fa6";
import styles from "./Review.module.css";
import api from "../../services/api";

function Review({stars, review, userName, isSpoiler, isOwner, id, handleGetReviews}){

  const handleSpoilerClick = (e) => {
    if (isSpoiler) {
      e.target.classList.toggle(styles.Spoiler);
    }
  };

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
        <h1>{userName}</h1>
        <span />
        {Array.from({ length: stars }, (_, index) => (
          <FaStar key={index} className={styles.FiledStar} />
        ))}
        {Array.from({ length: 5 - stars }, (_, index) => (
          <FaRegStar key={index} className={styles.EmptyStar} />
        ))}
        {}
        <div className={styles.DivIcons}>
          {isOwner && (
            <FaTrash className={styles.IconControls} onClick={handleDeletePost}/>
          )}
          {/*<FaPen className={styles.IconControls}/>*/}
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