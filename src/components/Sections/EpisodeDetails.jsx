import React, { useEffect, useState } from 'react';
import styles from './EpisodeDetails.module.css';

function EpisodeDetails({ episode }){
  console.log(episode)

  return (
    <div className={styles.divEp}>
      {episode ? (
        <>
          <div className={styles.divPreview}>
            <img src="" alt="" />
          </div>
          <div className={styles.divDetails}>
            <h1 className={styles.EpName}>Nome ep</h1>
            <p className={styles.overview}>Resumo</p>
            <div className={styles.divInfos}></div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default EpisodeDetails;
