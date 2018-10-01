import React, { Component } from 'react';
import axios from 'axios';

const fileInputStyle = {
	width: '0.1px',
	height: '0.1px',
	opacity: '0',
	overflow: 'hidden',
	position: 'absolute',
	zIndex: '-1',
};

class UploadMoviesPage extends Component {
	state = {
		uploadStatus: false,
	};

	handleUploadImage = ev => {
		ev.preventDefault();

		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		axios
			.post(`http://localhost:3002/api/films/file`, data, {})
			.then(function(resp) {
				alert('Upload Finish!');
			})
			.then(() => this.props.history.push('/'))
			.catch(function(error) {
				console.log(error);
			});
	};

	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleUploadImage}>
					<div className="ui fluid segment">
						<input
							type="file"
							ref={ref => {
								this.uploadInput = ref;
							}}
							className="inputfile"
							id="uploadFileInput"
							style={fileInputStyle}
						/>

						<label
							htmlFor="uploadFileInput"
							className="ui huge red button"
						>
							<i className="ui upload icon" />
							Select .txt file with movies
						</label>
						<button className="ui button blue">
							Upload
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default UploadMoviesPage;
