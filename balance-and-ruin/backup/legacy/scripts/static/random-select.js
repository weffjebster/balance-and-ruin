/* Randomize array in-place using Durstenfeld shuffle algorithm */
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// return array of n unique indices in the given select
function nRandomUniqueOptions(select, n) {
    var possibleIndices = new Array(select.length);
    for (var i = 0; i < select.length; i++) {
        possibleIndices[i] = i;
    }
    shuffleArray(possibleIndices);
    return possibleIndices.slice(0, n);
}
