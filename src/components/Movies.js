import React, {PropTypes} from 'react'
import MovieItem from './MovieItem'

const Movies = ({movies}) => (
    <ul className="film-list">
        {movies.map((movie, i) => <MovieItem key={i} movie={movie}/>)}
    </ul>
)

Movies.propTypes = {
    movies: PropTypes.array.isRequired
}

export default Movies
