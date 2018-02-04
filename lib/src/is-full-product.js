module.exports = (product) => {

	return (product.Title) ? Promise.resolve() : Promise.reject();
};