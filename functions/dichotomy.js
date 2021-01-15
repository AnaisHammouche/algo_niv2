const times = require('./times.js');
const dl = require('./downloadImg.js');


/* effectue une recherche binaire dans le tableau afin de retourner l'index de la date recherchée. Permet de trouver un film à une date souhaitée*/
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

/*  permet de décrémenter l'index du tableau */
function decremente(array, index, search) {
    for (i = index; times.convertToYear(array[i].release_date) == search; i--) {
        index = i;
    }
    return index;
}

/*  permet d'incrémenter l'index du tableau */
function incremente(array, index, search) {
    for (i = index; times.convertToYear(array[i].release_date) == search; i++) {
        index = i;
    }
    return index;
}
 /* affiche tous les index de titres recherchés. si l'action save est générée et s'il existe un lien vers l'image alors elle sera téléchargée */
function display(array, min, max, save, folder = undefined) {
    for (i = min; i <= max; i++) {
        console.log(array[i].title);
        if (save) {
            if (array[i].poster) {
                dl.downloadImg(array[i].poster, folder, array[i].title.replace(/[^a-zA-Z0-9]/g, ' '));
            }
        }
    }
}


/* permet de rechercher , d'incrémenter , de décrémenter et d'afficher le tableau */
function searchAndDisplay(array, min, max, search, save, folder = undefined) {
    const indexFound = searchBinarie(array, 0, array.length - 1, search);
    min = decremente(array, indexFound, search);
    max = incremente(array, indexFound, search);
    display(array, min, max, save, folder);
}

module.exports = { searchAndDisplay };