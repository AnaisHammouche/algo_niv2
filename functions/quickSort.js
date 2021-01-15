
function tri_rapide(t, first, last, sortBy) {
    if (first < last) {
        let pivot = Math.ceil((first + last) / 2);
        pivot = partitionner(t, first, last, pivot, sortBy);
        tri_rapide(t, first, pivot - 1, sortBy);
        tri_rapide(t, pivot + 1, last, sortBy);
    }
    return t;
}

function swap(t, a, b) {
    let temp = t[b];
    t[b] = t[a];
    t[a] = temp;
}

function partitionner(t, first, last, pivot, sortBy) {
    swap(t, pivot, last);
    let j = first;
    for (i = first; i <= last - 1; i++) {

        if (sortBy === "title") {
            if (t[i].title <= t[last].title) {
                swap(t, i, j);
                j = j + 1;
            }
        }
        
        if (sortBy === "release_date") {
            if (t[i].release_date <= t[last].release_date) {
                swap(t, i, j);
                j = j + 1;
            }
        }
    }
    swap(t, last, j);
    return j;
}

function tri_bulle(array) {
    let isSorted = false;

    while (!isSorted) {
        isSorted = true;
        for (i = 0; i < array.length - 1; i++) {
            next = array[i + 1];

            if (array[i] > next) {
                array[i + 1] = array[i];
                array[i] = next;
                isSorted = false;
            }
        }
    }
}

module.exports = { tri_rapide, tri_bulle };