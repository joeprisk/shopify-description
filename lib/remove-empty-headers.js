module.exports = (product) => {

	product['Body (HTML)'] = product['Body (HTML)'].replace(/<h4><\/h4>/g, '');

	return Promise.resolve();
};