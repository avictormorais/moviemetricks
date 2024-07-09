import React, { useState, useEffect } from 'react';
import { FaUser, FaSearch } from 'react-icons/fa';
import styles from './NavBar.module.css';
import logo from '../../assets/icon.png';
import { Link } from 'react-router-dom';
import { IoNotificationsOutline, IoNotificationsSharp } from "react-icons/io5";
import api from '../../services/api';
import { IoClose } from "react-icons/io5";

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

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

    const handleShowNotifications = () => {
        setShowNotifications(!showNotifications);
    }

    const handleDeleteNotification = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: {
                id: id
            }
        };
    
        api.delete('/api/notifications', config)
            .then(response => {
                setNotifications(notifications.filter(notification => notification.id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    const handleMarkAllAsRead = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
    
        api.delete('/api/notifications', config)
            .then(response => {
                setNotifications([]);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <Link to={'/'}>
                <img className={styles.navbarLogo} src={logo} alt="Logo" />
            </Link>
            <div className={styles.navbarIcons}>
                {accessToken != 'undefined' && accessToken != null && (
                    <div className={styles.navbarIcon} onClick={handleShowNotifications}>
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
                <div className={styles.divNotificacoes} style={{display: showNotifications ? 'flex' : 'none'}}>
                    <div className={styles.topNot}>
                        <h1>Notificações</h1>
                    </div>
                    <div className={styles.divNotificacoesContent}>
                        {notifications.length > 0 ? (
                            notifications.slice(0, 7).map((notification, index) => (
                                <div key={index} className={styles.divNotification}>
                                    <div className={styles.topNotification} key={notification.id}>
                                        <h1>{notification.title}</h1>
                                        <p>{calculateTimeAgo(notification.date)}</p>
                                        <IoClose className={styles.iconClose} onClick={() => handleDeleteNotification(notification.id)}/>
                                    </div>
                                    {notification.contentType == 'serie' ? (
                                        <>
                                            {notification.type == 'release' ? (
                                                <p className={styles.notificationMessage}>Um novo episódio foi lançado!</p>
                                            ) : (
                                                <p className={styles.notificationMessage}>Nova data anunciada!</p>
                                            )}
                                        </>
                                    ) : (
                                        <p className={styles.notificationMessage}>Estreia hoje!</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className={styles.divNotification}>
                                <p>Não há notificações</p>
                            </div>
                        )}
                        <p className={styles.markAll} onClick={handleMarkAllAsRead}>Marcar tudo como lido</p>
                    </div>
                </div>
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

    function calculateTimeAgo(date) {
        const currentDate = new Date();
        const notificationDate = new Date(date);
        const timeDifference = currentDate.getTime() - notificationDate.getTime();
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years > 0) {
            return `${years} ${years === 1 ? 'ano' : 'anos'} atrás`;
        } else if (months > 0) {
            return `${months} ${months === 1 ? 'mês' : 'meses'} atrás`;
        } else if (days > 0) {
            return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
        } else if (hours > 0) {
            return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
        } else {
            return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`;
        }
    }
};

export default NavBar;
