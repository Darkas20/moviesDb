import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';

class MovieCard extends Component {
	state = {
		showConfirmation: false,
	};

	toggleConfirmation = () => {
		this.setState({
			showConfirmation: !this.state.showConfirmation,
		});
	};

	render() {
		const { movie, deleteMovie } = this.props;

		let shortDescription = movie.description
			? `${movie.description.slice(0, 100)}...`
			: '';
		const { showConfirmation } = this.state;
		return (
			<div className="ui card">
				<div className="image">
					<span className="ui blue ribbon label">
						{movie.format}
					</span>
					<span className="ui green right ribbon label ">
						{movie.releaseYear}
					</span>
					<ReactImageFallback
						src={movie.thumbnail}
						alt={movie.title}
						fallbackImage="http://via.placeholder.com/360x450"
					/>
				</div>
				<div className="content">
					<Link
						to={`/movies/${movie._id}`}
						className="ui header"
					>
						{movie.title}
					</Link>
					<div className="meta">
						<span className="date">{movie.year}</span>
					</div>

					<div className="description">
						{movie.description &&
						movie.description.length >= 100
							? shortDescription
							: movie.description}
					</div>
				</div>
				{movie.directors && (
					<div className="extra content">
						<span>
							<i className="user icon" />
							Director(s): {movie.directors}
						</span>
					</div>
				)}
				<div className="extra content ">
					<p>
						<i className="users icon" />
						Stars: {movie.stars.map(star => `${star}, `)}
					</p>
				</div>
				<div className="extra content">
					{showConfirmation ? (
						<div className="ui buttons two">
							<a
								className="ui red basic button"
								onClick={() => deleteMovie(movie._id)}
							>
								<i className="ui icon check" />
								YES
							</a>
							<a
								className="ui grey basic button"
								onClick={() =>
									this.toggleConfirmation()
								}
							>
								<i className="ui icon close" /> NO
							</a>
						</div>
					) : (
						<div className="ui three buttons">
							<Link
								to={`/edit/${movie._id}`}
								className="ui basic blue icon button"
							>
								<i className="icon edit" />
								&nbsp;Edit
							</Link>
							<Link
								to={`/${movie._id}`}
								className="ui basic green button icon"
							>
								<i className="eye icon" />
								&nbsp;Details
							</Link>
							<button
								className="ui right basic red button icon"
								onClick={() =>
									this.toggleConfirmation()
								}
							>
								<i className="trash icon right" />
								&nbsp;Delete
							</button>
						</div>
					)}
				</div>
			</div>
		);
	}
}

MovieCard.propTypes = {
	deleteMovie: PropTypes.func.isRequired,
	movie: PropTypes.shape({
		_id: PropTypes.string.isRequired,

		title: PropTypes.string.isRequired,
		thumbnail: PropTypes.string,
		releaseYear: PropTypes.string.isRequired,
		description: PropTypes.string,
		format: PropTypes.string,
		directors: PropTypes.string,
		stars: PropTypes.array.isRequired,
	}).isRequired,
};

export default MovieCard;
