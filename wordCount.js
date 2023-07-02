import natural from 'natural';
const tokenizer = new natural.WordTokenizer();

import { PdfReader } from "pdfreader";
const pdfPath = './testDocuments/The-Mamba-Mentality-Kobe-Bryant.pdf';


// Usage example with async/await
const processPDF = async () => {
  try {
    const extractedText = await extractTextFromPDF(pdfPath);
    return getMostCounted(extractedText);
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


const getMostCounted = (string) => {
  // Tokenize the document into an array of words
  const words = tokenizer.tokenize(string);

  // Count the occurrences of each word
  const wordFreq = {};
  words.forEach(word => {
    const lowercaseWord = word.toLowerCase();
    wordFreq[lowercaseWord] = (wordFreq[lowercaseWord] || 0) + 1;
  });

  // Find the word that occurs the most
  let mostCommonWord;
  let maxCount = 0;
  for (const word in wordFreq) {
    if (wordFreq[word] > maxCount) {
      mostCommonWord = word;
      maxCount = wordFreq[word];
    }
  }

  // Find the second most common word
  let secondMostCommonWord;
  let secondMaxCount = 0;
  for (const word in wordFreq) {
    if (wordFreq[word] > secondMaxCount && word !== mostCommonWord) {
      secondMostCommonWord = word;
      secondMaxCount = wordFreq[word];
    }
  }

  console.log(`The word "${mostCommonWord}" occurs the most in the document.`);
  console.log(`It appears ${maxCount} times.`);

  console.log(`The word "${secondMostCommonWord}" occurs the second most in the document.`);
  console.log(`It appears ${secondMaxCount} times.`);
}

processPDF();
