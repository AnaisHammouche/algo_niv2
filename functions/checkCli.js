const fs = require('fs');

/**
 * permet de recuperer l'index du tableau
 * @param {string[]} array tableau d'arguments
 * @param {string} search argument recherché
 * @return {number} index du tableau qui contient l'argument recherché
 */
function getIndex(array, search) { 
    if (array.includes(search)) {
        return array.indexOf(search);
    }
}

/**
 * permet de verifier si les paramètres des fichiers sont valides
 * @param {string} inputFile nom du fichier d'entrée
 * @param {string} outputFile nom du fichier de sortie
 * @return {boolean} isValid renvoie vrai si les noms du fichier sont valides, sinon faux
 */

function checkParamFile(inputFile, outputFile){
    let isValid = false;
    if(inputFile && outputFile){
        if(inputFile.endsWith(".json")){
            // console.log("END BY .JSON");

            try {
                fs.statSync(inputFile);
                // console.log('file or directory exists');
                if(outputFile.endsWith(".json") || outputFile.endsWith(".txt")){
                    console.log('Résultat enregistré dans le fichier ' + outputFile);
                    isValid = true;
                } else if(!outputFile.includes('.')){
                    isValid = true;
                } else {
                    console.log("Le fichier de sortie doit être en .json ou en .txt UNIQUEMENT");
                }
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    console.log('Veuillez entrer le nom d\'un fichier existant');
                }
            }
        } else {
            console.log("Veuillez entrer un fichier .json comme fichier d'entré");
        }
        
    } else {
        console.log('Veuillez entrer vos fichier d\'entré et de sortie ou vos paramètres');
    }
    return isValid;
}

module.exports = { getIndex, checkParamFile };