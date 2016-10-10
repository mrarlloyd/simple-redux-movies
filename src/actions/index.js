export const REQUEST_MOVIES = 'REQUEST_MOVIES'
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES'
export const SEARCH_MOVIES = 'SEARCH_MOVIES'
export const RESTART_SEARCH = 'RESTART_SEARCH'

export const searchMovies = searchTerm => ({type: SEARCH_MOVIES, searchTerm})

export const restartSearch = searchTerm => ({type: RESTART_SEARCH, searchTerm})

export const requestMovies = searchTerm => ({type: REQUEST_MOVIES, searchTerm})

export const receiveMovies = (searchTerm, json) => ({
    type: RECEIVE_MOVIES,
    searchTerm,
    movies: (json && json.Search)
        ? json.Search
        : [],
    receivedAt: Date.now()
})

const fetchMovies = searchTerm => dispatch => {
    dispatch(requestMovies(searchTerm))
    return fetch(`http://www.omdbapi.com/?s=${searchTerm}`).then(response => response.json()).then(json => dispatch(receiveMovies(searchTerm, json)))
}

const shouldFetchMovies = (state, searchTerm) => {
    const movies = state.moviesBySearchTerm[searchTerm]
    if (!movies) {
        return true
    }
    if (movies.isFetching) {
        return false
    }
    return movies.didInvalidate
}

export const fetchMoviesIfNeeded = searchTerm => (dispatch, getState) => {
    if (shouldFetchMovies(getState(), searchTerm)) {
        return dispatch(fetchMovies(searchTerm))

    }
}
