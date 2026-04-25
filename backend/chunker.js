function chunkText(text, chunkSize = 1000, overlap = 100) // chunktext-the function takes 3 parameters,
//text= string from pdfparse.js
//chunksize=characters per chunk
//overlap=characters to repeat between chunks 
// but only text is required, the other two have default values
 {

    // this array will hold all our chunks
    // at the end we return this
    const chunks = []

    // startIndex tracks WHERE we are in the big text right now
    // we begin at the very start — position 0
    let startIndex = 0

    console.log('starting chunking process...')
    console.log('total text length:', text.length, 'characters')
    console.log('chunk size:', chunkSize, '| overlap:', overlap)

 // keep making chunks until startIndex reaches end of text
    while (startIndex < text.length) {
// STEP 1: Calculate where this chunk ends
       
        // simple math — chunk starts at startIndex
        // and goes forward by chunkSize characters
        // example: startIndex=0, chunkSize=1000 → endIndex=1000
        let endIndex = startIndex + chunkSize


// STEP 2: Cut the chunk from the big text
       
        // text.slice(start, end) cuts out a portion of the string
        // example: "hello world".slice(0, 5) → "hello"
        // if endIndex goes beyond text length, slice handles it
        // automatically — it just goes to the end, no crash
        const chunk = text.slice(startIndex, endIndex)

// STEP 3: Skip empty chunks
       

        // sometimes at the very end of the text
        // there might be only spaces left — no real content
        // .trim() removes spaces, if nothing remains → skip it
        if (chunk.trim().length === 0) {
            console.log('empty chunk found, stopping here')
            break
        }

// STEP 4: Save this chunk to our array
        chunks.push(chunk)

// STEP 5: Move startIndex forward for the next chunk
        startIndex += chunkSize - overlap
    }

// STEP 6: Return the finished array of chunks
 

    console.log('chunking complete! total chunks created:', chunks.length)
    return chunks
}


// export so server.js can import and use it
module.exports = { chunkText }