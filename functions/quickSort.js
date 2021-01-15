/* fonction de tri rapide permettant de trier par type */
function tri_rapide(t, first, last, sortBy) {
    if (first < last) {
        let pivot = Math.ceil((first + last) / 2);
        pivot = partitionner(t, first, last, pivot, sortBy);
        tri_rapide(t, first, pivot - 1, sortBy);
        tri_rapide(t, pivot + 1, last, sortBy);
    }
    return t;
}

/* fonction d'échange */
function swap(t, a, b) {
    let temp = t[b];
    t[b] = t[a];
    t[a] = temp;
}

/* permet de partitioner les titres et dates du fichier json  et de retourner le premier element du tableau  après avoir échanger leurs places */
function partitionner(t, first, last, pivot, sortBy) {
    swap(t, pivot, last);
    let j = first;
    for (i = first; i <= last - 1; i++) {

        if (sortBy === "title") { //si le type recherché est un titre
            if (t[i].title <= t[last].title) { // et si l'index du tableau des titres est <= au dernier index du tableau
                j = j + 1; // on ajoute + 1 au premier élément du tableau
            }
        }
        
        if (sortBy === "release_date") { //si le type recherché est une date
            if (t[i].release_date <= t[last].release_date) { // et si l'index du tableau des titres est <= au dernier index du tableau
                swap(t, i, j); 
                j = j + 1; 
            }
        }
    }
    swap(t, last, j);
    return j;
}


module.exports = { tri_rapide };