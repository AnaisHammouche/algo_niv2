
module.exports = { readJson, writeJson, getAllTitleAndYear, getAllMoviesByDate, tri_rapide, getAllMoviesByKey, getAllMoviesByGenre };

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
        if (year == years) {
            found = true;
            console.log("Titre : " + elem.title + " (" + year + ")");
        }
    });
    if (!found) {
        console.log("Aucun Film correspondant à l\'année " + years + " n'a été trouvé")
    }
}

function getAllMoviesByKey(array, keyword){
    let arrayKey = [];
    array.forEach( elem => {
        let key = elem.overview;
        if(key.includes(keyword)){
            // console.log("Titre : " + elem.title + "\nDescription : " + elem.overview);
            arrayKey.push(elem);
        }
    });
    return arrayKey;
}
function getAllMoviesByGenre(array, genre){
    array.forEach( elem => {
        let key = elem.genres;
        if(key.includes(genre)){
            // console.log("Titre : " + elem.title + "\nDescription : " + elem.overview + "\nGenre : " + elem.genres + "\n");
            // console.log("Titre : " + elem.title);
            console.log(elem);
        }
    });
}

function tri_rapide(t, first, last, sortBy) {
    if (first < last) {
        let pivot = Math.ceil((first + last) / 2);
        pivot = partitionner(t, first, last, pivot, sortBy);
        tri_rapide(t, first, pivot - 1, sortBy);
        tri_rapide(t, pivot + 1, last, sortBy);
    }
    return t;
}

function swap(t, a, b) {
    let temp = t[b];
    t[b] = t[a];
    t[a] = temp;
}

function partitionner(t, first, last, pivot, sortBy) {
    swap(t, pivot, last);
    let j = first;
    for (i = first; i <= last - 1; i++) {

        if (sortBy === "title") {
            if (t[i].title <= t[last].title) {
                swap(t, i, j);
                j = j + 1;
            }
        }
        
        if (sortBy === "release_date") {
            if (t[i].release_date <= t[last].release_date) {
                swap(t, i, j);
                j = j + 1;
            }
        }
    }
    swap(t, last, j);
    return j;
}