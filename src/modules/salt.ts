const saltCrypto = require('crypto');

module.exports = {
    MD5_SUFFIX: 'tiny-md5',
    MD5: (str: string) => {
        let md5 = saltCrypto.createHash('md5')
        return md5.update(str).digest('hex');
    }
}