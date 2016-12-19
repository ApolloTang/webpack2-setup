const pathResolve = require('path').resolve;
const webpackValidator = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');


// These path must be absolute path on running machine
const absolutePathToSourceFolder = pathResolve('src');
const absolutePathToBuildFolder = pathResolve('dist');

module.exports = env => {
    console.log('env: ', env);

    console.log( '----- path info -----');
    console.log('__dirname: ', __dirname);
    console.log('absolutePathToSourceFolder: ',  absolutePathToSourceFolder );
    console.log('absolutePathToBuildFolder: ', absolutePathToBuildFolder );
    console.log( '----- path info end -----');

    let config = webpackValidator({
        // devServer: {
        //     contentBase: absolutePathToBuildFolder  // root of the webpack's http dev-server, index.html file server from here
        // },
        context: absolutePathToSourceFolder, // context of entrypoint
        entry: {
            // Each key in entry will map to the [name] placeholder in the value of output.filename
            main: './main.js',
            vendor: './vendor/index.js'
        },
        output: {
            path: absolutePathToBuildFolder,
            filename: 'bundle.[name].js',
            // publicPath: '/dist/',  // dev server's output will be served from here. '/' is __dirname
        },
        plugins: [
            new ProgressBarPlugin(),
            new HtmlWebpackPlugin({
                template: './index.template.html',
                // inject: 'head',
            })
        ]
    });
    if (env && env.debug) {
        console.log('webpack.config: ', config)
    }
    return config;
}


