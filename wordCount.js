 import keyword_extractor from "keyword-extractor";
// import pos from 'pos';
import { PdfReader } from "pdfreader";
// import fetch from "node-fetch";


const processPDF = async (filePath) => {
  try {
    const extractedText = await extractTextFromPDF(filePath);

    // const filteredWords = await filterUnwantedWords(extractedText)

    // const filteredString = filteredWords.join(' ')
    const keywords = getKeywords(extractedText)
    return await getMostCounted(keywords);
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

const getKeywords = (string) => {
  const extraction_result =
  keyword_extractor.extract(string,{
      language:"english",
      remove_digits: true,
      return_changed_case:true,
      remove_duplicates: false,
      return_chained_words: false,

  });
  return extraction_result
}


// const filterUnwantedWords = (pdfString) => {
//   const words = new pos.Lexer().lex(pdfString)
//   const tagger = new pos.Tagger();
//   const taggedWords = tagger.tag(words);

//   const wantedWords = []
//   const unwantedTags = [
//     'DT',   'VBZ', 'DT',  'CC',
//     'MD',   'IN', 'MD',
//     'WRB',  'RB',  'PRP', 'PRP',
//     'PRP$', 'PRP', 'DT',  'IN',
//     'PRP',  '"',   'NN',  'PRP',
//     'PRP',  'PRP', '.', 'TO',
//     'VBP', 'VBD', 'WP', 'EX'
//   ]

//   // filter based on part of speech tag
//   for (let i = 0; i < taggedWords.length; i++) {
//     const taggedWord = taggedWords[i];
//     const word = taggedWord[0];
//     const tag = taggedWord[1];

//     if(unwantedTags.includes(tag)) continue;

//     // filter numbers
//     const isNumber = parseInt(word)
//     if (!isNaN(isNumber)) continue;

//     wantedWords.push(word)
//   }
//   return wantedWords;
// }


const getMostCounted = async(wordArray) => {
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
  const firstTen = wordFreqArray.slice(0, 10)

  return await arrangeResults(firstTen)
}

const arrangeResults = async (firstTen) => {
  // const firstURL = await fetchWikipediaPageLink(firstTen[0][0])
  // const secondURL = await fetchWikipediaPageLink(firstTen[1][0])
  // const thirdURL = await fetchWikipediaPageLink(firstTen[2][0])
  // const fourthURL = await fetchWikipediaPageLink(firstTen[3][0])
  // const fifthURL = await fetchWikipediaPageLink(firstTen[4][0])
  // const sixthURL = await fetchWikipediaPageLink(firstTen[5][0])
  // const seventhURL = await fetchWikipediaPageLink(firstTen[6][0])
  // const eighthURL = await fetchWikipediaPageLink(firstTen[7][0])
  // const ninthURL = await fetchWikipediaPageLink(firstTen[8][0])
  // const tenthURL = await fetchWikipediaPageLink(firstTen[9][0])

  const result = [
    {
      1: {word: firstTen[0][0], times: firstTen[0][1]}
    },
    {
      2: {word: firstTen[1][0], times: firstTen[1][1]}
    },
    {
      3: {word: firstTen[2][0], times: firstTen[2][1]}
    },
    {
      4: {word: firstTen[3][0], times: firstTen[3][1]}
    },
    {
      5: {word: firstTen[4][0], times: firstTen[4][1]}
    },
    {
      6: {word: firstTen[5][0], times: firstTen[5][1]}
    },
    {
      7: {word: firstTen[6][0], times: firstTen[6][1]}
    },
    {
      8: {word: firstTen[7][0], times: firstTen[7][1]}
    },
    {
      9: {word: firstTen[8][0], times: firstTen[8][1]}
    },
    {
      10: {word: firstTen[9][0], times: firstTen[9][1]}
    },
  ]

  return result;
}


// Function to fetch the link to a Wikipedia page
// async function fetchWikipediaPageLink(pageTitle) {
//   const apiUrl = 'https://en.wikipedia.org/w/api.php';
//   const params = new URLSearchParams({
//     action: 'query',
//     format: 'json',
//     prop: 'info',
//     titles: pageTitle,
//     inprop: 'url'
//   });
//   const url = `${apiUrl}?${params.toString()}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     // Extract the page link
//     const pageId = Object.keys(data.query.pages)[0];
//     const pageData = data.query.pages[pageId];
//     const pageUrl = pageData.fullurl;

//     return pageUrl;
//   } catch (error) {
//     console.error('Error fetching Wikipedia page link:', error);
//     throw error;
//   }
// }


export default processPDF;
