import { useEffect, useState } from 'react';
import styles from './DailyGrid.module.css';
import CardDaily from '../Cards/CardDaily';
import api from '../../services/api';

function DailyGrid({tipo}) {
    const [trends, setTrends] = useState([]);

    useEffect(() => {
        api.get(`/tmdb/trending?tipo=${tipo}`)
            .then(response => {
                setTrends(response.data.trending.results.slice(1, 4));
            })
            .catch(error => {
                console.log(error.request.responseText);
            });
    }, []);

    return (
        <div className={styles.DailyGrid}>
            {trends.map(trend => (
                <CardDaily
                    key={trend.id}
                    tipo={trend.media_type}
                    id={trend.id}
                    overview={trend.overview}
                    vote_average={(trend.vote_average.toFixed(1)/2).toFixed(1)}
                    original_language={trend.original_language.toUpperCase()}
                    release_date={tipo === 'tv' ? trend.first_air_date.split('-')[0] : trend.release_date.split('-')[0]}
                    backdrop_path={`https://image.tmdb.org/t/p/w500/${trend.backdrop_path}`}
                    title={trend.title || trend.name}
                />
            ))}
        </div>
    );
}

export default DailyGrid;