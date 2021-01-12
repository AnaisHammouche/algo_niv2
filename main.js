
const f = require('./fonctions.js');


let args = process.argv;

const movies = f.readJson('./test.json');
const data = f.getAllTitleAndYear(movies);
f.writeJson(data, './modif.json');
const movies2 = f.readJson('./modif.json');

console.log(movies[0].title);
console.log(movies2[0]);

// console.log();