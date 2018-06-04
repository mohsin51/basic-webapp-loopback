'use strict';

module.exports = function(Users) {
  // get All post wrt city
  Users.getPostsByCity = (city) => {
    return Users.find({     
        where:{city:city},
        include:{
            relation: 'posts',
            scope:{
                order:'updatedAt DESC'
            }
       }
    });
  };


  //has many method result 
  Users.getPostArr= (users) =>{
    let postsArr = [];
    let postObj ="";
    let Urlpart = '/postPhoto/';
    users.forEach((val,i)=>{
        let usersPosts = val.posts();
        usersPosts.forEach((post,i)=>{
            let Fulldate = new Date(post.updatedAt);
            let date = Fulldate.toLocaleDateString();
            postObj = {
            postId:post.id,
            postTitle:post.name,
            postType:post.type,
            postDescription:post.description,
            postGrade:post.grade,
            postUrl:Urlpart+post.pic,
            postUpdatedAt:date,
            username:val.firstname,
            city:val.city,
            uid:post.userId,
            contact:val.contact,
          } 
          postsArr.push(postObj);            
        })
    })
    return postsArr; 
  };

   // get All post wrt city and limit
   Users.getPostsByCity = (req,limit) => {
    let city = req.params.city;
    let currPage = 1;
    let skip = 0;
    if (typeof req.query.page !== 'undefined') {
        currPage = req.query.page;
    }
    skip = limit*(currPage-1);
    return Users.find({     
        where:{city:city},
        skip:skip,
        limit:limit,
        include:{
            relation: 'posts',
            scope:{
                order:'updatedAt DESC'
            }
       }
    });
  };

  Users.getMyPosts =(userObj,req,limit) => {
    let currPage = 1;
    let skip = 0;
    if (typeof req.query.page !== 'undefined') {
        currPage = req.query.page;
    }
    skip = limit*(currPage-1);

    return userObj.posts({
      order:"updatedAt DESC",
      skip:skip,
      limit:limit
    });
  };

  Users.getMyPostsArr = (userObj,posts) =>{
         let Urlpart = '/postPhoto/';
         let postsArr = [];

          posts.forEach((val,i)=>{
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
                username:userObj.firstname,
                city:userObj.city,
                uid:val.userId,
                contact:userObj.contact,
            }
            postsArr.push(postObj);
        });
        return postsArr;
  }




};


