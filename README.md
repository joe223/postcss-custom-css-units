# PostCSS Custom CSS Units <img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">

<a href="https://www.npmjs.com/package/postcss-custom-css-units" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/postcss-custom-css-units"></a>
<a href="https://travis-ci.org/joe223/postcss-custom-css-units" target="_blank"><img src="https://travis-ci.org/joe223/postcss-custom-css-units.svg?branch=master"></a>

Define custom css unit and convert them to CSS variable.

Input:

```css
:root {
    --cusomt-base-unit: 1vw;
}

div {
    width: 100rpx;
}
```

Output:

```css
div {
    width: calc(var(--cusomt-base-unit) * 100);
}
```

## Installation

```shell
npm install postcss-custom-css-units
```

## Usage

Add `postcss-custom-css-units` plugin to `postcss.config.js`

```javascript
module.exports = {
    plugins: [
        require('postcss-custom-css-units')({
            baseUnit: `--cusomt-base-unit`,
            customUnit: 'rpx'
        })
    ]
}
```

## Options

### **`baseUnit`** (default: `--base-unit`)

CSS variable which you defined. `customUnit` will be converted to that CSS variable.

```css
:root {
    --cusomt-base-unit: 1vw;
}
```

### **`customUnit`** (default: `rpx`)

Custom CSS unit that should be converted.

```css
div {
    width: 100rpx;
}
```

## Optimize CSS performance

CSS variables get even more powerful when we combine them with the calc(). However, performance can become a problem while using calc() and CSS Variables. Here is the solution to reduce CSS calculation and variables if we don't need them in production environment.

Importing `postcss-preset-env` and `postcss-calc`, make sure that `preserve` is false

```javascript
module.exports = {
    plugins: [
        require('postcss-custom-css-units')({
            baseUnit: `--cusomt-base-unit`,
            customUnit: 'rpx'
        }),
        require('postcss-preset-env')({
            // Some other options...
			preserve: false
		}),
		require("postcss-calc", {
			preserve: false
		})
    ]
}
```

Our input CSS

```css
:root {
    --cusomt-base-unit: 10px;
}

div {
    width: 40rpx;
}
```

will becomes to

```css
div {
    width: 400px;
}
```

## LICENSE

[MIT](./LICENSE)
