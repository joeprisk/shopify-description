const fs        = require('fs');
const jsonToCsv = require('json2csv');

module.exports = (error, savePath, products) => {

	let message = !!error ? `Error is ${error}` : `${Object.keys(products).length} Products updated`;

	console.log(message);

	let csv = jsonToCsv(
		{
			data: products,
			fields: Object.keys(products[0])
		}
	);

	fs.writeFile(savePath, csv, (error) => {
		if (error) throw error;
		console.log('file saved');
	});
};