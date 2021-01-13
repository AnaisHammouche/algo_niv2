
const f = require('./fonctions.js');


let args = process.argv; // On récupère les arguments en CLI
let start = new Date().getTime(); // Début du temps d'exécution du programme

const movies = f.readJson('./movies.json');
// const data = f.getAllTitleAndYear(movies);
// f.writeJson(data, './modif.json');
// const movies2 = f.readJson('./modif.json');

f.getAllMoviesByDate(movies, 2018);

let stop = new Date().getTime(); // Début du temps d'exécution du programme
console.log("Execution time : " + (stop-start) + " ms"); // Afficher temps d'exécution du programme