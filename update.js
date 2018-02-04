const csvToJson = require('csvtojson');

const addDescriptionTitle = require('./lib/add-description-header');
const editHeaderTags = require('./lib/edit-header-tags');
const removeEmptyHeaders = require('./lib/remove-empty-headers');
const saveProductToCsv = require('./lib/save-product-to-csv');

const csvPathLoad = './csv/products.csv';

let products = {};

csvToJson()
	.fromFile(csvPathLoad)
	.on('json', product => {

		return Promise.resolve()
			.then(() => {

				Object.keys(product).map((key, index) => {
					product[key] = !!product[key] ? product[key] : null;
				});

			})
			.then(() => isFullProduct(product))
			.then(() => addDescriptionTitle(product))
			.then(() => editHeaderTags(product))
			.then(() => removeEmptyLines(product))
			.then(() => removeEmptyHeaders(product))
			.then(() => addToProducts(product))
			.catch(() => addToProducts(product));


	})
	.on('done', (error) => saveProductToCsv(error, products));

function isFullProduct(product) {

	return (product.Title) ? Promise.resolve() : Promise.reject();
}

function addToProducts(product) {

	!products[product.Handle] && Object.assign(products, {[product.Handle]: []});

	products[product.Handle].push(product);
}

function removeEmptyLines(product) {

	Object.keys(product).map(function (key, index) {
		!!product[key] && (product[key] = product[key].replace(/\n/g, ''));
	});

	return Promise.resolve();

}



