export default class LateralMenu{
    constructor(container,sections){
        this.container = container;
        this.sections = sections;
        this.nav_items = container.querySelectorAll('.nav-item');

        this.openMenu = this.openMenu.bind(this);
        this._closeMenu = this._closeMenu.bind(this);

        this._configureListeners();
        this._configureObserver();    
    }

    _configureListeners(){
        const open_btn = document.getElementById('open-btn');
        const close_btn = document.getElementById('close-btn');

        open_btn.addEventListener('click', this.openMenu);
        close_btn.addEventListener('click', this._closeMenu);

        this.container.addEventListener('click', (e)=>{
            const nav_item = e.target.closest('.nav-item');
            if(nav_item == null) return;
    
            for(const item of this.nav_items) item.classList.remove('selected');
            nav_item.classList.add('selected');
    
            const matched_section = document.getElementById(nav_item.getAttribute('section_id'));
            this._scrollTo(matched_section);
        });
    }

    openMenu(){
        this.container.classList.remove("hidden-menu");
    }

    _closeMenu(){
        this.container.classList.add("hidden-menu");
    }

    _configureObserver(){
        const observer = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting){
                const section = entries[0].target;
                this.nav_items.forEach(nav_item=>{
                    if(nav_item.getAttribute('section_id') == section.id)
                        nav_item.classList.add('selected');
                    else
                        nav_item.classList.remove('selected');
                });

                section.dispatchEvent(new CustomEvent("intersection"));
            }       
        },{
            root: null,
            threshold: 0.4,
            rootMargin: '0px'
        });

        for(const section of this.sections) observer.observe(section)
    }

    _scrollTo(element){
        element.scrollIntoView({behavior: 'smooth'});
    }
}