import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ReactImageFallback from 'react-image-fallback';

class MovieDetailsPage extends Component {
	state = {
		movie: {},
		isLoading: false,
	};

	async componentDidMount() {
		try {
			this.setState({
				isLoading: true,
			});
			const res = await axios.get(
				`http://localhost:3002/api/films/${
					this.props.match.params._id
				}`
			);

			const movie = res.data.film;
			this.setState({
				movie,
				isLoading: false,
			});
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		const { isLoading, movie } = this.state;
		return (
			<Fragment>
				{isLoading ? (
					<div className="ui icon message">
						<i className="notched circle loading icon" />
						<div className="content">
							<div className="header">
								Wait a second
							</div>
							<p>Loading movies collection...</p>
						</div>
					</div>
				) : (
					<div className="ui items">
						<div className="item">
							<div className="image">
								<ReactImageFallback
									src={movie.thumbnail}
									alt={movie.title}
									fallbackImage="http://via.placeholder.com/180x250"
									className="ui small image"
								/>
							</div>
							<div className="content">
								<div className="header">
									<h1 className="ui header">
										{movie.title}
										&nbsp; ({movie.releaseYear})
									</h1>
								</div>
								{movie.directors && (
									<div className="description">
										<span>
											<i className="user icon" />
											Режиссер(ы):
										</span>
										<span>
											&nbsp;
											{movie.directors}
										</span>
									</div>
								)}
								{movie.description && (
									<div className="description">
										<span>Описание:</span>
										<p>{movie.description}</p>
									</div>
								)}
								<div className="description">
									<span>
										<i className="users icon" />
										Актёры:
									</span>
									<span>
										&nbsp;
										{movie.stars &&
											movie.stars.join(', ')}
									</span>
								</div>

								<div className="meta">
									<span>Формат:</span>
									<span className="ui blue label">
										{movie.format}
									</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</Fragment>
		);
	}
}

export default MovieDetailsPage;
