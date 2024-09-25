const container = document.querySelector("body div");
const animation = bodymovin.loadAnimation({
    container: container,
    path: "./assets/loading.json",
    render: "svg",
    loop:true,
    autoplay:true,
    name:"loading-animation"
});

const author_id = new URLSearchParams(window.location.search).get('id');

window.location.href = "/author/"+author_id,"_blank";