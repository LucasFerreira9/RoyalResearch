class SearchResults {
    constructor(container) {
        this.container = container;
        this.results = [];
    }

    assignResults(results) {
        this.results = results;
    }

    renderTo() {
        this.show();
        this.container.innerHtml = "";

        if (this.results.length == 0)
            this.container.appendChild(this.#create_empty());
        else
            this.results.forEach(result => {
                const card = this.#create_card(
                    result.display_name,
                    result.id, 
                    result.last_known_institutions[0].display_name
                );
                this.container.appendChild(card);
            });
    }

    hidde(){
        this.container.classList.add("hidden");
    }

    show(){
        this.container.classList.remove("hidden");
    }

    #create_empty = () => {
        const text = document.createElement('p');
        text.id = 'empty-result';
        text.textContent = 'nenhum resultado encontrado';
        return text;
    }

    #create_card(author_name,author_id,institution) {
        const icon = document.createElement('img');
        icon.src = 'assets/icons/person.svg';
        icon.className = 'icon';

        const author_p = document.createElement('p');
        author_p.textContent = author_name;
        author_p.className = 'author-name';

        const institution_p = document.createElement('p');
        institution_p.innerHTML = institution;
        institution_p.className = 'institution-name';

        const info = document.createElement('div');
        info.append(author_p,institution_p);

        const card = document.createElement('div');
        card.classList.add("result-card");
        card.classList.add("selectable");
        card.append(icon,info);

        card.addEventListener('click', () => {
            const id = author_id.slice(author_id.lastIndexOf('/') + 1);
            window.location.href = `../loading.html?id=${id}`;
        });

        return card;
    }
}