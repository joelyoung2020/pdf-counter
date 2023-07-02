import pos from 'pos';
var words = new pos.Lexer().lex("that's");
var tagger = new pos.Tagger();
var taggedWords = tagger.tag(words);
const unwantedTags = []
for (let i = 0; i < taggedWords.length; i++) {
    var taggedWord = taggedWords[i];
    var word = taggedWord[0];
    var tag = taggedWord[1];
    unwantedTags.push(tag);
}
console.log(unwantedTags)