const fs = require('fs');
const request = require('request');

download = (url, folder, filename, callback) => {
    request.head(url, (err, res, body) => {
        request(url).pipe(fs.createWriteStream(folder + "/" + filename + ".png")).on('close', callback)
    });
}

/**
 * permet de télécharger l'image d'un URL et de l'enregistrer dans un dossier
 * @param {string} url url de l'image à télécharger
 * @param {string} folder nom du dossier dans lequel enregistrer les images
 * @param {string} filename nom de sortie de l'image enregistrée
 */
function downloadImg(url, folder, filename) {
    checkFolderExist(folder);
    download(url, folder, filename, () => {})
}

/**
 * permet de vérifier si le dossier existe sinon elle créera le dossier
 * @param {string} folder nom du dossier à vérifier
 */
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