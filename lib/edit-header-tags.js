module.exports =  (product) => {

	return new Promise((resolve) => {

		console.log(`Editing product description for ${product.Title}`);

		product['Body (HTML)'] = product['Body (HTML)'].replace(/h1/g, 'h4');

		resolve();

	});
};