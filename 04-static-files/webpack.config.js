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
        module: {
            loaders: [
                {
                    test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                    loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
                    //https://github.com/coryhouse/react-slingshot/issues/128
                }
            ],
        },
        plugins: [
            new ProgressBarPlugin(),
            new HtmlWebpackPlugin({
                template: './index.template.html',
                favicon: './images/favicon.ico'
                // inject: 'head',
            })
        ]
    });
    if (env && env.debug) {
        console.log('webpack.config: ', config)
    }
    return config;
}


