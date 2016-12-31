if (process && process.env && process.env.CONSOLE_LOG) {
    console.info('log from file: src/vendor/my-vendor.js'); // eslint-disable-line no-console
}

const myVendor = { name:'myVendor' };
export default myVendor;
