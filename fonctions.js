
module.exports = { readJson, writeJson, getAllTitleAndYear, getAllMoviesByDate, tri_rapide, searchBinarie, decremente, incremente, display, getAllMoviesByKey, getAllMoviesByGenre, downloadImg, getIndex, checkParamFile };

const fs = require('fs');
const request = require('request');

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

function getAllMoviesByDate(array, years, save, folder = undefined) {
    let found = false;
    array.forEach (elem => {
        let year = convertToYear(elem.release_date);
        if (year == years) {
            found = true;
            console.log(elem.title + " (" + year + ")");
            if (save) {
                if (elem.poster) {
                    downloadImg(elem.poster, folder, elem.title.replace(/[^a-zA-Z0-9]/g, ' '));
                }
            }
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

function display(array, min, max, save, folder = undefined) {
    for (i = min; i <= max; i++) {
        console.log(array[i].title);
        if (save) {
            if (array[i].poster) {
                downloadImg(array[i].poster, folder, array[i].title.replace(/[^a-zA-Z0-9]/g, ' '));
            }
        }
    }
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

download = (url, folder, filename, callback) => {
    request.head(url, (err, res, body) => {
        request(url).pipe(fs.createWriteStream(folder + "/" + filename + ".png")).on('close', callback)
    });
}

function downloadImg(url, folder, filename) {
    checkFolderExist(folder);
    download(url, folder, filename, () => {})
}

function getIndex(array, search) {
    if (array.includes(search)) {
        return array.indexOf(search);
    }
}

function checkParamFile(inputFile, outputFile){
    let test = "coucou ca va ?";
    let isValid = false;
    if(inputFile && outputFile){
        if(inputFile.endsWith(".json")){
            console.log("END BY .JSON");
            let fs = require('fs');

            try {
                fs.statSync(inputFile);
                console.log('file or directory exists');
                if(outputFile.endsWith(".json") || outputFile.endsWith(".txt")){
                    console.log('Fichier de sortie valide');
                    isValid = true;
                } else if(!outputFile.includes('.')){
                    isValid = true;
                } else {
                    console.log("Le fichier de sortie doit être en .json ou en .txt UNIQUEMENT");
                }
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    console.log('Veuillez entrer le nom d\'un fichier existant');
                }
            }
        } else {
            console.log("Veuillez entrer un fichier .json comme fichier d'entré");
        }
        
    } else {
        console.log('Veuillez entrer vos fichier d\'entré et de sortie ou vos paramètres');
    }
    return isValid;
}