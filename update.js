const csvToJson        = require('csvtojson'),
	  helpers          = require('./lib/helpers');

let products = {},
	promises = [];

csvToJson()
	.fromFile(helpers.PATHS.load)
	.on(
		'json',
		product => promises.push(
			Promise
				.resolve()
				.then(() => helpers.formatBlankLines(product))
				.then(() => helpers.isFullProduct(product))
				.then(() => helpers.addDescriptionHeader(product))
				.then(() => helpers.editHeaderTags(product))
				.then(() => helpers.removeEmptyLines(product))
				.then(() => helpers.removeEmptyHeaders(product))
				.then(() => addToProducts(product))
				.catch(() => addToProducts(product))
		)
	)
	.on(
		'done',
		(error) => Promise
			.all(promises)
			.then(() => helpers.saveProductToCsv(error, helpers.PATHS.save, products))
	);


function addToProducts(product) {

	return Promise.resolve()
				  .then(() => createEmptyProduct(product))
				  .then(() => helpers.isFullProduct(product))
				  .then(() => console.log(`${product.Title} :: editing product description.`))
				  .then(() => products[product.Handle].unshift(product))
				  .catch(() => products[product.Handle].push(product));
}

function createEmptyProduct(product) {

	!products[product.Handle] && Object.assign(products, {[product.Handle]: []});

	return Promise.resolve();
}





