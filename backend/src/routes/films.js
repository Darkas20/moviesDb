import express from 'express';
import mongodb from 'mongodb';
import fs from 'fs';
import formidable from 'formidable';
import path from 'path';
import camel from 'to-camel-case';
import os from 'os';

const router = express.Router();

router.get('/', (req, res) => {
	const db = req.app.get('db');
	db.collection('films')
		.find({})
		.toArray((err, films) => {
			if (err) {
				res.status(500).json({ errors: { global: err } });
				console.warn(e);
				return;
			}

			res.json({ films });
		});
});

router.get('/:_id', (req, res) => {
	const db = req.app.get('db');
	db.collection('films').findOne(
		{ _id: new mongodb.ObjectId(req.params._id) },
		(err, film) => {
			if (err) {
				res.status(500).json({ errors: { global: err } });
				console.warn(e);
				return;
			}

			res.json({ film });
		}
	);
});

router.post('/', (req, res) => {
	const db = req.app.get('db');
	const errors = [];

	if (Object.keys(errors).length === 0) {
		db.collection('films').insertOne(req.body, (err, r) => {
			if (err) {
				res.status(500).json({ errors: { global: err } });
				console.warn(e);
				return;
			}

			res.json({ film: r.ops[0] });
		});
	} else {
		res.status(400).json({ errors });
		console.warn(e);
	}
});

router.put('/:_id', (req, res) => {
	const db = req.app.get('db');
	const { _id, ...filmData } = req.body;
	const errors = [];

	if (Object.keys(errors).length === 0) {
		db.collection('films').findOneAndUpdate(
			{ _id: new mongodb.ObjectId(req.params._id) },
			{ $set: filmData },
			{ returnOriginal: false },
			(err, r) => {
				if (err) {
					res.status(500).json({ errors: { global: err } });
					console.warn(e);
					return;
				}

				res.json({ film: r.value });
			}
		);
	} else {
		res.status(400).json({ errors });
		console.warn(e);
	}
});

router.delete('/:_id', (req, res) => {
	const db = req.app.get('db');

	db.collection('films').deleteOne(
		{ _id: new mongodb.ObjectId(req.params._id) },
		err => {
			if (err) {
				res.status(500).json({ errors: { global: err } });
				console.warn(e);
				return;
			}

			res.json({ res: `film ${req.params._id} deleted` });
		}
	);
});
router.post('/file', (req, res) => {
	try {
		const db = req.app.get('db');
		console.log('Start working!');

		let form = new formidable.IncomingForm();

		form.mutiples = true;

		form.on('file', (field, file) => {
			console.log('See file');
			let oldPath = file.path;
			let newPath = `./uploads/${file.name}`;

			// fs.rename(oldPath, newPath, err => {
			// 	if (err) {
			// 		console.warn(err);
			// 		res.status(500).json({
			// 			error: { fileupload: err },
			// 		});
			// 	}
			// });

			// fs.readFile(newPath, 'utf8', (err, contents) => {
			fs.readFile(oldPath, 'utf8', (err, contents) => {
				if (err) {
					console.warn(err);
					return;
				}

				let data = contents
					.split('\n\n')
					.map(s => s.trim())
					.filter(Boolean);
				const itemsArrs = data.map(itemStr =>
					itemStr.split('\n').map(line => line.split(': '))
				);

				const items = itemsArrs.map(item =>
					item.reduce(
						(obj, [name, value]) =>
							Object.assign(obj, {
								[camel(name)]: name.endsWith('s')
									? value.split(', ')
									: value,
							}),
						{}
					)
				);

				let itemsJson = JSON.stringify(items, null, 2);
				console.log('itemsJson: ', itemsJson);

				data = JSON.parse(itemsJson);

				console.log('data: ', data);

				for (let i = 0; i < data.length; i++) {
					let errors = [];

					if (Object.keys(errors).length === 0) {
						db.collection('films').insertOne(
							data[i],
							(err, rec) => {
								if (err) {
									console.warn(err);
									return;
								}
							}
						);
					}
				}
			});

			res.end();
		});

		form.on('error', function(err) {
			console.warn('An error has occured: \n' + err);
			res.status(500).json({ error: err });
		});

		form.on('end', function() {
			res.end('success');
		});

		form.parse(req);

		res.status(200).json('Nice!');
	} catch (e) {
		console.warn(e);
		res.status(500).json({ error: e });
	}
});

export default router;
