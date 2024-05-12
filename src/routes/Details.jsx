import React from 'react';
import { useParams } from 'react-router-dom';
import CardTrendVid from '../components/Cards/CardTrendVid';
import CardTrend from '../components/Cards/CardTrend';
import { useEffect, useState } from 'react';
import styles from './Details.module.css';
import api from '../services/api';
import CardsSeasons from '../components/Grids/CardsSeasons';
import CardReviews from '../components/Reviews/CardReviews';
import Person from '../components/Person';
import SectionMoreInfo from '../components/Sections/SectionMoreInfo';
import WhereToWatch from '../components/Sections/WhereToWatch';
import ContentActions from '../components/Sections/ContentActions';
import Loading from '../components/Layouts/Loading';

function Details() {
  const [content, setContent] = useState(null);
  const { tipo, id } = useParams();

  const [trailer, setTrailer] = useState(null);

  function getTrailer(){
    return api.get(`/tmdb/trailer?tipo=${tipo}&id=${id}`)
    .then(response => {
      setTrailer(response.data.trailer_key);
    })
    .catch(error => {
        console.log(error);
    });
  }

  useEffect(() => {
    api.get(`/tmdb/details?tipo=${tipo}&id=${id}`)
      .then(response => {
          setContent(response.data.trend);
      })
      .catch(error => {
          console.log(error);
      });

  }, [tipo, id]);

  return (
    <>
      {content && (
        <>
          {trailer && (
            <div>
              <div style={{display: "none"}}>
                <CardTrend id={id} tipo={tipo} isDetails={true} />
              </div>
              <CardTrendVid id={id} tipo={tipo} idVideo={trailer} isDetails={true} />
            </div>
          )}
          {!trailer && <CardTrend id={id} tipo={tipo} isDetails={true} />}
          {content.overview && (
            <p className={styles.Overview}>{content.overview}</p>
          )}
          <ContentActions tipo={tipo} id={id} onTrailerCLick={getTrailer}/>
          {content && (tipo === 'serie' ? content.aggregate_credits : content.credits) && (tipo === 'serie' ? content.aggregate_credits : content.credits).cast.slice(0, 20)
          .some(person => person.profile_path !== null) && (
            <div className={styles.Pessoas}>
              <h4>Elenco</h4>
              <div className={styles.DivPessoas}>
                  {content && (tipo === 'serie' ? content.aggregate_credits : content.credits) && (tipo === 'serie' ? content.aggregate_credits : content.credits).cast
                      .filter(person => person.profile_path !== null)
                      .slice(0, 20)
                      .map(person => (
                          <Person key={person.id} name={person.name} id={person.id} image={person.profile_path}/>
                      ))}
              </div>
            </div>
          )}
          {tipo === 'tv' && content && (
            <CardsSeasons temporadas={content.seasons} id={id} />
          )}
          {tipo && id && <CardReviews type={tipo} id={id} />}
          <WhereToWatch id={id} tipo={tipo} region={'BR'}/>
          <SectionMoreInfo content={content} />
        </>
      )}
      {!content && <Loading/>}
    </>
  );
}

export default Details;
