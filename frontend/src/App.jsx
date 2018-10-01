import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import UploadMoviesPage from './pages/UploadMoviesPage';

import TopNavigation from './components/TopNavigation';
import MovieForm from './components/MovieForm';

import './App.css';

class App extends Component {
	state = {
		searchTerm: '',
	};

	setSearchTerm = term =>
		this.setState({
			searchTerm: term,
		});

	render() {
		return (
			<div className="ui container">
				<Route
					path="/"
					render={props => (
						<TopNavigation
							{...props}
							setSearchTerm={this.setSearchTerm}
							searchTerm={this.state.searchTerm}
						/>
					)}
				/>
				<div className="ui container">
					<Switch>
						<Route
							exact
							path="/"
							render={props => (
								<MoviesPage
									{...props}
									searchTerm={this.state.searchTerm}
								/>
							)}
						/>
						<Route
							exact
							path="/new"
							render={props => <MovieForm {...props} />}
						/>
						<Route
							exact
							path="/edit/:_id"
							render={props => <MovieForm {...props} />}
						/>
						<Route
							exact
							path="/upload"
							render={props => (
								<UploadMoviesPage {...props} />
							)}
						/>
						<Route
							exact
							path="/:_id"
							render={props => (
								<MovieDetailsPage {...props} />
							)}
						/>
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
