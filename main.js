
const json = require('./fonctions-json.js');


let args = process.argv;

const movies = json.readJson('./test.json');
const data = json.getAllMoviesFromJson(movies);
json.writeJson(data, './modif.json');
const movies2 = json.readJson('./modif.json');

console.log(movies[0]);
console.log(movies2[0]);