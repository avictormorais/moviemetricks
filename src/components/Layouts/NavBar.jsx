import React, { useState, useEffect } from 'react';
import { FaUser, FaSearch } from 'react-icons/fa';
import styles from './NavBar.module.css';
import logo from '../../assets/icon.png';
import { Link } from 'react-router-dom';
import { IoNotificationsOutline, IoNotificationsSharp } from "react-icons/io5";
import api from '../../services/api';

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [notifications, setNotifications] = useState([1,44,4,4,4,4,4,4]);

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

    useEffect(() => {
        if(accessToken != 'undefined' && accessToken != null){
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            };
            
            api.get('/api/notifications', config)
                .then(response => {
                    setNotifications(response.data);
                })
                .catch(error => {
                console.log(error);
                });
        }
    } , [accessToken]);


    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <Link to={'/'}>
                <img className={styles.navbarLogo} src={logo} alt="Logo" />
            </Link>
            <div className={styles.navbarIcons}>
                {accessToken != 'undefined' && accessToken != null && (
                    <div className={styles.navbarIcon}>
                        {notifications.length > 0 ? <IoNotificationsSharp alt='Notificações'/> : <IoNotificationsOutline alt='Notificações'/>}
                        {notifications.length > 0 && (
                            <div className={styles.divLenNotifications}>
                                {notifications.length > 9 ? (
                                <p style={{marginLeft: '8px'}}>9+</p>
                                ) : (
                                    <p>{notifications.length}</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
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
