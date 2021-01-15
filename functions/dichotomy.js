const times = require('./times.js');
const dl = require('./downloadImg.js');

/**
 * effectue une recherche binaire dans le tableau afin de retourner l'index de la date recherchée. Permet de trouver un film à une date souhaitée
 * @param {objet[]} tableau tableau d'objets
 * @param {number} min index minimum du tableau
 * @param {number} max index maximum du tableau
 * @param {string} search l'année recherchée
 * @return {number} index renvoie l'index du tableau ou a été trouvée la date recherchée
 */
function searchBinarie(tableau, min, max, search) {
    let index = Math.floor((min + max) / 2);

    if (search == times.convertToYear(tableau[index].release_date)) {
        return index;
    }
    if (search < times.convertToYear(tableau[index].release_date)) {
        return searchBinarie(tableau, min, index - 1, search);
    }
    else {
        return searchBinarie(tableau, index + 1, max, search);
    }
}

/**
 * permet de décrémenter l'index du tableau
 * @param {objet[]} array tableau d'objets
 * @param {number} index index de départ
 * @param {string} search l'année recherchée
 * @return {number} index retourne l'index minimum du tableau qui contient la date recherchée
 */
function decremente(array, index, search) {
    for (i = index; times.convertToYear(array[i].release_date) == search; i--) {
        index = i;
    }
    return index;
}

/**
 * permet de d'incrémenter l'index du tableau
 * @param {objet[]} array tableau d'objets
 * @param {number} index index de départ
 * @param {string} search l'année recherchée
 * @return {number} index retourne l'index maximum du tableau qui contient la date recherchée
 */
function incremente(array, index, search) {
    for (i = index; times.convertToYear(array[i].release_date) == search; i++) {
        index = i;
    }
    return index;
}

 /**
  * affiche tous les titres de films situées entre les index min et max et si save est true et si le lien vers l'image
 du film concerné est existant alors on pourra télécharger l'image des films concernés
  * @param {objet[]} array tableau d'objets
  * @param {number} min index minimum
  * @param {number} max index maximum
  * @param {boolean} save true ou false pour sauvegarder ou non les images
  * @param {string} folder nom du dossier de sortie des images (si besoin de sauvegarder les images)
  */
function display(array, min, max, save, folder = undefined) {
    for (i = min; i <= max; i++) {
        console.log(array[i].title);
        if (save) {
            if (array[i].poster) {
                dl.downloadImg(array[i].poster, folder, array[i].title.replace(/[\/:*?"<>|]/g, ' '));
            }
        }
    }
}

/**
 * permet de rechercher , d'incrémenter , de décrémenter et d'afficher les resultats trouvés en console 
 * @param {objet[]} array tableau d'objets
 * @param {number} min index minimum
 * @param {number} max index maximum
 * @param {string} search l'année recherchée
  * @param {boolean} save true ou false pour sauvegarder ou non les images
  * @param {string} folder nom du dossier de sortie des images (si besoin de sauvegarder les images)
 */
function searchAndDisplay(array, min, max, search, save, folder = undefined) {
    const indexFound = searchBinarie(array, 0, array.length - 1, search);
    min = decremente(array, indexFound, search);
    max = incremente(array, indexFound, search);
    display(array, min, max, save, folder);
}

module.exports = { searchAndDisplay };