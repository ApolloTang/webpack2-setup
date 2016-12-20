const pathResolve = require('path').resolve;
const webpackValidator = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// These path must be absolute path on running machine
const absolutePathToSourceFolder = pathResolve('src');
const absolutePathToBuildFolder = pathResolve('dist');
const absolutePathToNodeModules = pathResolve('./node_modules');

module.exports = env => {
    console.log('env: ', env);

    console.log( '----- path info -----');
    console.log('__dirname: ', __dirname);
    console.log('absolutePathToSourceFolder: ',  absolutePathToSourceFolder );
    console.log('absolutePathToBuildFolder: ', absolutePathToBuildFolder );
    console.log('absolutePathToNodeModules: ', absolutePathToNodeModules );
    console.log( '----- path info end -----');

    let config = {
        context: absolutePathToSourceFolder, // context of entrypoint
        entry: {
            // Each key in entry will map to the [name] placeholder in the value of output.filename
            main: './main.js',
            vendor: './vendor/index.js'
        },
        output: {
            path: absolutePathToBuildFolder,
            filename: 'bundle.[name].js',
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
                  // loader: 'style-loader!css-loader?modules',
                  include: absolutePathToSourceFolder
                }
            ],
        },
        plugins: [
            new ProgressBarPlugin(),
            new HtmlWebpackPlugin({
                template: './index.template.html',
                favicon: './images/favicon.ico'
                // inject: 'head',
            }),
            new ExtractTextPlugin('styles.[name].css')
        ]
    };
    if (env && env.debug) {
        console.log('webpack.config: ', config)
    }
    // return webpackValidator(config);
    return config;
}


