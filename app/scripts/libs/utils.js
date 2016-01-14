define([
    'exports',
], function(exports) {
    function pairwise(list) {
        var pairs = new Array((list.length * (list.length - 1)) / 2),
            pos = 0;

        for (var i = 0; i < list.length; i++) {
            for (var j = i + 1; j < list.length; j++) {
                pairs[pos++] = [list[i], list[j]];
            }
        }

        console.log(JSON.stringify(pairs));
        return pairs;
    }
    exports.pairwise = pairwise;

    function pairs(list) {
        var pairs = [];

        for (var i = 0; i < list.length; i++) {
            for (var j = 0; j < list.length; j++) {
                if(j !== i) {
                    pairs.push([list[i], list[j]]);
                }
            }
        }

        return pairs;
    }
    exports.pairs = pairs;
});