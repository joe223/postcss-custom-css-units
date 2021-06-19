import postcss, { Result }  from 'postcss'
import plugin, { PostCSSCustomCSSUnitsOptions } from '../src'

async function run(input: string, options?: PostCSSCustomCSSUnitsOptions): Promise<Result> {
    return await postcss([plugin(options)]).process(input, {from: undefined});
}

describe('transform custom unit', () => {
    it('does nothing with original unit', async () => {
        const { css } = await run(
            ':root {--cusomt-base-unit: 1vw;}div {width: 100px;}'
        )
        
        expect(css).toEqual(
            ':root {--cusomt-base-unit: 1vw;}div {width: 100px;}'
        )
    })

    it('transform custom unit', async () => {
        const { css } = await run(
            ':root {--cusomt-base-unit: 1vw;}div {width: 100rpx;}'
        )
        
        expect(css).toEqual(
            ':root {--cusomt-base-unit: 1vw;}div {width: calc(var(--base-unit) * 100);}'
        )
    })

    it('transform multiple custom unit', async () => {
        const { css } = await run(
            ':root {--cusomt-base-unit: 1vw;}' +
            'div {margin: 100rpx auto 100rpx auto;}' +
            'span {width: 100rpx;}'
        )
        
        expect(css).toEqual(
            ':root {--cusomt-base-unit: 1vw;}' +
            'div {margin: calc(var(--base-unit) * 100) auto calc(var(--base-unit) * 100) auto;}' +
            'span {width: calc(var(--base-unit) * 100);}'
        )
    })


    it('ignore invalid unit', async () => {
        const { css } = await run(
            ':root {--cusomt-base-unit: 1vw;}div {margin: 100tpx 100rpx 100rpx auto;}'
        )
        
        expect(css).toEqual(
            ':root {--cusomt-base-unit: 1vw;}div {margin: 100tpx calc(var(--base-unit) * 100) calc(var(--base-unit) * 100) auto;}'
        )
    })

    it('keep decimal data', async () => {
        const { css } = await run(
            ':root {--cusomt-base-unit: 1vw;}div {margin: 1.01rpx .01rpx auto;}'
        )
        
        expect(css).toEqual(
            ':root {--cusomt-base-unit: 1vw;}div {margin: calc(var(--base-unit) * 1.01) calc(var(--base-unit) * 0.01) auto;}'
        )
    })
})