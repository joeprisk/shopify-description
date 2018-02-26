const cheerio = require('cheerio');

module.exports = (product) => {

    return Promise.resolve()
        .then(() => mergeBase(product))
        .then(() => extractStuff(product));

};

function mergeBase(product) {

    let baseProduct = {
        SKU: null,
        'Long description': null,
        PCF_SPECIFIC: null,
        PCF_FEATURES: null,
        PCF_IMAGE_1: null,
        PCF_IMAGE_2: null,
        PCF_IMAGE_3: null,
        PCF_IMAGE_4: null,
        Weight: null,

    };
    let brightPearl = Object.assign(
        baseProduct, {
            SKU: product['Variant SKU'],
            Weight: product['Variant Grams'],
            PCF_IMAGE_1: product['Image Src']
        });

    Object.assign(product, {brightPearl});

    return Promise.resolve();
}

function extractStuff(product) {

    const $ = cheerio.load(product['Body (HTML)']);

    let headers = $('h4');

    let wanted = {
            'description': 'Long description',
            'specifications': 'PCF_SPECIFIC',
            'features': 'PCF_FEATURES',
        },
        sections = [];

    headers.each((i, elem) => {

        let text = $(elem).text().trim().toLowerCase();

        $(elem).attr('id', text);

        sections.push(text);
    });

    sections.map((text, i) => {

        let next = sections[i + 1];

        if(wanted.hasOwnProperty(text)) {

            product.brightPearl[wanted[text]] = $.html($(`#${text}`).nextUntil(`#${next}`)).replace(/\n/g, '');
        };

    });

    return Promise.resolve();

}