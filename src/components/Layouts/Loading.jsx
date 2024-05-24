import React, { useState, useEffect } from 'react';
import Logo from '../../assets/icon.png';
import styles from './Loading.module.css';

function Loading() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.DivLoading}>
      <img src={Logo} className={styles.LogoLoading} />
      <p data-testid={'msg'} style={{ opacity }}>Usamos o <a target="_blank" href="https://render.com/">Render</a>. Por isso, o site pode demorar 15 segundos para carregar.</p>
      <p style={{ opacity }}>Mas isso só acontece pela primeira vez!</p>
    </div>
  );
}

export default Loading;