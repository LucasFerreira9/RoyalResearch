const helpers = {
    flagUrl: (countryCode) => `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`,
    years: (years) => `${years[years.length - 1]} - ${years[0]}`,
    parseID: (id)=>id.slice(id.lastIndexOf("/")+1)  
}

module.exports = helpers;