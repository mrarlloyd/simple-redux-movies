import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {searchMovies, fetchMoviesIfNeeded, restartSearch} from '../actions'
import Search from '../components/Search'
import Movies from '../components/Movies'
import debounce from 'debounce'

// this is a simple helper function which sorts the returned array
const sortByKey = (array, key) => {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y)
            ? -1
            : ((x > y)
                ? 1
                : 0));
    });
}

class App extends Component {
    static propTypes = {
        searchTerm: PropTypes.string.isRequired,
        movies: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount = () => {
        const {dispatch, searchTerm} = this.props
        dispatch(fetchMoviesIfNeeded(searchTerm))
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.searchTerm !== this.props.searchTerm) {
            const {dispatch, searchTerm} = nextProps
            dispatch(fetchMoviesIfNeeded(searchTerm))
        }
    }

    // this recieves the current search term and dispatches it to begin a search. it will debounce the requests, to prevent flooding the API
    handleSearch = (searchTerm) => {
        debounce(this.props.dispatch(searchMovies(searchTerm)), 500)
    }

    // this handles the sorting
    handleSort = (sortOrder) => {
        if (this.props.movies.length) {
            switch (sortOrder) {
                case 'DATE':
                    this.setState({
                        movies: sortByKey(this.props.movies, 'Year')
                    });
                    break;
                default:
                    this.setState({
                        movies: sortByKey(this.props.movies, 'Title')
                    });
                    break;
            }
        }
    }

    // get the latest data using the current search term
    handleRefreshClick = e => {
        e.preventDefault()

        const {dispatch, searchTerm} = this.props
        dispatch(restartSearch(searchTerm))
        dispatch(fetchMoviesIfNeeded(searchTerm))
    }

    // output it all, with handling whilst fetching and show the last updated details
    render() {
        const {searchTerm, movies, isFetching, lastUpdated} = this.props
        const isEmpty = movies.length === 0
        return (
            <div>
                <Search value={searchTerm} onKeyUp={this.handleSearch} onSort={this.handleSort}/>
                <p>
                    {lastUpdated && <span>
                        Last updated at {new Date(lastUpdated).toLocaleTimeString()}. {' '}
                    </span>}
                    {!isFetching && <a href="#" onClick={this.handleRefreshClick}>
                        Refresh
                    </a>}
                </p>
                {isEmpty
                    ? (isFetching
                        ? <h2>Loading...</h2>
                        : <h2>No Results.</h2>)
                    : <div style={{
                        opacity: isFetching
                            ? 0.5
                            : 1
                    }}>
                        <Movies movies={movies}/>
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {searchTerm, moviesBySearchTerm} = state
    const {isFetching, lastUpdated, items: movies} = moviesBySearchTerm[searchTerm] || {
        isFetching: true,
        items: []
    }

    return {searchTerm, movies, isFetching, lastUpdated}
}

export default connect(mapStateToProps)(App)
