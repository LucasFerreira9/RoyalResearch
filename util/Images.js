const {API_KEY, CX} = require("../key");

async function search_image(keyword){
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(keyword)}&cx=${CX}&searchType=image&key=${API_KEY}`;
    try{
        const response = await fetch(url);

        if(!response.ok)
            throw new Error(response.status)
        const results = await response.json();
        const first_image = results.items[0].link;
        return first_image;
    }
    catch(e){
        console.warn(`cannot get image \'${keyword}\'. ${e}`)
        return null;
    }
    
}

module.exports = {search_image}