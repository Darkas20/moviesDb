import React from 'react';
import MovieCard from './MovieCard';
import PropTypes from 'prop-types';

const MoviesList = ({ movies, deleteMovie }) => (
	<div className="ui three cards stackable">
		{movies.map(movie => (
			<MovieCard
				key={movie._id}
				movie={movie}
				deleteMovie={deleteMovie}
			/>
		))}
	</div>
);

MoviesList.propTypes = {
	movies: PropTypes.array.isRequired,
	deleteMovie: PropTypes.func.isRequired,
};

export default MoviesList;
