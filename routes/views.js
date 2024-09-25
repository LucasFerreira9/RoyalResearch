const express = require("express");
const openalex = require("../util/OpenAlex");
const Images = require("../util/Images");
const functions = require("../util/functions");
const router = express.Router();

async function getAuthor(req,res){
    const author_id = req.params.id;
    
    const author_response = await openalex.fetchAuthor(author_id);
    const author_name = author_response.display_name;

    const works_response = await openalex.fetchWorks(author_response.works_api_url);
    const author_image_url = await Images.search_image(author_name);
    
    const works = works_response.results;
    const works_number = author_response.works_count;
    const cited_number = author_response.cited_by_count;
    const current_institution = author_response.last_known_institutions[0].display_name;
    const institutes = author_response.affiliations;
    const topics = author_response.topics;

    res.render("author",{
        author_name,
        works,
        max_work_citations: functions.getMaxWorksCitations(works),
        max_topics_citations: functions.getMaxTopicsCitations(topics),
        author_image_url,
        works_number,
        cited_number,
        current_institution,
        institutes,
        topics
    });
}

function index(req,res){
    res.render("index");
}

//pages

router.get("/",index);
router.get("/author/:id",getAuthor);

module.exports = router;


