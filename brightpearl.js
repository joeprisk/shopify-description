const csvToJson = require('csvtojson'),
    helpers = require('./lib/helpers');

let products = [],
    skus = [],
    promises = [];

csvToJson()
    .fromFile(helpers.PATHS.load)
    .on(
        'json',
        product => promises.push(
            Promise
                .resolve()
                .then(() => helpers.formatBlankLines(product))
                .then(() => helpers.isFullProduct(product))
                .then(() => helpers.extractDescription(product))
                .then(() => addToProducts(product))
                .catch(() => addToProducts(product))
        )
    )
    .on(
        'done',
        (error) => Promise
            .all(promises)
            .then(() => loadSKU())
            .then(() => buildProducts())
            .then(products => filterProducts(products))
            .then(products => helpers.saveProductBrightPearl(error, helpers.PATHS.brightpearl, products))
    );

function loadSKU() {

    return new Promise((resolve, reject) => {

        csvToJson()
            .fromFile(helpers.PATHS.skuFile)
            .on('json', sku => skus.push(sku.sku))
            .on('done', error => !error && resolve() || reject())
    })
}

function filterProducts(products) {

    return Promise.resolve()
        .then(() => products.filter(product => product && skus.indexOf(product.SKU) !== -1));
}


function addToProducts(product) {

    return Promise.resolve()
        .then(() => createEmptyProduct(product))
        .then(() => helpers.isFullProduct(product))
        .then(() => products[product.Handle].brightPearl = product.brightPearl)
        .catch(() => products[product.Handle].images.push(product));
}

function createEmptyProduct(product) {

    !products[product.Handle] && Object.assign(products, {[product.Handle]: {images: []}});

    return Promise.resolve();
}

function buildProducts() {

    let promises = [],
        data = [];

    Object.keys(products).map(key => {

        promises.push(
            new Promise(resolve => {

                let product = products[key].brightPearl;

                !product && console.log(`no product?!`, key);

                products[key].images.map((image, index) => {

                    index = index + 2; // 0 based and 1 is already filled as standard

                    if (index <= 4) {
                        let key = `PCF_IMAGE_${index}`;
                        product[key] = image['Image Src'];
                    }

                });

                data.push(product) && resolve();
            })
        );

    });

    return Promise
        .all(promises)
        .then(() => data);
}