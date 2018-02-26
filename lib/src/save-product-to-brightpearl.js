const fs        = require('fs');
const jsonToCsv = require('json2csv');

module.exports = (error, savePath, products) => {

	let data    = [],
		message = !!error ? `Error is ${error}` : `${Object.keys(products).length} Products updated`;

    Object.keys(products).map(key => {

    	let product = products[key].brightPearl;

        products[key].images.map((image, index) => {

        	index = index + 2; // 0 based and 1 is already filled as standard

			if(index <= 4) {
                let key = `PCF_IMAGE_${index+2}`;
				product[key] = image['Image Src'];
			}

		});

        data.push(product);

	});
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