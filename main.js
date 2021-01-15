const json = require('./functions/jsonFile.js');
const get = require('./functions/getMovies.js');
const sort = require('./functions/quickSort.js');
const search = require('./functions/dichotomy.js');
const dl = require('./functions/downloadImg.js');
const cli = require('./functions/checkCli.js');
const times = require('./functions/times.js');


let start = new Date().getTime(); // Début du temps d'exécution du programme
let args = process.argv; // On récupère les arguments en CLI


/* Vérification des arguments, dans la ligne de commande*/
if (args[2] === undefined) { 
    console.log("Veuillez entrer \"-save\" ou \"-action\"");
}
else {
    if (args.includes("-save")) {
        const index = cli.getIndex(args, "-save");
        if (args[index + 1] === undefined) {
            console.log("+-------------+ \n| Action List |\n+-------------+ \n   - transform <input.json> <output.json> \n   - sort_date <input.json> <output.json> \n   - sort_title <input.json> <output.json> \nFor the next actions, possibility to add an option \"-save\" <output folder> before the action\n   - search_date <input.json> <year> <sorted?> \n   - search_keyword <input.json> <keyword> <genre>");
        }   
        else if (args[index + 1] === "-action") {
            console.log("Veuillez entrer un nom de dossier avant l'action à effectuer");
            return;
        }
    }
    if (args.includes("-action")) {
        const index = cli.getIndex(args, "-action");

        if (args[index + 1] === "transform" || args[index + 1] === "sort_date" ||
            args[index + 1] === "sort_title" || args[index + 1] === "search_date" ||
            args[index + 1] === "search_keyword") {

            if (cli.checkParamFile(args[index + 2], args[index + 3])) {
                const movies = json.readJson(args[index + 2]);
                let data;
                // J'observe l'argument à l'index["-action" + 1]
                switch (args[index + 1]) {
                    case "transform":
                        data = get.getAllTitleAndYear(movies);
                        json.writeJson(data, args[index + 3]);
                        break;
                    case "sort_date":
                        data = sort.tri_rapide(movies, 0, movies.length - 1, "release_date");
                        data = get.getAllTitleAndYear(movies);
                        json.writeJson(data, args[index + 3]);
                        break;
                    case "sort_title":
                        data = sort.tri_rapide(movies, 0, movies.length - 1, "title");
                        json.writeJson(data, args[index + 3]);
                        break;
                    case "search_date":
                        if (args[index + 4] === "false") {
                            if (args.includes("-save")) {
                                const indexSave = cli.getIndex(args, "-save");
                                get.getAllMoviesByDate(movies, args[index + 3], true, args[indexSave + 1]);
                            }
                            else {
                                get.getAllMoviesByDate(movies, args[index + 3], false);
                            }
                        }
                        if (args[index + 4] === "true") {
                            if (args.includes("-save")) {
                                const indexSave = cli.getIndex(args, "-save");
                                search.searchAndDisplay(movies, 0, movies.length - 1, args[index + 3], true, args[indexSave + 1]);
                            }
                            else {
                                search.searchAndDisplay(movies, 0, movies.length - 1, args[index + 3], false);
                            }
                        }
                        if (args[index + 4] !== "true" && args[index + 4] !== "false") {
                            console.log("Veuillez préciser si la liste passé en entré est trié. (true / false)");
                        }
                        break;
                    case "search_keyword":  // 5: keyword  6: genre
                        if (!args[index + 3]) {
                            console.log("Veuillez entrer un mot clé !");
                        } else if (!args[index + 4]) {
                            console.log("Veuillez entrer un genre !");
                        }
                        else {
                            console.log("keyword: " + args[index + 3] + " | genre: " + args[index + 4]);
                            const movie = get.getAllMoviesByGenre(get.getAllMoviesByKey(movies, args[index + 3]), args[index + 4]);
                            data = sort.tri_rapide(movie, 0, movie.length - 1, "release_date");
                            if (args.includes("-save")) {
                                const indexSave = cli.getIndex(args, "-save");
                                dl.downloadImg(data[data.length - 1].poster, args[indexSave + 1], data[data.length - 1].title.replace(/[^a-zA-Z0-9]/g, ' '));
                                console.log("Film trouvé : " + data[data.length - 1].title + " (" + times.convertToYear(data[data.length - 1].release_date) + ")");
                            }
                            else {
                                console.log("Film trouvé : " + data[data.length - 1].title + " (" + times.convertToYear(data[data.length - 1].release_date) + ")");
                            }
                        }
                        break;

                    default:
                        break;
                }
            }
        }
        else if (args[index + 1] === undefined) {
            console.log("+-------------+ \n| Action List |\n+-------------+ \n   - transform <input.json> <output.json> \n   - sort_date <input.json> <output.json> \n   - sort_title <input.json> <output.json> \nFor the next actions, possibility to add an option \"-save\" <output folder> before the action\n   - search_date <input.json> <year> <sorted?> \n   - search_keyword <input.json> <keyword> <genre>");
        } else {
            console.log("<" + args[3] + ">" + " n'est pas reconnu comme une action. Veuillez entrer une action valide !");
        }
    }
}

let stop = new Date().getTime(); // Fin du temps d'exécution du programme
console.log("Execution time : " + (stop - start) + " ms"); // Afficher temps d'exécution du programme