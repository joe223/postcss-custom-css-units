"use strict";
exports.__esModule = true;
var PLUGIN_NAME = 'postcss-responsive-unit';
exports["default"] = (function (options) {
    if (options === void 0) { options = {
        baseUnit: "--base-unit",
        customUnit: 'rpx'
    }; }
    var baseUnit = options.baseUnit, customUnit = options.customUnit;
    var tester = new RegExp("((\\d+)?\\.)?\\d+" + customUnit, 'g');
    // For: postcss@8.0.0
    // Before: https://github.com/postcss/postcss-calc/blob/master/src/index.js
    return {
        postcssPlugin: PLUGIN_NAME,
        Once: function (root) {
            root.replaceValues(tester, {
                fast: customUnit
            }, function (str) {
                return "calc(var(" + baseUnit + ") * " + parseFloat(str) + ")";
            });
        }
    };
});
