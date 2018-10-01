import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import Search from './Search';

const TopNavigation = ({ setSearchTerm, searchTerm, location }) => (
	<div className="ui menu pointing stackable inverted">
		<NavLink exact to="/" className="item">
			<i className="tv layout icon" /> MoviesList
		</NavLink>
		<NavLink exact to="/new" className="item">
			<i className="plus layout icon" /> Add new movie
		</NavLink>
		<NavLink exact to="/upload" className="item">
			<i className="upload layout icon" /> UploadMovies
		</NavLink>
		{location.pathname === '/' && (
			<div className="right item">
				<Search
					setSearchTerm={setSearchTerm}
					searchTerm={searchTerm}
				/>
			</div>
		)}
	</div>
);

TopNavigation.propTypes = {
	searchTerm: PropTypes.string.isRequired,
	setSearchTerm: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
};

export default withRouter(TopNavigation);
