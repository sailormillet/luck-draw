import path from 'path'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import htmlTemplate from "rollup-plugin-generate-html-template";
import replace from "@rollup/plugin-replace";
import alias from '@rollup/plugin-alias';
import scss from 'rollup-plugin-scss'
import sass from 'node-sass'
// 使rollup可以使用postCss处理样式文件less、css等
import postcss from 'rollup-plugin-postcss';

// import includePaths from "rollup-plugin-includepaths";
const pathResolve = local => path.resolve(__dirname, local);
console.log(process.env.NODE_ENV)
// const isProductionEnv = process.env.NODE_ENV === 'production'
// const processSass = function (context, payload) {
//     console.log(1111, context)
//     return new Promise((resolve, reject) => {
//         sass.render({
//             file: pathResolve(`dist/${context}`)
//         }, function (err, result) {
//             console.log(2222222222222222, result)
//             if (!err) {
//                 resolve(result);
//             } else {
//                 reject(err)
//             }
//         });
//     })
// }
export default {
    input: pathResolve('src/index.js'),
    output: {
        file: pathResolve("dist/bundle.js"),
        // name: 'bundaaale',
        format: 'iife',//immediately-invoked function expression — suitable for <script> tags
        sourcemap: true,
    },
    // watch: {
    //     include: 'src/**'
    // },
    plugins: [
        postcss({
            plugins: [
                // simplevars(),
                // nested(),
                // cssnext({ warnForDuplicates: false, }),
                // postcssPresetEnv(),
                // cssnano(),
            ],
            // minimize: isProductionEnv,
            extract: true,
            // extract: pathResolve("dist/css/bundle.css"),
            // 处理.css和.less文件
            extensions: ['css', 'scss'],
            // process: processSass,
        }),
        resolve(), // tells Rollup how to find date-fns in node_modules
        // includePaths({
        //     include: { "example": pathResolve("src") },
        // }),
        htmlTemplate({
            template: pathResolve("src/index.html"),
            target: pathResolve("dist/index.html"),
        }),
        babel({
            babelHelpers: "bundled",
            exclude: "**/node_modules/**",
        }),
        commonjs(), // converts date-fns to ES modules
        replace({
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
        alias({
            entries: [
                { find: "luck-draw", replacement: pathResolve("../src") },
            ]
        }),
        // scss({
        //     // output: true,
        //     output: pathResolve("dist/css/bundle.css"),
        //     processor: css => {
        //         console.log(css)
        //         return css.replace('/*date*/', '/* ' + new Date().toJSON() + ' */')
        //     },
        //     failOnError: true,
        //     // output: function (styles, styleNodes) {
        //     //     console.log(styles, styleNodes)
        //     //     // writeFileSync('bundle.css', styles)
        //     // },
        // }),

        // production && terser() // minify, but only in production
    ]
};