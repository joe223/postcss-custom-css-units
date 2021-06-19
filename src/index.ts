import {
    Root 
} from 'postcss'

const PLUGIN_NAME = 'postcss-responsive-unit'
export interface PostCSSCustomCSSUnitsOptions {
    baseUnit: string | '--base-unit',
    customUnit: string | 'rpx'
}

export default (options: PostCSSCustomCSSUnitsOptions = {
    baseUnit: `--base-unit`,
    customUnit: 'rpx'
})=> {
    const {
        baseUnit,
        customUnit
    } = options
    const tester = new RegExp(`((\\d+)?\\.)?\\d+${customUnit}`, 'g')

    // For: postcss@8.0.0
    // Before: https://github.com/postcss/postcss-calc/blob/master/src/index.js
    return {
        postcssPlugin: PLUGIN_NAME,
        Once (root: Root) {
            root.replaceValues(tester, { 
                fast: customUnit 
            }, (str: string) => {
                return `calc(var(${baseUnit}) * ${parseFloat(str)})`
            })
        }
      }
}
