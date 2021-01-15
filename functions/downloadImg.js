const fs = require('fs');
const request = require('request');

download = (url, folder, filename, callback) => {
    request.head(url, (err, res, body) => {
        request(url).pipe(fs.createWriteStream(folder + "/" + filename + ".png")).on('close', callback)
    });
}

/* permet de télécharger l'image d'un URL et de l'enregistrer dans un dossier */
function downloadImg(url, folder, filename) {
    checkFolderExist(folder);
    download(url, folder, filename, () => {})
}

/* permet de vérifier si le dossier existe en renvoyant les détails du chemin du fichier existant sinon elle créera le dossier*/
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