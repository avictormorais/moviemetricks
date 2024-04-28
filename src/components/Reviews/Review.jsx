import { FaStar, FaRegStar, FaFlag, FaPen, FaTrash } from "react-icons/fa6";
import styles from "./Review.module.css";

function Review({stars, review, userName, isSpoiler}){

  const handleSpoilerClick = (e) => {
    if (isSpoiler) {
      e.target.classList.toggle(styles.Spoiler);
    }
  };
  
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
        <div className={styles.DivIcons}>
          <FaTrash className={styles.IconControls}/>
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