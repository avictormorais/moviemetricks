import { useState } from 'react';
import logo from '../../assets/icon.png';
import styles from './Footer.module.css';
import { FaT } from 'react-icons/fa6';

function Footer() {
    const [isThemeListVisible, setIsThemeListVisible] = useState(false);

    const toggleThemeList = () => {
        setIsThemeListVisible(!isThemeListVisible);
    };

    const handleThemeChange = (themeName) => {
        toggleThemeList();
        document.body.setAttribute('data-theme', themeName);
    };

    return (
        <footer>
            <img src={logo} alt="" />
            <div>
                <h2>MovieMetricks</h2>
                <p>&copy; 2024 MovieMetricks</p>
            </div>
            <span></span>
            <div>
                <h3>Sobre</h3>
                <h3>Github</h3>
            </div>
            <div className={styles.DivTemas}>
                <div className={styles.ThemeList} style={{ display: isThemeListVisible ? 'flex' : 'none' }}>
                    <div className={styles.Theme} onClick={() => handleThemeChange('carmesin')}>
                        <div className={styles.ThemePreview} style={{ backgroundColor: '#1f0c19' }}>
                            <FaT style={{ fill: 'white' }} />
                        </div>
                        <p>Carmesin</p>
                    </div>
                    <div className={styles.Theme} onClick={() => handleThemeChange('soft')}>
                        <div className={styles.ThemePreview} style={{ backgroundColor: '#1d2133' }}>
                            <FaT style={{ fill: 'white' }} />
                        </div>
                        <p>Soft</p>
                    </div>
                    <div className={styles.Theme} onClick={() => handleThemeChange('blue')}>
                        <div className={styles.ThemePreview} style={{ backgroundColor: '#171d20' }}>
                            <FaT style={{ fill: '#bde6fb' }} />
                        </div>
                        <p>Blue</p>
                    </div>
                    <div className={styles.Theme} onClick={() => handleThemeChange('rose')}>
                        <div className={styles.ThemePreview} style={{ backgroundColor: '#232136' }}>
                            <FaT style={{ fill: '#e0def4' }} />
                        </div>
                        <p>Rose</p>
                    </div>
                    <div className={styles.Theme} onClick={() => handleThemeChange('default')}>
                        <div className={styles.ThemePreview} style={{ backgroundColor: '#111629' }}>
                            <FaT style={{ fill: 'white' }} />
                        </div>
                        <p>Default</p>
                    </div>
                </div>
                <div className={styles.DivIconTema} onClick={toggleThemeList}>
                    <FaT />
                </div>
                <h4 className={styles.TitleTemas} onClick={toggleThemeList}>Tema</h4>
            </div>
        </footer>
    );
}

export default Footer;