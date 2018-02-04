module.exports = (product) => {

	return new Promise((resolve) => {

		let title = '<h4>Description</h4>',
			description = product['Body (HTML)'].toLowerCase();

		if (
			!description.includes('<h1><strong>description</strong></h1>') && !description.includes('<h1>description</h1>')
		) {
			product['Body (HTML)'] = `${title}${product['Body (HTML)']}`;
		}

		resolve();

	})
};