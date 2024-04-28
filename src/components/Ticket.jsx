import styles from './Ticket.module.css'
import QR from '../assets/qr-moviemetricks.svg'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import api from '../services/api';

function Ticket({title, rate, backDrop, poster, DiaMes, ano, id}){
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        api.get(`/tmdb/logo?tipo=movie&id=${id}&height=w200`)
        .then(response => {
            setLogo(response.data.logo);
        })
    }, [id]);

    return(
        <Link to={`/details/movie/${id}`} className={styles.DivTicket}>
        <img className={styles.PosterTicket} src={poster} alt="" />
        <div className={styles.TicketDivisor}/>
        <div>
            <div className={styles.TicketInfos}>
                <div className={styles.TicketBackdrop} style={{ backgroundImage: `url('${backDrop}')` }}>
                    <div className={styles.TicketFade}>
                        <div className={styles.D1}></div>
                        <div className={styles.D2}></div>
                        {logo ? (
                            <>
                                <img className={styles.TicketLogo} src={logo} alt="" />
                            </>
                        ) : (
                            <h1 className={styles.Title}>{title}</h1>
                        )}
                    </div>
                </div>
                <div className={styles.RowTicket}>
                        <img className={styles.TicketQR} src={QR} alt="QR Code" />
                        <div className={styles.TicketSeparador} />
                        <div className={styles.TicketDivDates}>
                            <h2>{DiaMes}</h2>
                            <h3>{ano}</h3>
                        </div>
                        <div className={styles.TicketSeparador} />
                        <div className={styles.DivRate}>
                            <h4>{rate}<span>/ 5</span></h4>
                            <FaStar></FaStar>
                        </div>
                </div>
            </div>
        </div>
        </Link>
    )

}

export default Ticket