const pathResolve = require('path').resolve;
// const webpackValidator = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');


// These path must be absolute path on running machine
const absolutePathToSourceFolder = pathResolve('src');
const absolutePathToBuildFolder = pathResolve('dist');
const absolutePathToNodeModules = pathResolve('./node_modules');

module.exports = env => {
    console.log('env: ', env);
    const {ifProd, ifNotProd} = getIfUtils(env);


    console.log( '----- path info -----');
    console.log('__dirname: ', __dirname);
    console.log('absolutePathToSourceFolder: ',  absolutePathToSourceFolder );
    console.log('absolutePathToBuildFolder: ', absolutePathToBuildFolder );
    console.log('absolutePathToNodeModules: ', absolutePathToNodeModules );
    console.log( '----- path info end -----');

    let config = {
        context: absolutePathToSourceFolder, // context of entrypoint
        entry: {
            // Note: Each key in entry will map to the [name] placeholder in the value of output.filename
            vendor: [
                'lodash', // load from node_modules
                './vendor/my-vendor'
            ],
            main: ['./main.js']
        },
        output: {
            path: absolutePathToBuildFolder,
            filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js')
        },
        resolve: {
            // http://moduscreate.com/es6-es2015-import-no-relative-path-webpack/
            // http://stackoverflow.com/questions/27502608/resolving-require-paths-with-webpack
            // https://gist.github.com/sokra/27b24881210b56bbaff7#resolving-options
            // https://github.com/webpack/enhanced-resolve
            modules: [
                absolutePathToSourceFolder,
                absolutePathToNodeModules
            ]
        },
        module: {
            loaders: [
                {
                    test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                    loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
                    //https://github.com/coryhouse/react-slingshot/issues/128
                },
                {
                  test: /\.css$/,
                  loader: ExtractTextPlugin.extract({
                      fallbackLoader: 'style-loader',
                      loader: 'css-loader?modules',
                      // loader: 'css',
                  }),
                  include: absolutePathToSourceFolder
                },
                {
                    test: /\.js$/,
                    loaders: 'babel-loader',
                    exclude: /node_modules/
                }
            ],
        },
        plugins: removeEmpty([
            new ProgressBarPlugin(),
            new HtmlWebpackPlugin({
                template: './index.template.html',
                favicon: './images/favicon.ico'
                // inject: 'head',
            }),
            new ExtractTextPlugin( ifProd('styles.[name].[chunkhash].css', 'styles.[name].css') ),
            ifProd(
                new webpack.optimize.CommonsChunkPlugin({
                    name: [   // Specify the common bundle's name.
                        'vendor',
                        'manifest'
                    ]
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor' // Specify the common bundle's name.
                })
            ),
            ifProd( new InlineManifestWebpackPlugin() )
        ]),
        ////// The next configuration show es5 source code during development mode
        devtool: ifProd(
            'source-map',     // production enviroment: source map in separate file
            'eval'            // non production env:    inline source map
        )
        // ---------
        ////// The next configuration show no code original code during development mode
        // devtool: ifProd(
        //     'source-map',     // production enviroment: source map in separate file
        //     'eval-source-map' // non production env:    inline source map
        // )
        // ---------
        ////// The next configuration won't pause in debugger, and show no code
        // devtool: ifProd(
        //     'cheap-module-eval-source-map',     // production enviroment: source map in separate file
        //     'cheap-module-eval-source-map'      // non production env:    inline source map
        // )
    };
    if (env && env.debug) {
        console.log('webpack.config: ', config)
    }
    // return webpackValidator(config);
    return config;
}


