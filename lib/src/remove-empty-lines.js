module.exports = (product) => {

	Object.keys(product).map(key => {
		!!product[key] && (product[key] = product[key].replace(/\n/g, ''));
	});

	return Promise.resolve();

};