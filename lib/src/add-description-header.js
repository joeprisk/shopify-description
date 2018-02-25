module.exports = (product) => {

	return new Promise((resolve) => {

		let title       = '<h4>Description</h4>',
			description = product['Body (HTML)'].toLowerCase();

		if (
			!description.includes('<h4><strong>description</strong></h4>') && !description.includes('<h4>description</h4>')
		) {
			product['Body (HTML)'] = `${title}${product['Body (HTML)']}`;
		}

		resolve();

	})
};