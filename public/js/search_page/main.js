const search_input = document.querySelector("#search-input");
const searchResults = new SearchResults(document.querySelector("#search-results-container"));

let timeout_id = null;
const delay = 1000;

const search = (search_content) => {
    if(search_content.length > 0){
      fetch("/Authors/"+search_content)
        .then(response => response.json())
        .then((results)=>{
          searchResults.assignResults(results);
          searchResults.renderTo();
        });
    }
};

document.addEventListener("click", (event) => {
  if(event.target.id !== "search-input") searchResults.hidde();
});

search_input.addEventListener("input", (event) => {
  if(timeout_id) clearTimeout(timeout_id);
  timeout_id = setTimeout(search,delay,event.target.value)
});

search_input.addEventListener("focus", () => {
  searchResults.show();
});
