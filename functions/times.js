
/**
 * permet de convertir les releasedate du f json affichées en millisecondes en années
 * @param {number} times timestamp en milliseconde
 * @return {number} l'année en nombre
 */
function convertToYear(times) {
    const year = new Date(times * 1000).getFullYear(); // recupere la valeur de date renseigné en * par 1000 pour obtenir l'annee du film d'après l'heure locale
    return year;
}

module.exports = { convertToYear };