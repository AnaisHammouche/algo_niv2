const fs = require('fs');
const request = require('request');

download = (url, folder, filename, callback) => {
    request.head(url, (err, res, body) => {
        request(url).pipe(fs.createWriteStream(folder + "/" + filename + ".png")).on('close', callback)
    });
}

function downloadImg(url, folder, filename) {
    checkFolderExist(folder);
    download(url, folder, filename, () => {})
}

function checkFolderExist(folder) {
    try {
        fs.statSync(folder);
    }
    catch {
        fs.mkdir(folder, callback => {
        });
    }
}

module.exports = { downloadImg };