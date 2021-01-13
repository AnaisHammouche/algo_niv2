
const f = require('./fonctions.js');


// let start = new Date().getTime(); // Début du temps d'exécution du programme

// const movies = f.readJson('./test.json');
// // const data = f.getAllTitleAndYear(movies);
// const data = f.tri_rapide(movies, 0, movies.length - 1, "release_date");
// f.getAllTitleAndYear(data);
// f.writeJson(data, './modif.json');
// const movies2 = f.readJson('./modif.json');

// const index = f.searchBinarie(movies, 0, movies.length - 1, args[5]);
// const min = f.decremente(movies, index, args[5]);
// const max = f.incremente(movies, index, args[5]);
// f.display(movies, min, max);

// // console.log(movies[0].title);


// let stop = new Date().getTime(); // Fin du temps d'exécution du programme
// console.log("Execution time : " + (stop-start) + " ms"); // Afficher temps d'exécution du programme

// ===================================================================================================================================================

let start = new Date().getTime(); // Début du temps d'exécution du programme
let args = process.argv; // On récupère les arguments en CLI

if(args[2] === undefined){
    console.log("Veuillez entrer \"-action\"");
} else {
    switch (args[2]) {
        case "-action":
            // Si l'argument à l'index 3 correspond au action possible ou n'est pas défini, je rentre dans la condition
            if(args[3] === "transform" || args[3] === "sort_date" ||
            args[3] === "sort_title" || args[3] === "search_date" ||
            args[3] === "search_keyword" || args[3] === undefined){
                const movies = f.readJson(args[4]);
                let data;
                // J'observe l'argument à l'index 3
                switch (args[3]) {
                    // Dans le cas où l'argument à l'index 3 est "transform" j'effectue les actions ci-dessous
                    case "transform":
                        data = f.getAllTitleAndYear(movies);
                        f.writeJson(data, args[5]);
                        break;
                    case "sort_date":
                        data = f.tri_rapide(movies, 0, movies.length - 1, "release_date");
                        data = f.getAllTitleAndYear(movies);
                        f.writeJson(data, args[5]);
                        break;
                    case "sort_title":
                        data = f.tri_rapide(movies, 0, movies.length - 1, "title");
                        f.writeJson(data, args[5]);
                        break;
                    case "search_date":
                        if (args[6] === "false") {
                            f.getAllMoviesByDate(movies, args[5]);
                        }
                        if (args[6] === "true") {
                            const index = f.searchBinarie(movies, 0, movies.length - 1, args[5]);
                            const min = f.decremente(movies, index, args[5]);
                            const max = f.incremente(movies, index, args[5]);
                            f.display(movies, min, max);
                        }
                        break;
                    case "search_keyword":
                        console.log("Recherche par mot clé");
                        break;
                    // Dans le cas où l'argument à l'index 3 est undefined, j'affiche en console la liste des actions disponible
                    case undefined:
                        console.log("Action List : \n - transform <input.json> <output.json> \n - sort_date <input.json> <output.json> \n - sort_title <input.json> <output.json> \n - search_date <input.json> <year> <sorted?> \n - search_keyword <input.json> <keyword> <genre>");
                        break;
                
                    default:
                        break;
                }
                
            } else {
                console.log("<" + args[3] + ">" + " n'est pas reconnu comme une action. Veuillez entrer une action valide !");
            }

        default:
            break;
    }
}

let stop = new Date().getTime(); // Fin du temps d'exécution du programme
console.log("Execution time : " + (stop-start) + " ms"); // Afficher temps d'exécution du programme












