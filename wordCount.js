import natural from 'natural';
const tokenizer = new natural.WordTokenizer();
import pos from 'pos';
import { PdfReader } from "pdfreader";
const pdfPath = './testDocuments/The-Mamba-Mentality-Kobe-Bryant.pdf';


const processPDF = async () => {
  try {
    const extractedText = await extractTextFromPDF(pdfPath);

    const filteredWords = filterUnwantedWords(extractedText)
    return getMostCounted(filteredWords);
  } catch (error) {
    console.error('Error:', error);
  }
};

const extractTextFromPDF = (pdfPath) => {
  return new Promise((resolve, reject) => {
    let extractedText = '';
    new PdfReader().parseFileItems(pdfPath, (err, item) => {
      if (err) {
        reject(err);
      } else if (item && item.text) {
        extractedText += item.text;
      } else if (!item) {
        resolve(extractedText);
      }
    });
  });
};


const filterUnwantedWords = (pdfString) => {
  const words = new pos.Lexer().lex(pdfString)
  const tagger = new pos.Tagger();
  const taggedWords = tagger.tag(words);

  const wantedWords = []
  const unwantedTags = [
    'DT',   'VBZ', 'DT',  'CC',
    'MD',   'IN', 'MD',
    'WRB',  'RB',  'PRP', 'PRP',
    'PRP$', 'PRP', 'DT',  'IN',
    'PRP',  '"',   'NN',  'PRP',
    'PRP',  'PRP', '.', 'TO',
    'VBP', 'VBD', 'WP', 'EX'
  ]

  // filter based on part of speech tag
  for (let i = 0; i < taggedWords.length; i++) {
    const taggedWord = taggedWords[i];
    const word = taggedWord[0];
    const tag = taggedWord[1];

    if(unwantedTags.includes(tag)) continue;
     
    // filter out words that include apostrophe
    // const splitWord = word.split('')
    // if (splitWord.includes("'")) {
    //   const noApostrophe = word.split("'")[0]
    //   const taggedWord = tagger.tag(noApostrophe)
    //   console.log(taggedWord)
    // }

    wantedWords.push(word)
  }
  return wantedWords;
}


const getMostCounted = (wordArray) => {
  // Count the occurrences of each word
  const wordFreq = {};
  for (let i = 0; i < wordArray.length; i++) {
     const lowercaseWord = wordArray[i].toLowerCase();
      if (lowercaseWord.length <= 3) {
        continue;
      }
      wordFreq[lowercaseWord] = (wordFreq[lowercaseWord] || 0) + 1;
  }

  const wordFreqArray = Object.entries(wordFreq);
  wordFreqArray.sort((a, b) => {
    return b[1] - a[1]
  })

  const result = `
    1st: ${wordFreqArray[0][0]},   times: ${wordFreqArray[0][1]}
    2nd: ${wordFreqArray[1][0]},   times: ${wordFreqArray[1][1]}
    3rd: ${wordFreqArray[2][0]},   times: ${wordFreqArray[2][1]}
    4th: ${wordFreqArray[3][0]},   times: ${wordFreqArray[3][1]}
    5th: ${wordFreqArray[4][0]},   times: ${wordFreqArray[4][1]}
    6th: ${wordFreqArray[5][0]},   times: ${wordFreqArray[5][1]}
    7th: ${wordFreqArray[6][0]},   times: ${wordFreqArray[6][1]}
    8th: ${wordFreqArray[7][0]},   times: ${wordFreqArray[7][1]}
    9th: ${wordFreqArray[8][0]},   times: ${wordFreqArray[8][1]}
    10th: ${wordFreqArray[9][0]},   times: ${wordFreqArray[9][1]}
    11th: ${wordFreqArray[10][0]},   times: ${wordFreqArray[10][1]}
    12th: ${wordFreqArray[11][0]},   times: ${wordFreqArray[11][1]}
    13th: ${wordFreqArray[12][0]},   times: ${wordFreqArray[12][1]}
    14th: ${wordFreqArray[13][0]},   times: ${wordFreqArray[13][1]}
    15th: ${wordFreqArray[14][0]},   times: ${wordFreqArray[14][1]}
  `

  console.log(result)
}

processPDF();
