const times = require('./times.js');
const dl = require('./downloadImg.js');

function getAllTitleAndYear(array) {
    let result = array.map (elem => {
        let year = times.convertToYear(elem.release_date);
        elem.title += " (" + year + ")";
        return elem;
    });
    return result;
}

function getAllMoviesByDate(array, years, save, folder = undefined) {
    let found = false;
    array.forEach (elem => {
        let year = times.convertToYear(elem.release_date);
        if (year == years) {
            found = true;
            console.log(elem.title + " (" + year + ")");
            if (save) {
                if (elem.poster) {
                    dl.downloadImg(elem.poster, folder, elem.title.replace(/[^a-zA-Z0-9]/g, ' '));
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
        let key = elem.overview.toLowerCase();
        if(key.includes(keyword.toLowerCase())){
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
    return tab;
}

module.exports = { getAllMoviesByDate, getAllMoviesByGenre, getAllMoviesByKey, getAllTitleAndYear };