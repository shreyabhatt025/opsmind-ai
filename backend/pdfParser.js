// take a pdf file path, read it,
// and return all the text inside it as a plain string
// fs means "file system" — it lets us read/write files on the computer
const fs = require('fs')

// pdf-parse is the library that knows how to decode pdf binary format
const pdfParse = require('pdf-parse')

async function parsePDF(filePath) {   // parsePDF is function and inside it we will pass filePath 
// 1 - read file and convert to Buffer 
  const fileBuffer = fs.readFileSync(filePath) // read file from the give path and store it in fileBuffer variable 

    console.log('pdf file read from disk successfully')
    console.log('file path was:', filePath)
// STEP 2: Pass the Buffer to pdf-parse
   
    const pdfData = await pdfParse(fileBuffer)   // pdf-parse will decode the fileBuffer and return an object with all the text and metadata from the pdf, we store that in pdfData variable
     console.log('total pages in pdf:', pdfData.numpages) 
    console.log('total raw characters extracted:', pdfData.text.length)

// 3 - pdf have messy formatting, so we clean it up to get plain text string
    const cleanedText = pdfData.text
        .replace(/\s+/g, ' ')
        .trim()

    console.log('total characters after cleaning:', cleanedText.length)

//4- Return the clean text
  

    // this clean text string goes back to whoever called parsePDF()
    // which will be server.js
    // server.js will then pass this to chunker.js
    return cleanedText
}


// export the function so server.js can import and use it
module.exports = { parsePDF }