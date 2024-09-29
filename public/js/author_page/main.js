import LateralMenu from "./LateralMenu.js";
import DropDown from "../components/Dropdown.js";

const sections = document.querySelectorAll(".section");
const works_section_container = document.querySelector("#works-section");
const topics_section_container = document.querySelector("#topics-section");
const institutes_section_container = document.querySelector("#institutes-section");


function renderCardsGraph(section) {
    const cards = section.querySelectorAll(".work");
    const cards_bars = section.querySelectorAll(".graph-rect");
    const max_citations = parseInt(section.getAttribute("max-citations"));
    cards.forEach((card, index) => {
        setTimeout(() => {
            cards_bars[index].style.width = `${parseInt(card.getAttribute("citations")) / max_citations * 100 + 1}%`;
        }, 200);
    });
}

function onOptionClicked(event){

    const section = event.currentTarget.closest(".section");

    const content = section.querySelector(".content");
    const cards = content.querySelectorAll(".work");

    const new_cards = [];
    for (const card of cards) {
        new_cards.push(card.cloneNode(true));
        card.remove();
    }

    switch (event.detail.option) {
        case "Decrescente": {
            new_cards.sort((card1, card2) => card2.getAttribute("citations") - card1.getAttribute("citations"));
            break;
        }
        case "Crescente": {
            new_cards.sort((card1, card2) => card1.getAttribute("citations") - card2.getAttribute("citations"));
            break;
        }
        case "Alfabética": {
            new_cards.sort((card1, card2) => {
                if (card1.getAttribute("name") < card2.getAttribute("name")) return -1;
                if (card1.getAttribute("name") > card2.getAttribute("name")) return 1;
                return 0;
            });
            break;
        }
    }
    for (const card of new_cards) {
        const graph = card.querySelector(".graph-rect");
        graph.style.width = "0";
        content.appendChild(card);
    }   
    renderCardsGraph(section);
}



for(const section of sections)
    section.addEventListener("intersection",()=>{
        if(section.classList.contains("hidden")){
            section.classList.remove("hidden");
            const id = section.id;
            if(id == "works-section" || id=="topics-section") renderCardsGraph(section);
        }
    });


//show top cards
const cards = document.querySelectorAll('#cards-container div');
cards.forEach((card, index) => {
    setTimeout(() => card.classList.remove("hidden-card"), (index + 1) * 200);
});


//create lateral menu
const lateral_menu_container = document.querySelector('#lateral-menu');
new LateralMenu(lateral_menu_container, [works_section_container, institutes_section_container, topics_section_container]);


//add works section dropdown
const works_section_options_container = works_section_container.querySelector(".options-container");
const works_dropdown = new DropDown(["Decrescente", "Crescente", "Alfabética"]);
works_dropdown.addEventListener("option-clicked", onOptionClicked);
works_dropdown.appendTo(works_section_options_container);
const text = document.createElement("p");
text.textContent = "Citações"
works_section_options_container.append(text)

//add topics section dropdown
const topics_section_options_container = topics_section_container.querySelector(".options-container");
const topics_dropdown = new DropDown(["Decrescente", "Crescente", "Alfabética"]);
topics_dropdown.addEventListener("option-clicked", onOptionClicked);
topics_dropdown.appendTo(topics_section_options_container);
const text2 = document.createElement("p");
text2.textContent = "Citações";
topics_section_options_container.append(text2);

//add institutes images
{
const images = document.querySelectorAll('.institute-image-container img');
for(const image of images){
    const alt = image.getAttribute("alt");
    fetch("/Image/"+alt)
        .then(response=>response.text())
        .then(url => image.src = url);
}
}

//add institutes listeners


const institute_cards = document.querySelectorAll(".institute-card");
for(const card of institute_cards){
    const id = card.getAttribute("id");
    fetch("/Institute/"+id)
        .then(response => response.text())
        .then(homepage_url =>{
            card.addEventListener("click",()=>window.open(homepage_url,"_blank"));
        });
}

