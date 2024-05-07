import styles from './CardReviews.module.css';
import { FaComments } from "react-icons/fa6";
import Review from "./Review";
import { FaStar, FaRegStar } from "react-icons/fa6";
import api from "../../services/api";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CardReviews({ id, type }){
  const [review, setReview] = useState("");
  const [userId, setUserId] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isSpoiler, setIsSpoiler] = useState(false);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    };

    api.get(`/api/user_id`, config)
      .then(response => {
        setUserId(response.data.userId);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const navigate = useNavigate();

  const handleCancel = () => {
    setReview("");
    setRating(0);
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleGetReviews = () => {
    api.get(`/api/comment/${type}/${id}`)
      .then(response => {
        setReviews(response.data.comments);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleGetReviews();
  }, [type, id]);
  
  const handleSendReview = () => {
    if (!localStorage.getItem('accessToken')) {
      return navigate('/login');;
    }

    document.querySelector(`.${styles.pError}`).style.display = 'none';
    
    if(!review || rating === 0){
      document.querySelector(`.${styles.pError}`).style.display = 'block';
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    };
  
    api.get(`/api/user_name`, config)
      .then(response => {
      let username = response.data.user;
      const newReview = {
        review: review,
        stars: rating,
        username: username,
        is_spoiler: isSpoiler,
        media_type: type,
        media_id: id,
      };
      api.post('/api/comment', newReview, config)
        .then(response => {
          setReview("");
          setRating(0);
          setIsSpoiler(false);
          handleGetReviews();
        })
        .catch(error => {
          console.log(error);
          });
      })
      .catch(error => {
      console.log(error);
      });
  };  

  const handleSpoilerChange = (e) => {
    setIsSpoiler(e.target.checked);
  };
  
  return(
    <div className={styles.CardReviews}>
    <h2>Avaliações</h2>
    <div className={styles.DivReviews}>
      {reviews.length > 0 && userId ? (
        reviews.map((review) => (
          <Review key={`${review.username}_${review.review}`} id={review._id} handleGetReviews={handleGetReviews} isOwner={userId === review.user_id} userName={review.username} review={review.review} isSpoiler={review.is_spoiler} stars={review.stars} />
        ))
      ) : (
        <div className={styles.DivNoComments}>
          <FaComments />
          <h2>Nenhuma avaliação.</h2>
        </div>
      )}
    </div>
    <input type="text" placeholder="Adicione uma avaliação" value={review} onChange={(e) => setReview(e.target.value)} />
    <hr/>
    <div className={styles.DivStars}>
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} onClick={() => handleStarClick(star)} className={star <= rating ? styles.StarFilled : ""}>
        {star <= rating ? <FaStar/> : <FaRegStar/>}
      </span>
    ))}
    <p>Marque sua avaliação!</p>
    </div>
    <div className={styles.DivAddReview}>
      <input type="checkbox" id='isSpoiler' checked={isSpoiler} onChange={handleSpoilerChange} />
      <label htmlFor="isSpoiler">Spoiler</label>
      <span/>
      <p className={styles.pError} style={{display: 'none'}}>Escreva a avaliação e avalie de 1 a 5</p>
      {review && <button className={styles.BtnCancel} onClick={handleCancel}>Cancelar</button>}
      <button className={styles.BtnSend} onClick={handleSendReview}>Enviar</button>
    </div>
    </div>
  )
}

export default CardReviews;
