let Promise = require('bluebird');
let LoopBackContext = require('loopback-context');
let pagination = require('../Functions/pagination');
const url = require('url');
module.exports = function(app)
{
    let router = app.loopback.Router();
    let User = app.models.user;
    let Post = app.models.post;

 
       router.get('/myPosts',(req,res) => {
        let ctx = LoopBackContext.getCurrentContext();
        let userObj =  ctx.get('currentUser');
        if(!userObj)
        {
            res.redirect('/dashboard');
        }
        else
        {
            let postsArr = [];
            let Count  = "";
            let limit = 4;
            userObj.posts.count()
            .then((count)=>{
               Count = count;
               return  User.getMyPosts(userObj,req,limit);
            })
            .then((posts) =>{
               postsArr = User.getMyPostsArr(userObj,posts);
               let paginatedObj = pagination.paginatedObj(req,Count,limit);
               res.render('dashboard/dashboard',{user:userObj,postsArr:postsArr,myPosts:true,paginatedObj:paginatedObj,routePath:req.path});         
            })
           .catch((err)=>{
               console.log(err);
               res.end(JSON.stringify(err));
           })
        }
    })


    //Delete Posts
    router.get('/deletePost/:id',(req,res)=>{
        let ctx = LoopBackContext.getCurrentContext();
        let userObj = ctx.get('currentUser');
        let storageService = app.datasources.storage.connector;
        let picName = "";

        // userObj.posts.destroy(req.params.id, function(err) {});
        if(!userObj)
        {
            res.redirect('/dashboard');
        }
        else
        {
            userObj.posts.findById(req.params.id)
            .then((post)=>{
                picName = post.pic;
                return post.destroy();
            })
            .then(()=>{
            storageService.removeFile("postPhoto", picName, (err,resp)=>{
                if(err) throw new Error("Error while removing post pic");
                res.redirect('/myPosts');
            })   
            }).catch((err) =>{
                console.log((err));
            })


        }
    })


    //Edit Post
    router.post('/editPost/:id',(req,res)=>{
    let ctx = LoopBackContext.getCurrentContext();
    let userObj = ctx.get('currentUser');

        app.dataSources.storage.connector.allowedContentTypes = ["image/jpg", "image/jpeg", "image/png"];
        let storageService = app.datasources.storage.connector;
        storageService.upload({provider: "filesystem"},req,res,{container:"postPhoto"},((err,resp)=>{
            console.log("Error :", err);
            if(err)
            {
                let Err = encodeURIComponent('Only Images are required [image/jpg, image/jpeg, image/png]');
                res.redirect(url.format({
                    pathname:"/dashboard",
                    query:{
                        "valid":Err
                    }
                    }));
            }
            else
            {
                // if(resp.files.hasOwnProperty('file')){
                //     console.log("file is attached");
                // }
                let oldPic = "";
                let obj = {
                    name:resp.fields.name[0],
                    type:resp.fields.type[0],
                    description:resp.fields.desc[0],
                    grade:resp.fields.grade[0],
                    pic:resp.files.fileimg[0].name
                };
                userObj.posts.findById(req.params.id)
                .then((oldPost)=>{
                    oldPic = oldPost.pic;
                    return oldPost.updateAttributes(obj);
                }).then((updatedPost)=>{
                    storageService.removeFile("postPhoto", oldPic, (err,resp)=>{
                        if(err) throw new Error("Error while removing old pic");
                        res.redirect('/myPosts');
                    })
                }).catch((err)=>{
                    console.log(err);
                })

            }
            
        }));
        
    })

    
    router.get('/editProfile',(req,res)=>{
    let ctx = LoopBackContext.getCurrentContext();
    let userObj = ctx.get('currentUser');
        if(!userObj)
        {
            res.redirect('/dashboard');
        }
        else
        {
            res.render('form/editprofile',{user:userObj});
        }    
    })

    router.post('/editProfileForm',(req,res) =>{
        let ctx = LoopBackContext.getCurrentContext();
        let userObj = ctx.get('currentUser');
            app.dataSources.storage.connector.allowedContentTypes = ["image/jpg", "image/jpeg", "image/png"];
            let storageService = app.datasources.storage.connector;
            storageService.upload({provider: "filesystem"},req,res,{container:"userPhoto"},((err,resp)=>{
                if(err)
                {
                    // let Err = encodeURIComponent('Only Images are required [image/jpg, image/jpeg, image/png]');
                    // res.redirect(url.format({
                    //     pathname:"/editProfile",
                    //     query:{
                    //         "valid":Err
                    //     }
                    //   }));
                    res.render('form/editprofile',{user:userObj,error:'Only Images are required [image/jpg, image/jpeg, image/png]'});
                }
                else
                {

                    let privateAddress =false;
                    if(typeof resp.fields.privateAddress !== undefined)
                    {
                        privateAddress = true;
                    }
                    let obj = {
                        firstname:resp.fields.firstname[0],
                        lastname:resp.fields.lastname[0],
                        address:resp.fields.address[0],
                        city:resp.fields.city[0],
                        state:resp.fields.state[0],
                        gender:resp.fields.gender[0],
                        DOB:resp.fields.dob[0],
                        contact:resp.fields.phone[0],
                        privateAddress:privateAddress,
                        profile:resp.files.Profimg[0].name
                    };
                    let oldProfilePic = "";
                    User.findById(userObj.id)
                    .then((oldUser) => {
                        oldProfilePic = oldUser.profile;
                        return oldUser.updateAttributes(obj);
                    }).then((updatedUser)=>{
                        console.log("Old profile : " + oldProfilePic );
                        if(oldProfilePic !== null)
                        {
                          storageService.removeFile("userPhoto", oldProfilePic, (err,resp)=>{
                             if(err) throw new Error("Error while removing old pic");
                             res.redirect('/editProfile');
                          })
                        }
                        else
                        {
                            res.redirect('/editProfile');
                        }
                    })

                }
              
            }));

    })



    app.use(router);
}