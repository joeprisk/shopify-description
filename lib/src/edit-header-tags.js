module.exports = (product) => {

	return new Promise((resolve) => {

		product['Body (HTML)'] = product['Body (HTML)'].replace(/h1/g, 'h4');
		product['Body (HTML)'] = product['Body (HTML)'].replace(/h2/g, 'h4');
		product['Body (HTML)'] = product['Body (HTML)'].replace(/h3/g, 'h4');

		product['Body (HTML)'] = product['Body (HTML)'].replace(/<h4[^>]*>([\s\S]*?)<\/h4>/g, (capture, contents) => {

			return `<h4>${
				contents.replace(
					/\w\S*/g,
					txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
				)
				}</h4>`;
		});


		product['Body (HTML)'] = product['Body (HTML)'].replace(/<h4[^>]*>([\s\S]*?)<\/h4>/g, (capture, contents) => {

			return `<h4>${
				contents === 'Specification' && `${contents}s` || contents
				}</h4>`;
		});

		resolve();

	});
};
