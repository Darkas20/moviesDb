import React from 'react';
import MovieCard from './MovieCard';
import PropTypes from 'prop-types';

const MoviesList = ({ movies, deleteMovie }) => (
	<div className="ui three cards stackable">
		{movies.length === 0 ? (
			<div className="ui icon message">
				<i className="icon info" />
				<div className="content">
					<div className="header">
						There are no movies in your store!
					</div>
					<p>You should add some, don't you think?</p>
				</div>
			</div>
		) : (
			movies.map(movie => (
				<MovieCard
					key={movie._id}
					movie={movie}
					deleteMovie={deleteMovie}
				/>
			))
		)}
	</div>
);

MoviesList.propTypes = {
	movies: PropTypes.array.isRequired,
	deleteMovie: PropTypes.func.isRequired,
};

export default MoviesList;
