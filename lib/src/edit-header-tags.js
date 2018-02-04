module.exports =  (product) => {

	return new Promise((resolve) => {

		product['Body (HTML)'] = product['Body (HTML)'].replace(/h1/g, 'h4');

		resolve();

	});
};