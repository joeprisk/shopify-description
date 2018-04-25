const fs = require('fs');
const jsonToCsv = require('json2csv');

module.exports = (error, savePath, products) => {

    let message = !!error ? `Error is ${error}` : `${products.length} Products updated`;

    console.log(message);

    products.length ? saveCsv() : console.log('No products to save');

    function saveCsv() {

        let csv = jsonToCsv(
            {
                quotes: '',
                del: '\t',
                data: products,
                fields: Object.keys(products[0])
            }
        );

        fs.writeFile(savePath, csv, (error) => {
            if (error) throw error;
            console.log('file saved');
        });
    }

};

