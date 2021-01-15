const fs = require('fs');

/* permet de lire le fichier json et retourner son contenu (les films) */
function readJson(path) {
    const file = fs.readFileSync(path);
    const movies = JSON.parse(file);
    return movies;
}

/* permet d'écrire des données dans un fichier json */
function writeJson(data, outputfile) {
    let donnees = JSON.stringify(data, null, '\t');
    fs.writeFileSync(outputfile, donnees);
}

module.exports = { readJson, writeJson };