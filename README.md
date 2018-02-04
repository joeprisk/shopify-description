# shopify product description editor

A very quick cli tool to edit shopify products export

## Problem

Shopify product data contains lots of h1 headers, where a new wanted tab tool only accepts h4 to make the tabs.
Also the html may not be formatted to understand multiple h1's correctly

## solution

The best solution would be to fix the templates and manually fix the tab plugin, but instead the quickest painless route is to bulk edit the product descriptions.

script loads in csv export from shopify, and formats all blank fields to null, or the importer has issue on the way back in.
convert all h1 -> h4 tags
any that do not have a description header get one added
some that I encountered had empty h1 tags which are stripped
probably some omre editing will go aswell.

This is intended not to be used by anyone else ever.
It is aimed to be used with the shopify built in exporter and importer of products.

## Run
```js
npm i
node update.js
```
