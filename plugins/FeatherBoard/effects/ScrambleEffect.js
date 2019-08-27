/**
 * ScrambleEffect
 *
 * Allows you to create a (un)scramble effect
 * that will use the "&k" effect to slowly show
 * hidden text.
 *
 * @author Maxim Van de Wynckel
 * @version 1.0.0
 */
var ScrambleEffect = {
    /**
     * Scramble the input string
     *
     * @param str Input string
     * @return Animation array
     */
    scramble: function(str){
        var animation = [];
        animation.push(str); // Start with the unscrambled string
        // Create an index array
        var newString = [];
        for (var i = 0 ; i < str.length ; i++){
            newString.push({
                idx: i,
                character: str.substring(i,i+1),
                scrambled: false, // Is the text scrambled
                hasColorReset: false, // Does this part contain a color reset
                hasScramble: false // Does this part contain a scramble effect
            });
        }
        var shiftedString = this.utils.shuffle(newString.slice(0));
        // Shuffle the array/string
        // Next, use the shuffled array to hide the characters one by one
        for (var i = 0 ; i < newString.length ; i++){
            // Additional checks to see if a color effect is required
            var idx = shiftedString[i].idx;
            newString[idx].scrambled = true;
            // Only set a scramble effect when the index is 0 or the previous index is already scrambled
            newString[idx].hasScramble = (idx == 0) || !(newString[idx - 1].scrambled);
            // Only set a color reset when the next index is not scrambled
            newString[idx].hasColorReset = (idx != (str.length - 1)) && !newString[idx + 1].scrambled;
            if (idx != 0){
                newString[idx - 1].hasColorReset = false;
            }
            if ((idx != (str.length - 1))){
                newString[idx + 1].hasScramble = false;
            }

            var flatString = [];
            for (var j = 0 ; j < str.length ; j++){
                flatString.push((newString[j].hasScramble ? "&k" : "" ) + newString[j].character + (newString[j].hasColorReset ? "&r" : "" ));
            }
            animation.push(flatString.join(""));
        }
        // Debugging
        //print(JSON.stringify(animation));
        //print(JSON.stringify(newString));
        return animation;
    },
    /**
     * Unscramble the input string
     *
     * @param str Input string
     * @return Animation array
     */
    unscramble: function(str){
        var animation = this.scramble(str).reverse();
        return animation;
    },
    utils: {
        shuffle: function(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
    }
};