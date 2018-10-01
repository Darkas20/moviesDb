import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactImageFallback from 'react-image-fallback';
import FormInlineMessage from './FormInlineMessage';
import axios from 'axios';

const initialData = {
	title: '',
	description: '',
	thumbnail: '',
	format: '',
	directors: '',
	stars: [],
	releaseYear: '',
};

const formats = [
	{ id: 1, name: 'DVD' },
	{ id: 2, name: 'VHS' },
	{ id: 3, name: 'Blu-Ray' },
];

export default class MovieForm extends Component {
	state = {
		data: initialData,
		errors: {},
		loading: false,
	};

	async componentDidMount() {
		if (this.props.match.params._id) {
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
					data: movie,
					isLoading: false,
				});
			} catch (e) {
				console.log(e);
			}
		}
	}

	validate(data) {
		const errors = {};

		if (!data.title) errors.title = "This field cant't be blank";
		if (!data.description)
			errors.description = "This field cant't be blank";
		if (!data.thumbnail)
			errors.thumbnail = "This field cant't be blank";
		if (!data.directors)
			errors.directors = "This field cant't be blank";
		if (!data.stars) errors.stars = "This field cant't be blank";
		if (!data.releaseYear)
			errors.releaseYear = "This field cant't be blank";
		if (isNaN(data.releaseYear))
			errors.releaseYear = 'Enter the correct date';
		if (!data.stars) errors.stars = "This field cant't be blank";

		return errors;
	}

	handleStringChange = e =>
		this.setState({
			data: {
				...this.state.data,
				[e.target.name]: e.target.value,
			},
		});

	handleStarsChange = e => {
		console.log(e.target.value);
		this.setState({
			data: {
				...this.state.data,
				stars: e.target.value.split(','),
			},
		});
	};

	updateMovie = () => {
		const {
			title,
			description,
			thumbnail,
			format,
			directors,
			stars,
			releaseYear,
		} = this.state.data;
		axios
			.put(
				`http://localhost:3002/api/films/${
					this.state.data._id
				}`,
				JSON.stringify({
					title,
					description,
					thumbnail,
					format,
					directors,
					stars,
					releaseYear,
				}),
				{
					headers: {
						'Content-type': 'application/json',
					},
				}
			)
			.then(() =>
				this.setState({
					loading: false,
				})
			)
			.then(() => this.props.history.push('/'));
	};

	createMovie = () =>
		axios
			.post(`http://localhost:3002/api/films`, {
				...this.state.data,
			})
			.then(() =>
				this.setState({
					loading: false,
				})
			);

	handleSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({
			errors,
		});

		if (Object.keys(errors).length === 0) {
			this.setState({
				loading: true,
			});
			this.state.data._id
				? this.updateMovie(this.state.data)
				: this.createMovie(this.state.data).then(() =>
						this.props.history.push('/')
				  );
		}
	};

	render() {
		const { data, errors, loading } = this.state;
		const formClassNames = loading
			? 'ui form loading'
			: 'ui form';

		return (
			<div className="six wide column">
				<form
					onSubmit={this.handleSubmit}
					className={formClassNames}
				>
					<div className="ui grid">
						<div className="twelve wide column">
							<div
								className={
									errors.title
										? 'field error'
										: 'field'
								}
							>
								<label htmlFor="title">
									Movie title
								</label>
								<input
									type="text"
									id="title"
									name="title"
									placeholder="Full movie title"
									value={data.title}
									onChange={this.handleStringChange}
								/>
								<FormInlineMessage
									content={errors.title}
									type="error"
								/>
							</div>

							<div
								className={
									errors.description
										? 'field error'
										: 'field'
								}
							>
								<label htmlFor="description">
									Movie description
								</label>
								<textarea
									type="text"
									id="description"
									name="description"
									placeholder="Movie description"
									value={data.description || ''}
									onChange={this.handleStringChange}
								/>
								<FormInlineMessage
									content={errors.description}
									type="error"
								/>
							</div>
						</div>
						<div className="four wide column">
							<ReactImageFallback
								src={data.thumbnail}
								fallbackImage="http://via.placeholder.com/250x300"
								alt="Thumbnail"
								className="ui image"
							/>
						</div>
					</div>

					<div
						className={
							errors.thumbnail ? 'field error' : 'field'
						}
					>
						<label htmlFor="thumbnail">Thumbnail</label>
						<input
							type="text"
							id="thumbnail"
							name="thumbnail"
							placeholder="Url of thumbnail"
							value={data.thumbnail || ''}
							onChange={this.handleStringChange}
						/>
						<FormInlineMessage
							content={errors.thumbnail}
							type="error"
						/>
					</div>

					<div
						className={
							errors.format ? 'field error' : 'field'
						}
					>
						<label>Format</label>
						<select
							name="format"
							value={data.format}
							onChange={this.handleStringChange}
						>
							<option value="0">Choose Format</option>
							{formats.map(format => (
								<option
									key={format.id}
									value={format.name}
								>
									{format.name}
								</option>
							))}
						</select>
						<FormInlineMessage
							content={errors.format}
							type="error"
						/>
					</div>

					<div
						className={
							errors.releaseYear
								? 'field error'
								: 'field'
						}
					>
						<label htmlFor="releaseYear">
							Release Year
						</label>
						<input
							type="text"
							id="releaseYear"
							name="releaseYear"
							placeholder="Release Year"
							value={data.releaseYear}
							onChange={this.handleStringChange}
						/>
						<FormInlineMessage
							content={errors.releaseYear}
							type="error"
						/>
					</div>

					<div
						className={
							errors.directors ? 'field error' : 'field'
						}
					>
						<label htmlFor="directors">
							Movie Director(s)
						</label>
						<input
							type="text"
							id="directors"
							name="directors"
							placeholder="Movie director(s)"
							value={data.directors || ''}
							onChange={this.handleStringChange}
						/>
						<FormInlineMessage
							content={errors.directors}
							type="error"
						/>
					</div>

					<div
						className={
							errors.stars ? 'field error' : 'field'
						}
					>
						<label htmlFor="stars">Movie Stars</label>
						<input
							type="text"
							id="stars"
							name="stars"
							placeholder="Movie Stars"
							value={data.stars.join(',')}
							onChange={this.handleStarsChange}
						/>
						<FormInlineMessage
							content={errors.stars}
							type="error"
						/>
					</div>

					<div className="ui fluid buttons">
						<button
							type="submit"
							className="ui primary button"
						>
							{this.props.match.params._id
								? 'Save'
								: 'Create'}
						</button>
						<div className="or" />
						<Link className="ui button" to="/">
							Cansel
						</Link>
					</div>
				</form>
			</div>
		);
	}
}
