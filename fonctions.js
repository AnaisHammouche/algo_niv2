
module.exports = { readJson, writeJson, getAllTitleAndYear, getAllMoviesByDate, tri_rapide, searchBinarie, decremente, incremente, display, getAllMoviesByKey, getAllMoviesByGenre };

const fs = require('fs');
const { nextTick } = require('process');


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
            console.log(elem.title + " (" + year + ")");
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
    let tab = [];
    for(let i = 0; i < array.length; i++){
        if(array[i].genres){
            if(array[i].genres.includes(genre)){
                tab.push(array[i])
            }
        }
    }
    return tab[0];
    
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

function searchBinarie(tableau, min, max, search) {
    let index = Math.floor((min + max) / 2);

    if (search == convertToYear(tableau[index].release_date)) {
        return index;
    }
    if (search < convertToYear(tableau[index].release_date)) {
        return searchBinarie(tableau, min, index - 1, search);
    }
    else {
        return searchBinarie(tableau, index + 1, max, search);
    }
}

function decremente(array, index, search) {
    for (i = index; convertToYear(array[i].release_date) == search; i--) {
        index = i;
    }
    return index;
}
function incremente(array, index, search) {
    for (i = index; convertToYear(array[i].release_date) == search; i++) {
        index = i;
    }
    return index;
}

function display(array, min, max) {
    for (i = min; i <= max; i++) {
        console.log(array[i].title);
    }
}