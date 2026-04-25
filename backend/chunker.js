// chunker.js
// this file has one job — take a big text string
// and cut it into smaller overlapping pieces called chunks
// these chunks are what actually get stored in mongodb


// ============================================================
// chunkText - the only function in this file
//
// text      = the big string coming from pdfParser.js
// chunkSize = how many characters per chunk (default 1000)
// overlap   = how many characters to repeat between chunks (default 100)
//
// why default values?
// so if someone calls chunkText(myText) without other args
// it automatically uses 1000 and 100
// ============================================================

function chunkText(text, chunkSize = 1000, overlap = 100) {

    // this array will hold all our chunks
    // at the end we return this
    const chunks = []

    // startIndex tracks WHERE we are in the big text right now
    // we begin at the very start — position 0
    let startIndex = 0

    console.log('starting chunking process...')
    console.log('total text length:', text.length, 'characters')
    console.log('chunk size:', chunkSize, '| overlap:', overlap)


    // -------------------------------------------------------
    // MAIN LOOP
    // keep making chunks until startIndex reaches end of text
    // -------------------------------------------------------

    while (startIndex < text.length) {

        // -------------------------------------------------------
        // STEP 1: Calculate where this chunk ends
        // -------------------------------------------------------

        // simple math — chunk starts at startIndex
        // and goes forward by chunkSize characters
        // example: startIndex=0, chunkSize=1000 → endIndex=1000
        let endIndex = startIndex + chunkSize


        // -------------------------------------------------------
        // STEP 2: Cut the chunk from the big text
        // -------------------------------------------------------

        // text.slice(start, end) cuts out a portion of the string
        // example: "hello world".slice(0, 5) → "hello"
        // if endIndex goes beyond text length, slice handles it
        // automatically — it just goes to the end, no crash
        const chunk = text.slice(startIndex, endIndex)


        // -------------------------------------------------------
        // STEP 3: Skip empty chunks
        // -------------------------------------------------------

        // sometimes at the very end of the text
        // there might be only spaces left — no real content
        // .trim() removes spaces, if nothing remains → skip it
        if (chunk.trim().length === 0) {
            console.log('empty chunk found, stopping here')
            break
        }


        // -------------------------------------------------------
        // STEP 4: Save this chunk to our array
        // -------------------------------------------------------

        chunks.push(chunk)


        // -------------------------------------------------------
        // STEP 5: Move startIndex forward for next chunk
        // -------------------------------------------------------

        // this is the KEY line — understand this carefully
        //
        // WITHOUT overlap you'd do: startIndex += chunkSize
        // meaning next chunk starts exactly where this one ended
        // → no shared content between chunks → meaning gets cut off
        //
        // WITH overlap you do: startIndex += chunkSize - overlap
        // meaning next chunk starts 100 chars BEFORE this one ended
        // → 100 chars are shared between two consecutive chunks
        // → meaning is preserved across chunk boundaries
        //
        // example with chunkSize=1000, overlap=100:
        // chunk 1: chars 0    → 1000
        // chunk 2: chars 900  → 1900  (not 1000→2000)
        // chunk 3: chars 1800 → 2800  (not 2000→3000)
        startIndex += chunkSize - overlap
    }


    // -------------------------------------------------------
    // STEP 6: Return the finished array of chunks
    // -------------------------------------------------------

    console.log('chunking complete! total chunks created:', chunks.length)

    // chunks is an array like:
    // [
    //   "To process a refund navigate to...",   ← chunk 0
    //   "...manager approval. Approval takes...", ← chunk 1
    //   "...5-7 business days. For international...", ← chunk 2
    //   ...
    // ]
    return chunks
}


// export so server.js can import and use it
module.exports = { chunkText }