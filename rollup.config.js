import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
const env = process.env.NODE_ENV;

const config = {
    input: 'src/index.js',
    external: ['react'],
    output: {
        name: 'LuckDraw',
        format: 'umd',
        sourcemap: true,
        globals: {
            react: 'React'
        },
        exports: 'named',
    },
    plugins: [
        resolve(),
        babel({
            babelHelpers: 'bundled',
            exclude: '**/node_modules/**',
        }),
        commonjs(),
        postcss({
            minimize: env === 'production',
            extract: true,
            extensions: ['css', 'scss'],
            // process: processSass,
        }),
    ],
};


if (env === 'production') {
    config.plugins.push(
        uglify({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
            },
            warnings: false
        })
    );

    config.plugins.push(
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    )
}

export default config;
