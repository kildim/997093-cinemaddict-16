import {formatTime} from './date-time';

export const parseFromServerFormat = (serverData) => {
  const filmInfo = serverData['film_info'];
  const userDetails = serverData['user_details'];
  return {
    id: serverData['id'],
    poster: filmInfo['poster'] || '',
    ageRating: filmInfo['age_rating'] || '',
    title: filmInfo['title'] || '',
    alternativeTitle: filmInfo['alternative_title'] || '',
    totalRating: filmInfo['total_rating'] || '',
    director: filmInfo['director'] || '',
    writers: filmInfo['writers'].join(', ') || '',
    actors: filmInfo['actors'].join(', ') || '',
    releaseDate: new Date(filmInfo['release']['date']) || null,
    runtime: filmInfo['runtime'] || null,
    releaseCountry: filmInfo['release']['release_country'] || '',
    genres: filmInfo['genre'] || [],
    description: filmInfo['description'] || '',
    watchList: userDetails['watchlist'] || false,
    watched: userDetails['already_watched'] || false,
    favorite: userDetails['favorite'] || false,
    watchingDate: new Date(userDetails['watching_date']) || null,
    comments: serverData['comments'] || [],
  };
};

export const parseToServerFormat = (movie) => ({
  'id': movie.id,
  // TODO fix the 'comments' stub
  'comments': [],
  'film_info':
    {
      'title': movie.title,
      'alternative_title': movie.alternativeTitle,
      'total_rating': movie.totalRating,
      'poster': movie.poster,
      'age_rating': movie.ageRating,
      'director': movie.director,
      // TODO fix the 'writers' stub
      'writers': [],
      // TODO fix the 'actors' stub
      'actors': [],
      'release':
        {
          'date': movie.releaseDate.toISOString(),
          'release_country': movie.releaseCountry,
        },
      'runtime': movie.runtime,
      // TODO fix the 'genre' stub
      'genre': [],
      'description': movie.description,
    },
  'user_details':
    {
      'watchlist': movie.watchList,
      'already_watched': movie.watched,
      'watching_date': movie.watchingDate.toISOString(),
      'favorite': movie.favorite,
    }
});
