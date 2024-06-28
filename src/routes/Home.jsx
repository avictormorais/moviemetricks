import { useEffect, useState } from 'react';
import '../index.css';
import CardTrend from '../components/Cards/CardTrend';
import CardsByGenre from '../components/Grids/CardsByGenre';
import Ticket from '../components/Ticket';
import Separador from '../components/Separador';
import DailyGrid from '../components/Grids/DailyGrid';
import api from '../services/api';
import Loading from '../components/Layouts/Loading';

function Home() {
  const [movies, setMovies] = useState(null);
  const [trendingSeries, setTrendingSeries] = useState(null);
  const [trendingMovie, setTrendingMovie] = useState(null);
  const [seenTv, setSeenTv] = useState(null);
  const [seenMovies, setSeenMovies] = useState(null);

  useEffect(() => {
    
    api.get(`/tmdb/trending?tipo=tv`)
      .then(response => {
        setTrendingSeries(response.data.trending.results[0]);
      })
      .catch(error => {
          console.log(error.request.responseText);
      })

    api.get(`/tmdb/trending?tipo=movie`)
      .then(response => {
        setTrendingMovie(response.data.trending.results[0]);
      })
      .catch(error => {
          console.log(error.request.responseText);
      })

    api.get(`/tmdb/now_playing`)
      .then(response => {
        setMovies(response.data.now_playing.results.slice(0, 6));
      })
      .catch(error => {
          console.log(error.request.responseText);
      })

      if (localStorage.getItem('accessToken')) {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        };

        api.get(`/api/user/watched`, config)
        .then((response) => {
          const watchedMedia = response.data.watched_media;
          const moviesList = watchedMedia.filter(
            (item) => item.media_type === "movie"
          );
          const tvShowsList = watchedMedia.filter(
            (item) => item.media_type === "tv"
          );
          setSeenMovies(moviesList);
          setSeenTv(tvShowsList);
        })
        .catch((error) => {
          console.log(error);
        });
      }
      
  }, []);

  return (
    <div className="App">
      {movies ? (
        <>
          {trendingSeries && (
            <CardTrend id={trendingSeries.id} tipo="tv" isMiddlePage={false}/>
          )}
          {seenTv && seenTv.length > 0 && (
            <>
              <Separador nome="Suas séries" />
              <CardsByGenre title={""} type={"tv"} showGenres={false} list={seenTv}/>
            </>
          )}
          <Separador nome="Séries populares hoje" />
          <DailyGrid tipo='tv'/>
          <CardsByGenre title={"Séries da semana"} type={"tv"} showGenres={true} />

          {trendingMovie && (
            <CardTrend id={trendingMovie.id} tipo="movie" isMiddlePage={true}/>
          )}
          {seenMovies && seenMovies.length > 0 && (
            <>
              <Separador nome="Seus filmes" />
              <CardsByGenre title={""} type={"movie"} showGenres={false} list={seenMovies}/>
            </>
          )}          <Separador nome="Filmes populares hoje" />
          <DailyGrid tipo='movie'/>
          <CardsByGenre title={"Filmes da semana"} type={"movie"} showGenres={true} />
          <Separador nome="Filmes em cartaz" />
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(407px, 407px))',
              gridGap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {movies.map(movie => (
              <Ticket
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rate={(movie.vote_average.toFixed(1))/2}
                backDrop={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                poster={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                DiaMes={`${movie.release_date.split('-')[2]}.${movie.release_date.split('-')[1]}`}
                ano={movie.release_date.split('-')[0]}
              />
            ))}
          </div>
        </>
      ) : (
        <Loading/>
      )}
    </div>
  );
}

export default Home;
