import React, { useState, useEffect } from "react";
import styles from './CardsByGenre.module.css';
import CardPoster from "../Cards/CardPoster";
import api from "../../services/api";
import noImage from '../../assets/SI.png';

function ContainerCards({ title, type, showGenres, list }) {
    const [content, setContent] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [genreContent, setGenreContent] = useState([]);

    useEffect(() => {
        if (showGenres) {
            api.get(`/tmdb/trending?tipo=${type}`)
                .then(response => {
                    setGenreContent(response.data.trending.results);
                })
                .catch(error => {
                    console.log(error.request.responseText);
                });

            api.get(`/tmdb/genres?tipo=${type}`)
                .then(response => {
                    setContent(response.data.genres);
                })
                .catch(error => {
                    console.log(error.request.responseText);
                });
        }
    }, [type]);

    const handleGenreClick = (genreId, genreName) => {
        if (type === "tv") {
            setSelectedGenre(`Séries ${genreName.toLowerCase()}`);
        } else {
            setSelectedGenre(`Filmes ${genreName.toLowerCase()}`);
        }

        api.get(`/tmdb/discover?tipo=${type}&genreId=${genreId}`)
            .then(response => {
                setGenreContent(response.data.genre_content.results);
            })
            .catch(err => console.error(err));
    };

    return (
        <div className={styles.ContainerCards}>
            <h2>{selectedGenre ? selectedGenre : title}</h2>
            {showGenres && (
                <div className={styles.divGeneros}>
                    {content && showGenres && content.genres.map(genero => (
                        <div key={genero.id} className={styles.Genero} onClick={() => handleGenreClick(genero.id, genero.name.split(' ')[0])}>
                            {genero.name.split(' ')[0]}
                        </div>
                    ))}
                </div>
            )}
            <div className={styles.divCards}>
                {showGenres && (
                    genreContent.map(item => {
                        return (
                            <CardPoster key={item.id}
                                img={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                title={type === "tv" ? item.name : item.title}
                                estrelas={type === "tv" ? (item.vote_average / 2).toFixed(0) : (item.vote_average / 2).toFixed(1)}
                                id={item.id}
                                tipo={type}
                            ></CardPoster>
                        );
                    })
                )}
                {!showGenres && list && (
                    [...new Map(list.map(item => [item.tmdb_id || item.id, item])).values()].map(item => (
                        <CardPoster key={item.tmdb_id || item.id}
                            img={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : noImage}
                            title={item.title || item.name}
                            estrelas={item.vote_average / 2}
                            id={item.tmdb_id || item.id}
                            tipo={item.media_type}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default ContainerCards;
