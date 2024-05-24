import React, { useState, useEffect } from 'react';
import { FaUser, FaSearch } from 'react-icons/fa';
import styles from './NavBar.module.css';
import logo from '../../assets/icon.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

    useEffect(() => {
        function handleScroll() {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 90) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <Link to={'/'}>
                <img className={styles.navbarLogo} src={logo} alt="Logo" />
            </Link>
            <div className={styles.navbarIcons}>
                <Link to={accessToken != 'undefined' && accessToken != null ? '/profile' : '/login'}>
                    <div className={styles.navbarIcon} data-testid="btn-profile">
                        <FaUser alt='Perfil'/>
                    </div>
                </Link>
                <Link to={'/search/'}>
                    <div className={styles.navbarSearch} data-testid="btn-search">
                        <FaSearch alt='Pesquisa'/>
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
