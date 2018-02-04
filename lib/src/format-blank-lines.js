module.exports = (product) => {

	Object.keys(product).map(key => {
		product[key] = !!product[key] ? product[key] : null;
	});

	return Promise.resolve()

};