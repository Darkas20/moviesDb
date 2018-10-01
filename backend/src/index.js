import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import films from './routes/films';
import cors from 'cors';
dotenv.config({
	path: path.join(__dirname, '.env'),
});
const app = express();
const PORT = process.env.DB_PORT;

console.log('PORT ', PORT);

console.log('process.env.DB_CONNECTION ', process.env.DB_CONNECTION);

app.use(
	cors({
		origin: '*',
		allowedHeaders: [
			'Content-Type',
			'Content-Range',
			'Origin',
			'X-Requested-With',
			'X-Total-Count',
		],
		exposedHeaders: [
			'Content-Type',
			'Content-Range',
			'X-Total-Count',
		],
		allowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
	})
);

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

// routes

app.use('/api/films', films);

mongodb.MongoClient.connect(
	`${process.env.DB_CONNECTION}`,
	(err, db) => {
		app.set('db', db);

		app.get('/*', (req, res) => {
			res.sendFile(path.join(__dirname, './index.html'));
		});

		app.listen(PORT, () =>
			console.log(`Running on localhost:${PORT}`)
		);
	}
);
