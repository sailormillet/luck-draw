
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
// import nested from "postcss-nested";
// import cssnext from "postcss-cssnext";
// import cssnano from "cssnano";
// import css from 'rollup-plugin-css-only' // 提取css
// import CleanCSS from 'clean-css'   // 压缩css
import { writeFileSync } from 'fs' // 写文件
const env = process.env.NODE_ENV;

const config = {
    input: 'src/index.js',
    //告诉rollup不要将此lodash打包，而作为外部依赖
    external: ["react"],
    // 是否开启代码分割
    experimentalCodeSplitting: true,
    output: {
        // dir: "lib",
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
        // commonjs({
        //     include: ["node_modules/**"]
        //   }),
        postcss({
            minimize: env === 'production',
            extract: true,
            extensions: ["scss", "less", "css"],
            // plugins: [nested(), cssnext({ warnForDuplicates: false }), cssnano()],
            // extract: false // 无论是 dev 还是其他环境这个配置项都不做 样式的抽离
        }),
        // eslint({
        //     include: ["src/**/*.js"],
        //     exclude: ["src/styles/**"]
        //   }),
        //   replace({
        //     "process.env.NODE_ENV": JSON.stringify(env)
        //   }),
        //   env === "production" && uglify()
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
