import styles from './WhereToWatch.module.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';

function WhereToWatch({ id, tipo, region }){
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    api.get(`/tmdb/watch_providers?tipo=${tipo}&id=${id}`)
      .then(response => {
        setProviders(response.data.providers.results[region]);
      })
  }, [tipo, id]);

  return (
    providers && (
      <section className={styles.SectionWhereToWatch}>
        <h2>Onde assistir</h2>
        <div className={styles.GridInfos}>
          {providers.flatrate && (
            <div className={styles.DivInfo}>
              <h3>Streaming</h3>
              <div className={styles.DivProviders}>
                {providers.flatrate.map(provider => (
                  <img key={provider.id} src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt={provider.provider_name} />
                ))}
              </div>
            </div>
         )}
          {providers.free && (
            <div className={styles.DivInfo}>
              <h3>Grátis</h3>
              <div className={styles.DivProviders}>
                {providers.free.map(provider => (
                  <img key={provider.id} src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt={provider.provider_name} />
                ))}
              </div>
            </div>
          )}
          {providers.ads && (
            <div className={styles.DivInfo}>
              <h3>Propaganda</h3>
              <div className={styles.DivProviders}>
                {providers.ads.map(provider => (
                  <img key={provider.id} src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt={provider.provider_name} />
                ))}
              </div>
            </div>
          )}
          {providers.buy && (
            <div className={styles.DivInfo}>
              <h3>Comprar</h3>
              <div className={styles.DivProviders}>
                {providers.buy.map(provider => (
                  <img key={provider.id} src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt={provider.provider_name} />
                ))}
              </div>
            </div>
          )}
          {providers.rent && (
            <div className={styles.DivInfo}>
              <h3>Alugar</h3>
              <div className={styles.DivProviders}>
                {providers.rent.map(provider => (
                  <img key={provider.id} src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt={provider.provider_name} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    )
  );
}

export default WhereToWatch;
