import { combineReducers } from 'redux'
import {
  SEARCH_MOVIES, RESTART_SEARCH,
  REQUEST_MOVIES, RECEIVE_MOVIES
} from '../actions'

const searchTerm = (state = '', action) => {
  switch (action.type) {
    case SEARCH_MOVIES:
      return action.searchTerm
    default:
      return state
  }
}

const movies = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case RESTART_SEARCH:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_MOVIES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_MOVIES:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.movies,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const moviesBySearchTerm = (state = { }, action) => {
  switch (action.type) {
    case RESTART_SEARCH:
    case RECEIVE_MOVIES:
    case REQUEST_MOVIES:
      return {
        ...state,
        [action.searchTerm]: movies(state[action.searchTerm], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  moviesBySearchTerm,
  searchTerm
})

export default rootReducer
