import React, { Component, Fragment } from 'react';
import _sortBy from 'lodash/sortBy';
import _filter from 'lodash/filter';
import axios from 'axios';
import PropTypes from 'prop-types';
import MoviesList from '../components/MoviesList';

export default class MoviesPage extends Component {
	state = {
		movies: [],
		isLoading: false,
	};

	async componentDidMount() {
		try {
			this.setState({
				isLoading: true,
			});
			const res = await axios(
				`http://localhost:3002/api/films`
			);
			const movies = res.data.films;
			this.setState({
				movies: this.sortMovies(movies),
				isLoading: false,
			});
		} catch (e) {
			console.log(e);
		}
	}

	sortMovies = movies => {
		return _sortBy(movies, [movie => movie.title.toLowerCase()]);
	};

	getMovieById = id => {
		axios.get(`http://localhost:3002/api/films/${id}`);
	};

	deleteMovie = id =>
		axios
			.delete(`http://localhost:3002/api/films/${id}`, {
				headers: {
					'Content-type': 'application/json',
				},
			})
			.then(() => {
				const movies = this.state.movies.filter(
					movie => movie._id !== id
				);
				this.setState({ movies: this.sortMovies(movies) });
			});

	render() {
		const { isLoading, movies } = this.state;
		const { searchTerm } = this.props;

		const filteredMovies = _filter(movies, movie => {
			return (
				movie.title
					.toLowerCase()
					.indexOf(searchTerm.toLowerCase()) !== -1 ||
				movie.stars
					.join(',')
					.toLowerCase()
					.indexOf(searchTerm.toLowerCase()) !== -1
			);
		});

		return (
			<Fragment>
				<div className="ui container">
					<h1 className="ui header">
						<i className="tv icon" />
						<div className="content">Movies List</div>
					</h1>

					<div className="ui stackble grid">
						<div className="wide column sixten">
							{isLoading ? (
								<div className="ui icon message">
									<i className="notched circle loading icon" />
									<div className="content">
										<div className="header">
											Wait a second
										</div>
										<p>Loading movies list...</p>
									</div>
								</div>
							) : (
								<MoviesList
									movies={filteredMovies}
									deleteMovie={this.deleteMovie}
								/>
							)}
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

MoviesPage.propTypes = {
	searchTerm: PropTypes.string.isRequired,
};
