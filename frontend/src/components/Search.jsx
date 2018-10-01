import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchTerm, setSearchTerm }) => (
	<div className="ui input icon inverted">
		<input
			type="text"
			placeholder="Найти фильм"
			value={searchTerm}
			onChange={event => setSearchTerm(event.target.value)}
		/>
		<i className="search icon" />
	</div>
);

Search.propTypes = {
	searchTerm: PropTypes.string.isRequired,
	setSearchTerm: PropTypes.func.isRequired,
};

export default Search;
