function getMaxWorksCitations(works){
    let max_citations = 0;
    works.forEach(work => {
        if (work.cited_by_count > max_citations)
            max_citations = work.cited_by_count;
    });
    return max_citations;
}

function getMaxTopicsCitations(topics){
    let max_citations = 0;
    topics.forEach(work => {
        if (work.count > max_citations)
            max_citations = work.count;
    });
    return max_citations;
}

module.exports = {
    getMaxWorksCitations,
    getMaxTopicsCitations
}