async function fetchAuthors(author_name){
    const endpoint = `https://api.openalex.org/authors?filter=display_name.search:${author_name}`;
    const results = await fetch(endpoint,  {
        method: 'GET',
        signal: AbortSignal.timeout(30000)
    });
    const authors = await results.json();
    return authors.results;
}

async function fetchAuthor(id){
    const endpoint = `https://api.openalex.org/authors/${id}`;
    const response = await fetch(endpoint,  {
        method: 'GET',
    });
    const author = await response.json();
    return author;
}

async function fetchInstitution(id){
    const endpoint = `https://api.openalex.org/institutions/${id}`;
    const response = await fetch(endpoint,  {
        method: 'GET',
    });
    return await response.json();
}

async function fetchWorks(endpoint){
    const response = await fetch(endpoint,  {
        method: 'GET',
    });
    return await response.json();
}

module.exports = {
    fetchAuthor,
    fetchAuthors,
    fetchInstitution,
    fetchWorks
}