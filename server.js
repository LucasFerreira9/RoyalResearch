const express = require("express");
const exphbs = require("express-handlebars");
const views = require("./routes/views");
const apis = require("./routes/apis");
const helpers = require("./helpers");

const app = express();

const hbs = exphbs.create({
    helpers
});

app.use(express.static("public"));
app.use(express.json());

app.engine("handlebars",hbs.engine);
app.set("view engine","handlebars");
app.set("views","./templates/");

const PORT = 3000;

function onServerStarts(){
    console.log("Server running on port "+PORT);
}

app.use(views);
app.use(apis);

app.listen(PORT,onServerStarts);



