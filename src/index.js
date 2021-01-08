import postcss from 'postcss'

export default postcss.plugin('postcss-responsive-unit', (options = {
    baseUnit: `--base-unit`,
    customUnit: 'rpx'
}) => {
    const {
        baseUnit,
        customUnit
    } = options
    const tester = new RegExp(`((\\d+)?\.)?\\d+${customUnit}`)

    return function (root) {
        root.replaceValues(tester, {
            fast: customUnit
        }, val => `calc(var(${baseUnit}) * ${parseFloat(val)})`)
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
})
