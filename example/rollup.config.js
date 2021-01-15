import path from 'path'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import htmlTemplate from "rollup-plugin-generate-html-template";
import replace from "@rollup/plugin-replace";
import alias from '@rollup/plugin-alias';
import includePaths from "rollup-plugin-includepaths";
const pathResolve = local => path.resolve(__dirname, local);
export default {
    input: pathResolve('src/index.js'),
    output: {
        name: 'bundle',
        file: pathResolve("dist/js/bundle.js"),
        format: 'iife',//immediately-invoked function expression — suitable for <script> tags
        sourcemap: true,
        plugins: [
            resolve(), // tells Rollup how to find date-fns in node_modules
            // includePaths({
            //     include: { "example": pathResolve("src") },
            // }),
            htmlTemplate({
                template: pathResolve("src/index.html"),
                target: pathResolve("dist/index.html"),
            }),
            commonjs({
                include: "node_modules/**",
                namedExports: { react: ["useState", "Component", "useRef", "useEffect"] }
            }), // converts date-fns to ES modules
            // babel({
            //     // babelHelpers: "bundled",
            //     babelrc: true,
            //     runtimeHelpers: true,
            //     exclude: "**/node_modules/**",
            // }),
            babel(),
            replace({
                "process.env.NODE_ENV": JSON.stringify("development"),
            }),
            alias({
                entries: [
                    { find: "luck-draw", replacement: pathResolve("../src") },
                ]
            })

            // production && terser() // minify, but only in production
        ]
    },
};