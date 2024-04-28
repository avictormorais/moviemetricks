import styles from './Person.module.css';
import { Link } from 'react-router-dom';

function Person({ name, image, id }) {
  return (
    <Link to={`/person/${id}`} key={id} className={styles.DivPessoa}>
      <img src={`https://image.tmdb.org/t/p/w100_and_h100_face${image}`} />
      <h1>{name}</h1>
    </Link>
  );
}

export default Person;
