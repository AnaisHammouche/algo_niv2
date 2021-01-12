
const fs = require('fs');

function readJson(path) {
    const file = fs.readFileSync(path);
    const movies = JSON.parse(file);
    return movies;
}


function writeJson(data, outputfile) {
    let donnees = JSON.stringify(data);
    fs.writeFileSync(outputfile, donnees);
}

function getAllMoviesFromJson(array) {
    let result = array.map (elem => {
        return elem;
    });
    return result;
}

module.exports = { readJson, writeJson, getAllMoviesFromJson };