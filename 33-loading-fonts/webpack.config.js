const pathResolve = require('path').resolve;
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
        devServer: {
            hot: ifNotProd(),
            host: '0.0.0.0',
            historyApiFallback: true,
        },
        context: absolutePathToSourceFolder, // context of entrypoint
        entry: {
            // Note: Each key in entry will map to the [name] placeholder in the value of output.filename
            vendor: [
                'lodash', // load from node_modules
                './vendor/my-vendor',
                './vendor/oban'
            ],
            common: [
                './common/styles-init/index.less',
                './common/fonts'
            ],
            main: removeEmpty([
                // next three items are for HMR
                ifNotProd('webpack-dev-server/client?http://0.0.0.0:8080'),
                ifNotProd('webpack/hot/only-dev-server'),
                ifNotProd('react-hot-loader/patch'),
                './main',
            ])
        },
        output: {
            pathinfo: ifNotProd(),
            path: absolutePathToBuildFolder,
            filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js')
        },
        resolve: {
            modules: [
                absolutePathToSourceFolder,
                absolutePathToNodeModules,
            ],
            extensions: ['.js', '.jsx', '.json', '.css', '.less'] // enables users to leave off the extension when importing
        },
        module: {
            loaders: removeEmpty([
                {
                    // test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                    test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
                    // loader: 'file-loader?publicPath=../&name=./imgs/[name].[ext]',  // <-- retain original file name
                    loader: 'file-loader?name=./imgs/[name].[ext]'  // <-- retain original file name
                },
                {
                    test: /\.(woff|woff2|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
                    // loader: 'file-loader?publicPath=../&name=fonts/[name].[hash].[ext]'  // <-- retain original file name
                    loader: 'file-loader?&name=fonts/[name].[ext]'  // <-- retain original file name
                },
                ifProd(
                    {
                      test: /\.(less|css)$/,
                      loader: ExtractTextPlugin.extract({
                          fallbackLoader: 'style-loader',
                          loader: 'css-loader!less-loader',
                      }),
                      include: absolutePathToSourceFolder
                    },
                    {
                      test: /\.(less|css)$/,
                      loader: 'style-loader!css-loader!less-loader',
                      include: absolutePathToSourceFolder
                    }
                ),
                {
                    test: /\.jsx?$/,
                    loaders: 'babel-loader',
                    exclude: /node_modules/
                }
            ]),
        },
        plugins: removeEmpty([
            new ProgressBarPlugin(),
            new HtmlWebpackPlugin({
                template: './index.template.html',
                favicon: './common/images/favicon.ico'
                // inject: 'head',
            }),
            ifProd( new ExtractTextPlugin('styles.[name].[chunkhash].css')),
            ifProd(
                new webpack.optimize.CommonsChunkPlugin({
                    name: [   // Specify the common bundle's name.
                        'vendor',
                        'common',
                        'manifest'
                    ]
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: [
                        'vendor', // Specify the common bundle's name.
                        'common'
                    ]
                })
            ),
            ifNotProd( new webpack.HotModuleReplacementPlugin() ),
            new webpack.NamedModulesPlugin(),
            ifProd( new InlineManifestWebpackPlugin() )
        ]),
        ////// The next configuration show es5 source code during development mode
        // devtool: ifProd(
        //     'source-map',     // production enviroment: source map in separate file
        //     'eval'            // non production env:    inline source map
        // )
        // ---------
        ////// The next configuration show no code original code during development mode
        devtool: ifProd(
            'source-map',     // production enviroment: source map in separate file
            'eval-source-map' // non production env:    inline source map
        )
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
    return config;
}


