let array = [1,5,22,17,30]




function swap(array,from,to){ //fonction qui échange les éléments
    let tmp = array[to]; // on stock l'arg to dans une variable temporelle
    array[to] = array[from]; // la valeur d'arrivée = la valeur de épart
    array[from] = tmp; // la valeur d'arrivé = la variable temporelle
}

function partition(array,start,end,pivot) {
    swap(array,pivot,end); // on échange le pivot avec le dernier du tableau
    a = start ;
    for ( b = start; b <= end-1; b++) {
        if (array[b] <= array[end]) { 
            swap(array,b,a)
            a++; 
        }
    }
    swap(array,end,a)
    return a;
}


function quickSort(array,start,end) { 
    if (start < end) { 
    let pivot = Math.ceil((start + end) / 2); // on stock la valeur de math.ceil / 2 dans la variable du pivot
   pivot = partition(array,start,end,pivot)
    quickSort(array, pivot + 1, end);
}
return array;
}


array = quickSort(array,0, array.length -1);

console.log(array);
