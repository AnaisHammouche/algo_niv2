const f = require('./fonctions.js');


let start = new Date().getTime(); // Début du temps d'exécution du programme
let args = process.argv; // On récupère les arguments en CLI
// let tabTest = ["movies.json", "movies.out.json"];

// f.checkParamFile(args[2], args[3]); // args[2], args[3] | tabTest[0], tabTest[1]

if (args[2] === undefined) {
    console.log("Veuillez entrer \"-save\" ou \"-action\"");
}
else {
    if (args.includes("-action")) {
        const index = f.getIndex(args, "-action");

        if (args[index + 1] === "transform" || args[index + 1] === "sort_date" ||
            args[index + 1] === "sort_title" || args[index + 1] === "search_date" ||
            args[index + 1] === "search_keyword") {

            if (f.checkParamFile(args[index + 2], args[index + 3])) {
                const movies = f.readJson(args[index + 2]);
                let data;
                // J'observe l'argument à l'index["-action" + 1]
                switch (args[index + 1]) {
                    case "transform":
                        data = f.getAllTitleAndYear(movies);
                        f.writeJson(data, args[index + 3]);
                        break;
                    case "sort_date":
                        data = f.tri_rapide(movies, 0, movies.length - 1, "release_date");
                        data = f.getAllTitleAndYear(movies);
                        f.writeJson(data, args[index + 3]);
                        break;
                    case "sort_title":
                        data = f.tri_rapide(movies, 0, movies.length - 1, "title");
                        f.writeJson(data, args[index + 3]);
                        break;
                    case "search_date":
                        if (args[index + 4] === "false") {
                            if (args.includes("-save")) {
                                const indexSave = f.getIndex(args, "-save");
                                f.getAllMoviesByDate(movies, args[index + 3], true, args[indexSave + 1]);
                            }
                            else {
                                f.getAllMoviesByDate(movies, args[index + 3], false);
                            }
                        }
                        if (args[index + 4] === "true") {
                            if (args.includes("-save")) {
                                const indexSave = f.getIndex(args, "-save");
                                const indexFound = f.searchBinarie(movies, 0, movies.length - 1, args[index + 3]);
                                const min = f.decremente(movies, indexFound, args[index + 3]);
                                const max = f.incremente(movies, indexFound, args[index + 3]);
                                f.display(movies, min, max, true, args[indexSave + 1]);
                            }
                            else {
                                const indexFound = f.searchBinarie(movies, 0, movies.length - 1, args[index + 3]);
                                const min = f.decremente(movies, indexFound, args[index + 3]);
                                const max = f.incremente(movies, indexFound, args[index + 3]);
                                f.display(movies, min, max, false);
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
                            data = f.tri_rapide(movies, 0, movies.length - 1, "release_date");
                            const movie = f.getAllMoviesByGenre(f.getAllMoviesByKey(data, args[index + 3]), args[index + 4]);
                            if (args.includes("-save")) {
                                const indexSave = f.getIndex(args, "-save");
                                f.downloadImg(movie.poster, args[indexSave + 1], movie.title.replace(/[^a-zA-Z0-9]/g));
                                console.log("Film trouvé : " + movie.title);
                            }
                            else {
                                console.log("Film trouvé : " + movie.title);
                            }
                        }
                        break;

                    default:
                        break;
                }
            }
        }
        else if (args[index + 1] === undefined) {
            console.log("Action List : \n - transform <input.json> <output.json> \n - sort_date <input.json> <output.json> \n - sort_title <input.json> <output.json> \n - search_date <input.json> <year> <sorted?> \n - search_keyword <input.json> <keyword> <genre>");
        } else {
            console.log("<" + args[3] + ">" + " n'est pas reconnu comme une action. Veuillez entrer une action valide !");
        }
    }
}

let stop = new Date().getTime(); // Fin du temps d'exécution du programme
console.log("Execution time : " + (stop - start) + " ms"); // Afficher temps d'exécution du programme