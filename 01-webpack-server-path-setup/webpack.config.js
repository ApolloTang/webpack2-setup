const pathResolve = require('path').resolve;
const webpackValidator = require('webpack-validator');

module.exports = env => {
    // These path must be absolute path on running machine
    const absolutePathToSourceFolder = pathResolve('src');
    const absolutePathToBuildFolder = pathResolve('dist');

    console.log( '----- path info -----');
    console.log('__dirname: ', __dirname);
    console.log('absolutePathToSourceFolder: ',  absolutePathToSourceFolder );
    console.log('absolutePathToBuildFolder: ', absolutePathToBuildFolder );
    console.log( '----- path info end -----');

    let config = webpackValidator({
        devServer: {
            contentBase: absolutePathToBuildFolder  // root of the webpack's http dev-server, index.html file server from here
        },
        context: absolutePathToSourceFolder, // context of entrypoint
        entry: {
            // Each key in entry will map to the [name] placeholder in the value of output.filename
            main: './main.js',
            vendor: './vendor.js'
        },
        output: {
            path: absolutePathToBuildFolder,
            filename: 'bundle.[name].js',
            publicPath: '/dist/',  // dev server's output will be served from here. '/' is __dirname
        },
    });
    if (env.debug) {
        console.log('webpack.config: ', config)
    }
    return config;
}


