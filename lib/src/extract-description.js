const cheerio = require('cheerio');

module.exports = (product) => {

    const $ = cheerio.load(product['Body (HTML)']);

    return new Promise((resolve) => {

        let baseProduct = {
            SKU: null,
            'Long description': null,
            PCF_SPECIFIC: null,
            PCF_FEATURES: null,
            PCF_IMAGE_1	: null,
            PCF_IMAGE_2: null,
            PCF_IMAGE_3	: null,
            PCF_IMAGE_4: null,
            Weight: null,

        };
        let brightPearl = Object.assign(
            baseProduct, {
                SKU: product['Variant SKU'],
                Weight: product['Variant Grams'],
                PCF_IMAGE_1: product['Image Src']
            }),
            headers = $('h4'),
            count = headers.length;

        console.log(`Adding ${count} divs to the dom`);

        let sections = [];

        headers.each((i, elem) => {

            let text = $(elem).text().toLowerCase();

            $(elem).attr('id', text);

            sections.push(text);
        });

        sections.map((text, i) => {

            let next = sections[i + 1];

            console.log(`finding content from ${i} ${text} to ${next}`)

            text === 'description' && (brightPearl['Long description'] = $(`#${text}`).nextUntil(`#${next}`).html());
            text === 'specifications' && (brightPearl['PCF_SPECIFIC'] = $(`#${text}`).nextUntil(`#${next}`).html());
            text === 'features' && (brightPearl['PCF_FEATURES'] = $(`#${text}`).nextUntil(`#${next}`).html());
        });
        
        Object.assign(product, {brightPearl});

        resolve();

    })
};