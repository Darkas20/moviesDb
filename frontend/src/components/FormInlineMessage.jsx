import React from 'react';
import PropTypes from 'prop-types';

const FormInlineMessage = ({ content, type }) => (
	<span
		style={{
			color: type === 'error' ? '#9f3a38' : '#6597a7',
		}}
	>
		{content}
	</span>
);

FormInlineMessage.defaultProps = {
	content: '',
};

FormInlineMessage.propTypes = {
	content: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['error', 'info']).isRequired,
};

export default FormInlineMessage;
