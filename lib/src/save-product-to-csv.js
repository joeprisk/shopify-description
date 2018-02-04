const fs        = require('fs');
const jsonToCsv = require('json2csv');

module.exports = (error, savePath, products) => {

	let data    = [],
		message = !!error ? `Error is ${error}` : `${Object.keys(products).length} Products updated`;

	Object.keys(products).map(key => data.push(...products[key]));

	console.log(message);

	let csv = jsonToCsv(
		{
			data: data,
			fields: Object.keys(data[0])
		}
	);

	fs.writeFile(savePath, csv, (error) => {
		if (error) throw error;
		console.log('file saved');
	});
};