
const f = require('./fonctions.js');

// let start = new Date().getTime(); // Début du temps d'exécution du programme

// const movies = f.readJson('./movies.json');

// f.downloadImg(movies[0].poster, 'images', movies[0].title);

// let stop = new Date().getTime(); // Fin du temps d'exécution du programme
// console.log("Execution time : " + (stop-start) + " ms"); // Afficher temps d'exécution du programme


// ===================================================================================================================================================

let start = new Date().getTime(); // Début du temps d'exécution du programme
let args = process.argv; // On récupère les arguments en CLI

if (args[2] === undefined) {
    console.log("Veuillez entrer \"-action\"");
} 
else {
    if (args.includes("-action")) {
        const index = f.getIndex(args, "-action");

        if (args[index + 1] === "transform" || args[index + 1] === "sort_date" ||
        args[index + 1] === "sort_title" || args[index + 1] === "search_date" ||
        args[index + 1] === "search_keyword") {

            if (args[index + 2]) {
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
                            f.getAllMoviesByDate(movies, args[index + 3]);
                        }
                        if (args[index + 4] === "true") {
                            const indexFound = f.searchBinarie(movies, 0, movies.length - 1, args[index + 3]);
                            const min = f.decremente(movies, indexFound, args[index + 3]);
                            const max = f.incremente(movies, indexFound, args[index + 3]);
                            f.display(movies, min, max);
                        }
                        break;
                    case "search_keyword":  // 5: keyword  6: genre
                        console.log("keyword: " + args[index + 3] + " | genre: " + args[index + 4] + "\n");
                        data = f.tri_rapide(movies, 0, movies.length - 1, "release_date");
                        console.log(f.getAllMoviesByGenre(f.getAllMoviesByKey(data, args[index + 3]), args[index + 4]));
                        break;

                    default:
                        break;
                }
            }
        }
        else if(args[3] === undefined){
            console.log("Action List : \n - transform <input.json> <output.json> \n - sort_date <input.json> <output.json> \n - sort_title <input.json> <output.json> \n - search_date <input.json> <year> <sorted?> \n - search_keyword <input.json> <keyword> <genre>");
        } else {
            console.log("<" + args[3] + ">" + " n'est pas reconnu comme une action. Veuillez entrer une action valide !");
        }
    }
}

let stop = new Date().getTime(); // Fin du temps d'exécution du programme
console.log("Execution time : " + (stop-start) + " ms"); // Afficher temps d'exécution du programme

// ===================================================================================================================================================

// let start = new Date().getTime(); // Début du temps d'exécution du programme
// let args = process.argv; // On récupère les arguments en CLI

// if(args[2] === undefined){
//     console.log("Veuillez entrer \"-action\"");
// } else {
//     switch (args[2]) {
//         case "-action":
//             // Si l'argument à l'index 3 correspond au action possible ou n'est pas défini, je rentre dans la condition
//             if(args[3] === "transform" || args[3] === "sort_date" ||
//             args[3] === "sort_title" || args[3] === "search_date" ||
//             args[3] === "search_keyword"){
//                 const movies = f.readJson(args[4]);
//                 let data;
//                 // J'observe l'argument à l'index 3
//                 switch (args[3]) {
//                     // Dans le cas où l'argument à l'index 3 est "transform" j'effectue les actions ci-dessous
//                     case "transform":
//                         data = f.getAllTitleAndYear(movies);
//                         f.writeJson(data, args[5]);
//                         break;
//                     case "sort_date":
//                         data = f.tri_rapide(movies, 0, movies.length - 1, "release_date");
//                         data = f.getAllTitleAndYear(movies);
//                         f.writeJson(data, args[5]);
//                         break;
//                     case "sort_title":
//                         data = f.tri_rapide(movies, 0, movies.length - 1, "title");
//                         f.writeJson(data, args[5]);
//                         break;
//                     case "search_date":
//                         if (args[6] === "false") {
//                             f.getAllMoviesByDate(movies, args[5]);

//                         }
//                         if (args[6] === "true") {
//                             const index = f.searchBinarie(movies, 0, movies.length - 1, args[5]);
//                             const min = f.decremente(movies, index, args[5]);
//                             const max = f.incremente(movies, index, args[5]);
//                             f.display(movies, min, max);
//                         }
//                         break;
//                     case "search_keyword":  // 5: keyword  6: genre
//                         console.log("keyword: " + args[5] + " | genre: " + args[6] + "\n");
//                         data = f.tri_rapide(movies, 0, movies.length - 1, "release_date");
//                         console.log(f.getAllMoviesByGenre(f.getAllMoviesByKey(data, args[5]), args[6]));
//                         break;

//                     default:
//                         break;
//                 }
//                 // Sinon, si l'argument à l'index 3 est undefined, j'affiche en console la liste des actions disponible
//             } else if(args[3] === undefined){
//                 console.log("Action List : \n - transform <input.json> <output.json> \n - sort_date <input.json> <output.json> \n - sort_title <input.json> <output.json> \n - search_date <input.json> <year> <sorted?> \n - search_keyword <input.json> <keyword> <genre>");
//             } else {
//                 console.log("<" + args[3] + ">" + " n'est pas reconnu comme une action. Veuillez entrer une action valide !");
//             }

//         default:
//             break;
//     }
// }

// let stop = new Date().getTime(); // Fin du temps d'exécution du programme
// console.log("Execution time : " + (stop-start) + " ms"); // Afficher temps d'exécution du programme












