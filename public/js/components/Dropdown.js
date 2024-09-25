export default class DropDown {
    closed = true;

    constructor(options) {
        this.options_array = options;

        this.container = document.createElement("div");
        this.container.classList.add("dropdown");

        this.button = document.createElement("div");
        this.button.classList.add("dropdown-btn");
        this.arrow_icon = document.createElement("img");
        this.arrow_icon.src = "../assets/icons/dropdown-arrow.svg";

        this.options = document.createElement("div");
        this.options.classList.add("dropdown-options");
        for (let option of options) {
            let op = document.createElement("a");
            op.textContent = option;
            op.classList.add("selectable");
            op.addEventListener("click",(event)=>{
                const clicked_option = event.currentTarget.textContent;
                this.container.dispatchEvent(new CustomEvent("option-clicked", {
                    detail: { option: clicked_option }
                }));
                this.button.replaceChild(document.createTextNode(clicked_option), this.button.firstChild);
                this._hiddeDropdown();
                this.closed = true;
            })
            this.options.appendChild(op);
        }
        
        this.button.append(document.createTextNode(options[0]));
        this.button.append(this.arrow_icon);
        this.button.addEventListener("click", () => {
            if (this.closed) this._showDropdown();
            else this._hiddeDropdown();

            this.closed = !this.closed;
        });
        this.container.append(this.button, this.options);     
    }

    addEventListener(name, listener) {
        this.container.addEventListener(name, listener);
    }

    appendTo(container){
        container.appendChild(this.container);
    }

    _hiddeDropdown() {
        this.options.style.visibility = "hidden";
        this.arrow_icon.style.transform = "rotate(0deg)"
    }

    _showDropdown() {
        this.options.style.visibility = "visible";
        this.arrow_icon.style.transform = "rotate(180deg)";
    }
}