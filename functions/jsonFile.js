const fs = require('fs');

/**
 * permet de lire le fichier json et retourner son contenu (les films)
 * @param {string} path chemin complet du fichier à lire
 * @return le contenu du fichier json (un tableau d'objet ici)
 */
function readJson(path) {
    const file = fs.readFileSync(path);
    const movies = JSON.parse(file);
    return movies;
}

/**
 * permet d'écrire des données dans un fichier json
 * @param {objet[]} data un tableau d'objets
 * @param {string} outputfile nom du fichier de sortie
 */
function writeJson(data, outputfile) {
    let donnees = JSON.stringify(data, null, '\t');
    fs.writeFileSync(outputfile, donnees);
}

module.exports = { readJson, writeJson };