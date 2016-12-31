if (process && process.env && process.env.CONSOLE_LOG) {
    console.info('log from file: src/util/helper.js'); // eslint-disable-line no-console
}

export {used, notUsed, constants }

function used () { return 'used' }
function notUsed () {return 'notUsed'}
const constants = { a:'a', b:'b' };
