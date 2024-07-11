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
    </div>
  );
}

export default Loading;