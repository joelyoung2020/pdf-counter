 import keyword_extractor from "keyword-extractor";
import { PdfReader } from "pdfreader";



const processPDF = async (filePath) => {
  try {
    const extractedText = await extractTextFromPDF(filePath);

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


  const result = [
    {
      1: {word: firstTen[0][0], occurences: firstTen[0][1]}
    },
    {
      2: {word: firstTen[1][0], occurences: firstTen[1][1]}
    },
    {
      3: {word: firstTen[2][0], occurences: firstTen[2][1]}
    },
    {
      4: {word: firstTen[3][0], occurences: firstTen[3][1]}
    },
    {
      5: {word: firstTen[4][0], occurences: firstTen[4][1]}
    },
    {
      6: {word: firstTen[5][0], occurences: firstTen[5][1]}
    },
    {
      7: {word: firstTen[6][0], occurences: firstTen[6][1]}
    },
    {
      8: {word: firstTen[7][0], occurences: firstTen[7][1]}
    },
    {
      9: {word: firstTen[8][0], occurences: firstTen[8][1]}
    },
    {
      10: {word: firstTen[9][0], occurences: firstTen[9][1]}
    },
  ]

  return result;
}

export default processPDF;
