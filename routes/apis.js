const express = require("express");
const Images = require("../util/Images");
const OpenAlex = require("../util/OpenAlex");

const router = express.Router();

async function searchImage(req,res){
    const name = req.params.Name;
    const url = await Images.search_image(name);
    res.send(url);
}

async function searchInstitution(req, res){
    const id = req.params.id;
    const response = await OpenAlex.fetchInstitution(id);
    res.send(response.homepage_url)
}

async function fetchAuthors(req, res){
    const name = req.params.Name;
    const response = await OpenAlex.fetchAuthors(name);
    res.json(response);
}

router.get("/Image/:Name",searchImage);
router.get("/Institute/:id",searchInstitution);
router.get("/Authors/:Name", fetchAuthors);

module.exports = router;


