const times = require('./times.js');
const dl = require('./downloadImg.js');

/**
 * permet de récupérer les titres et années dans le tableau du fichier json et de les retourner après qu'ils ai été modifié avec le bon format
 * @param {objet[]} array tableau d'ojets
 * @return {objet[]} result tableau d'objets modifié
 */
function getAllTitleAndYear(array) {
    let result = array.map (elem => {
        let year = times.convertToYear(elem.release_date);
        elem.title += " (" + year + ")";
        return elem;
    });
    return result;
}

/**
 * permet d'afficher en console tous les films par une date donnée et si save est true et si le lien vers l'image
 du film concerné est existant alors on pourra télécharger l'image des films concernés
 * @param {objet[]} array tableau d'objets
 * @param {string} years année recherchée
 * @param {boolean} save true ou false pour sauvegarder ou non les images
 * @param {string} folder nom du dossier de sortie des images (si besoin de sauvegarder les images)
 */
function getAllMoviesByDate(array, years, save, folder = undefined) {
    let found = false;
    array.forEach (elem => {
        let year = times.convertToYear(elem.release_date);
        if (year == years) {
            found = true;
            console.log(elem.title + " (" + year + ")");
            if (save) {
                if (elem.poster) {
                    dl.downloadImg(elem.poster, folder, elem.title.replace(/[\/:*?"<>|]/g, ' '));
                }
            }
        }
    });
    if (!found) {
        console.log("Aucun Film correspondant à l\'année " + years + " n'a été trouvé")
    }
}

/**
 * permet de récupérer les films par clés et modifier leur typo en les transformants sans maj
 * @param {objet[]} array tableau d'objets
 * @param {string} keyword mot clé recherché
 * @return {objet[]} arrayKey tableau d'objets qui contiennent le mot clé recherché
 */
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

/**
 * permet de récupérer et de retourner les films par genre grâce à un mot clef donné
 * @param {objet[]} array tableau d'ojets
 * @param {string} genre genre recherché
 * @return {objet[]} tab tableau d'objets qui contiennent le genre recherché
 */
function getAllMoviesByGenre(array, genre){
    let tab = [];
    for(let i = 0; i < array.length; i++){
        if(array[i].genres && array[i].genres[0] !== undefined){
            let genreCapitalize = genre.charAt(0).toUpperCase() + genre.substring(1).toLowerCase();
            if(array[i].genres.includes(genre) || array[i].genres.includes(genreCapitalize)){
                tab.push(array[i])
            }
        }
    }
    return tab;
}

module.exports = { getAllMoviesByDate, getAllMoviesByGenre, getAllMoviesByKey, getAllTitleAndYear };