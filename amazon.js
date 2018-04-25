const csvToJson = require('csvtojson'),
      helpers   = require('./lib/helpers');

let products = [],
    promises = [];

csvToJson()
    .fromFile("csv/amazon-all.csv")
    .on(
        'json',
        product => promises.push(
            Promise
                .resolve()
                .then(() => format(product))
                .then(() => addToProducts(product))
                .catch(() => console.log(`Something went wrong with ${product.sku}`))
        )
    )
    .on(
        'done',
        (error) => Promise
            .all(promises)
            .then(() => helpers.saveProductAmazon(error, 'csv/amazon-import.csv', products))
            .catch(error => console.log(error))
    );

function format(product) {


    let needed = {"sku": product.sku, "merchant-shipping-group-name" : product.shipping};

    Object.assign(product, helpers.amazonDefaultProduct, needed);

    Object.keys(product).map(field => !helpers.amazonDefaultProduct.hasOwnProperty(field) && delete product[field]);

    return Promise.resolve();
}

function addToProducts(product) {

    return Promise.resolve()
        .then(() => products.push(product));
}