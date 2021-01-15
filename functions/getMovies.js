const times = require('./times.js');
const dl = require('./downloadImg.js');

/* permet de récupérer les titres et années dans le tableau du fichier json et de les retourner après qu'ils ai été modifié avec le bon format*/
function getAllTitleAndYear(array) {
    let result = array.map (elem => {
        let year = times.convertToYear(elem.release_date);
        elem.title += " (" + year + ")";
        return elem;
    });
    return result;
}

/* permet de récupérer tous les films par date du fichier json et d'executer une fontion de conversion des elements au format souhaité pour permettre aux dates
de s'afficher au bon format + si l'element est save et si le lien vers l'image du film concerné est existant alors on pourra télécharger l'image du films concerné 
sinon s'affichera un message dans la console*/

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

/* permet de récupérer les films par clés et modifier leur typo en les transformants sans maj*/
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

/* permet de récupérer et de retourner les films par genre grâce à un mot clef donné */
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