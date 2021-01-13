
module.exports = { readJson, writeJson, getAllTitleAndYear, getAllMoviesByDate };

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
        elem.title += " (" + year + ")";
        return elem;
    });
    return result;
}

function convertToYear(times) {
    const year = new Date(times * 1000).getFullYear();
    return year;
}

function getAllMoviesByDate(array, years) {
    let found = false;
    array.forEach (elem => {
        let year = convertToYear(elem.release_date);
        if (year === years) {
            found = true;
            console.log("Titre : " + elem.title + " (" + year + ")");
        }
    });
    if (!found) {
        console.log("Aucun Film correspondant à l\'année " + years + " n'a été trouvé")
    }
}