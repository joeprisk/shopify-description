const fs = require('fs'),
    yaml = require('js-yaml');

const {PATHS} = (() => {

    // Load settings from settings.yml
    let ymlFile = fs.readFileSync('./lib/config.yml', 'utf8');
    return yaml.load(ymlFile);

})();

const amazonDefaultProduct = require('./src/amazon-default-product'),
      addDescriptionHeader = require('./src/add-description-header'),
    editHeaderTags = require('./src/edit-header-tags'),
    formatBlankLines = require('./src/format-blank-lines'),
    isFullProduct = require('./src/is-full-product'),
    removeEmptyHeaders = require('./src/remove-empty-headers'),
    removeEmptyLines = require('./src/remove-empty-lines'),
    saveProductToCsv = require('./src/save-product-to-csv'),
    saveProductAmazon = require('./src/save-product-to-amazon'),
    saveProductBrightPearl = require('./src/save-product-to-brightpearl'),
    extractDescription = require('./src/extract-description');

module.exports = {
    amazonDefaultProduct,
    addDescriptionHeader,
    editHeaderTags,
    formatBlankLines,
    isFullProduct,
    removeEmptyLines,
    removeEmptyHeaders,
    saveProductToCsv,
    saveProductAmazon,
    saveProductBrightPearl,
    PATHS,
    extractDescription
};