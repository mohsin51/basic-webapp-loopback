'use strict';
let _ = require("lodash");
let Promise = require('bluebird');
module.exports = function(Post) {


    //get All Latest Posts
    Post.getLatestPosts= function() {
        return Post.find({
             order:'updatedAt DESC',
             include:{
                 relation: 'user'
            }
        });
    };

    //get All by category
    Post.getByCategory = (cat) => {
        return Post.find({
             order:'updatedAt DESC',
             where:{type:cat},
             include:{
                 relation: 'user'
            }
        });
    };
    
    // get All By City
    Post.getByCity = (city) => {
        return Post.find({
            order: 'updatedAt DESC',
            include : {
                relation:'user',
                scope:{
                    where:{
                        city:city
                    }
                }
            }
        });

    };

     //convert posts result into usable obj 
    Post.getPostArr= (posts) =>{
        let postsArr = [];
        let postObj ="";
        let Urlpart = '/postPhoto/';
    
        posts.forEach((val,i) => {
            if(val.user() !== null)
            {
                let Fulldate = new Date(val.updatedAt);
                let date = Fulldate.toLocaleDateString();
                let postObj = {
                    postId:val.id,
                    postTitle:val.name,
                    postType:val.type,
                    postDescription:val.description,
                    postGrade:val.grade,
                    postUrl:Urlpart+val.pic,
                    postUpdatedAt:date,
                    username:val.user().firstname,
                    city:val.user().city,
                    uid:val.userId,
                    contact:val.user().contact,
                    userEmail:val.user().email,
                    userIsPrivate:val.user().privateAddress,
                    userAddress:val.user().address,
                    userProfile:val.user().profile
                }
                postsArr.push(postObj);
            }
        })
        return postsArr; 
    }

    // get Latest by limit
    Post.getLatestPosts = (req,limit) => {
        let currPage = 1;
        let skip = 0;
        if (typeof req.query.page !== 'undefined') {
            currPage = req.query.page;
        }
        skip = limit*(currPage-1);

        return Post.find({
            order:'updatedAt DESC',
            skip:skip,
            limit:limit,
            include:{
                relation: 'user'
           }
       });

    }

    // get category by limit 
    Post.getByCategory = (req,limit) => {
        let cat = req.params.type;
        let currPage = 1;
        let skip = 0;
        if (typeof req.query.page !== 'undefined') {
            currPage = req.query.page;
        }
        skip = limit*(currPage-1);

        return Post.find({
             order:'updatedAt DESC',
             skip:skip,
             limit:limit,
             where:{type:cat},
             include:{
                 relation: 'user'
            }
        });
    };

    // get All By City and limit
    Post.getByCity = (req,limit) => {
        let city = req.params.city;
        let currPage = 1;
        let skip = 0;
        if (typeof req.query.page !== 'undefined') {
            currPage = req.query.page;
        }
        skip = limit*(currPage-1);

        return Post.find({
            order: 'updatedAt DESC',
            include : {
                relation:'user',
                scope:{
                    where:{
                        city:city
                    }
                }
            }
        }).then((posts)=>{
            let result = _.filter(posts, (post)=> post.user() !== null).splice(skip, limit);
            return Promise.resolve(result);
        });

    };


    // get Latest by limit
    Post.getSearched = (req,limit) => {
        let currPage = 1;
        let skip = 0;
        if (typeof req.query.page !== 'undefined') {
            currPage = req.query.page;
        }
        skip = limit*(currPage-1);
        // let pattern = new RegExp('.*'+req.query.search+'.*', "i");
        let query = req.query.search;
        return Post.find({
            order:'updatedAt DESC',
            skip:skip,
            limit:limit,
            where:{
                name:{like:'%'+query+'%'}
            },
            include:{
                relation: 'user'
           }
       });

    }
   


};
