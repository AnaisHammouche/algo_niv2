
module.exports = { readJson, writeJson, getAllTitleAndYear, convertToYear };

const fs = require('fs');


function readJson(path) {
    const file = fs.readFileSync(path);
    const movies = JSON.parse(file);
    return movies;
}


function writeJson(data, outputfile) {
    let donnees = JSON.stringify(data, null, '\t');
    fs.writeFileSync(outputfile, donnees);
}

function getAllTitleAndYear(array) {
    let result = array.map (elem => {
        let year = convertToYear(elem.release_date);
        elem.title = elem.title + " (" + year + ")";
        return elem;
    });
    return result;
}

function convertToYear(times) {
    const year = new Date(times * 1000).getFullYear();
    return year;
}