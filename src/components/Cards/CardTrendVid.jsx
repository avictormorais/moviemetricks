import { FaStar, FaCalendar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from './CardTrendVid.module.css';
import api from "../../services/api";

function CardTrendVid({ id, tipo, isMiddlePage, idVideo}) {
    const [content, setContent] = useState(null);
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        api.get(`/tmdb/details?tipo=${tipo}&id=${id}`)
            .then(response => {
                setContent(response.data.trend);
                setLogo(response.data.trend_logo)
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    function redirecionar() {
        console.log("Clicou card");
    }

    let ageRating;
    if (tipo === "tv") {
        ageRating = content?.content_ratings?.results.find(item => item.iso_3166_1 === "BR")?.rating || content?.content_ratings?.results.find(item => /^\d+$/.test(item.iso_3166_1))?.rating || '?';
    } else {
        ageRating = content?.releases?.countries.find(item => item.iso_3166_1 === "BR")?.certification || '?';
    }
    const destaqueClasses = isMiddlePage ? `${styles.Fade} ${styles.MiddlePage}` : styles.Fade;

    let embedUrl = `https://www.youtube.com/embed/${idVideo}?autoplay=1&loop=1&controls=0&mute=0&loop=1`

    return (
        <Link to={`/details/${tipo}/${id}`} className={styles.Destaque} onClick={redirecionar} data-testid={'card-trend-details'}>
            <div className={styles.VideoContainer}>
                {/*<video autoPlay muted loop className={styles.VideoBackground}>
                    <source src={`https://pipedproxy-yul.kavin.rocks/videoplayback?c=ANDROID&clen=22470587&cpn=Zptr78e7ZWbuduoj&dur=62.333&ei=dNsGZtaACvWAybgP0JS8wA8&expire=1711747028&fexp=51141541&fvip=4&gir=yes&host=rr5---sn-vgqskn6z.googlevideo.com&id=o-ABvOlxvqoJQp-By9XSqBHos1puh6TV_LY5vZsx2UuDvZ&initcwndbps=810000&ip=140.228.21.156&itag=137&keepalive=yes&lmt=1648818016030469&lsig=ALClDIEwRAIgBumIEFaFoEtgRXe6K_wecCTCBJN1SGyWbtg54OxaZfkCIFyNfDPX9Fn_19MLtRvGtNalbo2EsW8ZEoUpO3wZyogf&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&mh=aT&mime=video%2Fmp4&mm=31%2C26&mn=sn-vgqskn6z%2Csn-p5qlsndk&ms=au%2Conr&mt=1711724944&mv=m&mvi=5&pl=24&qhash=30333d90&requiressl=yes&sig=AJfQdSswRAIgYVXTTN4x6oImX3WjpE5sYLYGREqchIINKrlgwrVJk04CICjyniec8mikWkiLXiPjjt2nSXOhXR9CYRstJmd-reAZ&source=youtube&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&svpuc=1&txp=5319224&ump=1&vprv=1&xpc=EgVo2aDSNQ%3D%3D`} type="video/mp4" />
                    Seu navegador não suporta vídeos HTML5.
                </video>*/}
                <iframe className={styles.VideoBackground} src={embedUrl} height="100px" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
                <div className={destaqueClasses}>
                    <img src={`https://image.tmdb.org/t/p/original${logo}`} alt="" />
                    <p className={styles.Overview}>{content?.overview}</p>
                    <div className={styles.Infos}>
                        <FaStar />
                        <h2 className={styles.InfoH2}>{((content?.vote_average.toFixed(1) / 2).toFixed(1))}</h2>
                        <FaCalendar />
                        <h2 className={styles.InfoH2}>{tipo === "tv" ? content?.first_air_date?.split('-')[0] : content?.release_date?.split('-')[0]}</h2>
                    </div>
                    <div className={styles.Infos}>
                        <div className={styles.ageRestricted}>
                            <h2 className={styles.ageRestrictedText}>{ageRating}</h2>
                        </div>
                        <h2 className={styles.InfoH2}>{content?.genres.map(genre => genre.name).join(", ")}</h2>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CardTrendVid;
