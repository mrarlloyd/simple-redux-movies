import React, {PropTypes} from 'react'

const Search = ({value, onKeyUp, onSort}) => (
    <span>
        <h1>Film Search</h1>

        <input id="search-input" type="text" placeholder="Search..." onKeyUp={e => onKeyUp(e.target.value)}/>

        <span>Sort:</span>
        <input id="title-input" type="radio" name="sort-group" value="TITLE" onChange={e => onSort(e.target.value)}/>
        <label htmlFor="title-input">Title</label>

        <input id="date-input" type="radio" name="sort-group" value="DATE" onChange={e => onSort(e.target.value)}/>
        <label htmlFor="date-input">Date</label>

    </span>
)

Search.propTypes = {
    value: PropTypes.string.isRequired,
    onKeyUp: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
}

export default Search
