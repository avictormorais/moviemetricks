import { useEffect, useState } from 'react';
import '../index.css';
import CardTrend from '../components/Cards/CardTrend';
import CardsByGenre from '../components/Grids/CardsByGenre';
import Ticket from '../components/Ticket';
import Separador from '../components/Separador';
import DailyGrid from '../components/Grids/DailyGrid';
import api from '../services/api';

function Home() {
  const [movies, setMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState(null);
  const [trendingMovie, setTrendingMovie] = useState(null);

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
      
  }, []);

  return (
    <div className="App">
      {trendingSeries && (
        <CardTrend id={trendingSeries.id} tipo="tv" isMiddlePage={false}/>
      )}
      <Separador nome="Séries populares hoje" />
      <DailyGrid tipo='tv'/>
      <CardsByGenre title={"Séries da semana"} type={"tv"} />

      {trendingMovie && (
        <CardTrend id={trendingMovie.id} tipo="movie" isMiddlePage={true}/>
      )}
      <Separador nome="Filmes populares hoje" />
      <DailyGrid tipo='movie'/>
      <CardsByGenre title={"Filmes da semana"} type={"movie"} />
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
    </div>
  );
}

export default Home;
