import styles from './SectionMoreInfo.module.css';
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function SectionMoreInfo({content}){

  const statusMap = {
    'Rumored': 'Rumores',
    'Planned': 'Planejado',
    'In Production': 'Em produção',
    'Post Production': 'Pós-produção',
    'Released': 'Lançado',
    'Canceled': 'Cancelado',
    'Returning Series': 'Em andamento',
    'Ended': 'Finalizado'
  };

  function getStatusTranslation(status) {
    return statusMap[status] || status;
  }

  return(
    <section className={styles.SectionMoreInfo}>
      <h2>Mais informações</h2>
      {content && (
        <div className={styles.GridInfos}>
        {content.external_ids.facebook_id || content.external_ids.instagram_id || content.external_ids.twitter_id ? (
          <div className={styles.DivInfo}>
            <h3>Redes sociais</h3>
            <div className={styles.InfoContent}>
              {content.external_ids.facebook_id && <a target='_blank' href={`https://facebook.com/${content.external_ids.facebook_id}`}><FaFacebook/></a>}
              {content.external_ids.instagram_id && <a target='_blank' href={`https://instagram.com/${content.external_ids.instagram_id}`}><FaInstagram/></a>}
              {content.external_ids.twitter_id && <a target='_blank' href={`https://twitter.com/${content.external_ids.twitter_id}`}><FaXTwitter/></a>}
            </div>
          </div>
        ) : null}
        {(content.networks && content.networks[0] && content.networks[0].logo_path) || (content.production_companies && content.production_companies[0] && content.production_companies[0].logo_path) ? (
          <div className={styles.DivInfo}>
            <h3>Produtora</h3>
            <div className={styles.InfoContent}>
              <img src={`https://image.tmdb.org/t/p/w300_filter(negate,000,666)/${content.networks ? content.networks[0].logo_path : content.production_companies[0].logo_path}`} alt="" />
            </div>
          </div>
        ) : null}
        {content.status && (
          <div className={styles.DivInfo}>
            <h3>Situação</h3>
            <div className={styles.InfoContent}>
              <h4>{getStatusTranslation(content.status)}</h4>
            </div>
            </div>
        )}
        {content.created_by && content.created_by[0] && (
          <div className={styles.DivInfo}>
            <h3>Criado por</h3>
            <div className={styles.InfoContent}>
              <Link to={`/person/${content.created_by[0].id}`}><h4>{content.created_by[0].name}</h4></Link>
            </div>
         </div>
        )}
       </div>
   )}
    </section>
  )

}

export default SectionMoreInfo;