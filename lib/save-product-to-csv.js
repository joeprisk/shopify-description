const fs = require('fs');
const jsonToCsv = require('json2csv');

const csvPathSave = './csv/edited-products.csv';

module.exports = (error, products) => {

	// convert products back to one big data
	let data = [];

	Object.keys(products).map((key) => {

		data.push(...products[key]);

	});

	let message = !!error ? `Error is ${error}` : `${data.length} Products updated`;

	console.log(message);

	let csv = jsonToCsv(
		{
			data: data,
			fields: Object.keys(data[0])
		}
	);

	fs.writeFile(csvPathSave, csv, function (err) {
		if (err) throw err;
		console.log('file saved');
	});
};