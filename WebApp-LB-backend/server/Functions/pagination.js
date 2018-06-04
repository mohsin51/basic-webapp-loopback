simplePagination = function(postsArr,req)
{
    let postsSize = postsArr.length;
    let pageSize = 4;
    let pageCount = Math.round(postsSize / pageSize);
    let currPage = 1;
    let postsGroups = [];
    let partOfList = postsArr;
    
    while (postsArr.length > 0) {
        postsGroups.push(postsArr.splice(0, pageSize));
    }

    if (typeof req.query.page !== 'undefined') {
        currPage = req.query.page;
    }

    //select list from group which we want to show
    if(postsSize !== 0)
    {
        partOfList = postsGroups[currPage - 1];
    }
    

    return {
        postsArr: partOfList,
        pageSize: pageSize,
        postsSize: postsSize,
        pageCount: pageCount,
        currentPage: currPage
    };

};

paginatedObj = function(req,count,limit)
{
    let currPage = 1;
    if (typeof req.query.page !== 'undefined') {
        currPage = req.query.page;
    }
    let pageCount = Math.ceil(count / limit);
    return {
        pageCount: pageCount,
        currentPage: currPage
    };
};

getUserSkip = function(posts)
{
   

}

module.exports = {simplePagination,paginatedObj };