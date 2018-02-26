const csvToJson        = require('csvtojson'),
	  helpers          = require('./lib/helpers');

let products = [],
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
                    .then(() => helpers.extractDescription(product))
                    .then(() => addToProducts(product))
                    .catch(()  => addToProducts(product))
            )
	)
	.on(
		'done',
		(error) => Promise
			.all(promises)
			.then(() => helpers.saveProductBrightPearl(error, helpers.PATHS.brightpearl, products))
	);


function addToProducts(product) {

	return Promise.resolve()
				  .then(() => createEmptyProduct(product))
				  .then(() => helpers.isFullProduct(product))
				  .then(() => products[product.Handle].brightPearl = product.brightPearl)
				  .catch(() => products[product.Handle].images.push(product));
}

function createEmptyProduct(product) {

	!products[product.Handle] && Object.assign(products, {[product.Handle]: {images: []}});

	return Promise.resolve();
}





