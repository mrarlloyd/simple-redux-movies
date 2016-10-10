import React, {Component} from 'react'

class MovieItem extends Component {

    constructor(props) {
        super()
        this.state = {
            showDetails: 'hidden'
        }
    }

    /*
    *  This stores it's state locally, because it's only needed here, not anywhere else in the application
    */
    toggleDetails = () => {
        if (this.state.showDetails === 'hidden') {
            this.setState({showDetails: 'visible'})
        } else {
            this.setState({showDetails: 'hidden'})
        }
    }

    render() {
        return (
            <li onClick={this.toggleDetails}>
                {this.props.movie.Title}
                <div className={this.state.showDetails}>Year: {this.props.movie.Year}, imdbID:{this.props.movie.imdbID}
                    <br/><img alt={this.props.movie.Title + ' Poster'} src={this.props.movie.Poster}/>
                </div>
            </li>
        )

    }

}

export default MovieItem
