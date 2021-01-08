'use strict';

var postcss = require('postcss');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var postcss__default = /*#__PURE__*/_interopDefaultLegacy(postcss);

var index = postcss__default['default'].plugin('postcss-responsive-unit', (options = {
    baseUnit: `--base-unit`,
    customUnit: 'rpx'
}) => {
    const {
        baseUnit,
        customUnit
    } = options;
    const tester = new RegExp(`((\\d+)?\.)?\\d+${customUnit}`);

    return function (root) {
        root.replaceValues(tester, {
            fast: customUnit
        }, val => `calc(var(${baseUnit}) * ${parseFloat(val)})`);
    }
    // For: postcss@8.0.0
    // Before: https://github.com/postcss/postcss-calc/blob/master/src/index.js
    // return {
    //   Once (root) {
    //     root.replaceValues(new RegExp(`\\d+${customUnit}`), { fast: customUnit }, (string) => {
    //       return `calc(var(${baseUnit}) * ${parseInt(string)})`
    //     })
    //   }
    // }
});

module.exports = index;
