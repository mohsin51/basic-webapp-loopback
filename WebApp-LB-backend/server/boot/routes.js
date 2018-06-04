let Promise = require('bluebird');
let LoopBackContext = require('loopback-context');
const url = require('url');
let pagination = require('../Functions/pagination');
let _ =  require("lodash");
module.exports = function(app)
{
    let router = app.loopback.Router();
    let User = app.models.user;
    let Post = app.models.post;

    router.get('/signup',(req,res) => {
        let ctx = LoopBackContext.getCurrentContext();
        let userObj =  ctx.get('currentUser');
        if(!userObj)
        {
            res.render('form/signup');
        }
        else
        {
            res.redirect('/');
        }
      
       
    })


    router.get('/logout',(req,res) => {
        let ctx = LoopBackContext.getCurrentContext();
        let Token =  ctx.get('accessToken');
        if( typeof Token != 'undefined')
        {
            User.logout(Token.id)
            .then(()=>{
            
                res.clearCookie('access_token');
                res.redirect('/');
            }).catch((err)=>{
                console.log(err);
                res.end;
            })
        }
    })



    router.get('/dashboard',(req,res) => {
        let ctx = LoopBackContext.getCurrentContext();
        let userObj = ctx.get('currentUser');
        let postsArr = [];
        let Count  = "";
        let limit = 4;
        Post.count()
        .then((count)=>{
            Count = count;
            return  Post.getLatestPosts(req,limit);
        })
        .then((posts)=>{
            postsArr = Post.getPostArr(posts);
            let paginatedObj = pagination.paginatedObj(req,Count,limit);
            if(!userObj)
            {
                res.render('dashboard/dashboard',{postsArr:postsArr,paginatedObj:paginatedObj,routePath:req.path});
            }
            else if(req.query.valid !== undefined)
            {
                res.render('dashboard/dashboard',{user:userObj,error:decodeURIComponent(req.query.valid),postsArr:postsArr,paginatedObj:paginatedObj,routePath:req.path});
            }
            else
            {            
                res.render('dashboard/dashboard',{user:userObj,postsArr:postsArr,paginatedObj:paginatedObj,routePath:req.path});
            }
            
        })
        .catch((err)=>{
            console.log(err);
        })
           
    })







    //SignupForm
    router.post('/SignupForm',(req,res) => {
         console.log(req.body);
         let error = "";
         let success = "";
         let privateAddress = false;
         let parsedPhone ='';
         if(typeof req.body.privateAddress !== undefined )
         {
            PrivateAddress = true;
         }
        
         if(!(parsedPhone = parseInt(req.body.phone)))
         {
            error += "Invalid Phone number";
            res.render('form/signup',{error:error});
         }
         let body = {
             firstname:req.body.firstname,
             lastname : req.body.lastname,
             address: req.body.address,
             city: req.body.city,
             state:req.body.state,
             gender:req.body.gender,
             DOB : req.body.dob,
             contact: req.body.phone,
             email:req.body.email,
             privateAddress:PrivateAddress,
             password:req.body.password
         }
  
         if(body.password !== req.body.confirmPass)
         {
            error += "password does not match";
            res.render('form/signup',{error:error});
         }
         else
         {
            User.create(body)
               .then((instance) =>{
                  console.log(instance);
                  console.log("user is registered");
                  success += "You are Registered now please login ."
                  res.render('form/signup',{success:success});
               })
              .catch((err) => {
                   console.log("user is not registered");    
                   console.log("This is error.message" ,err.message);
                   let message = err.message;
                   res.render('form/signup',{error:err.message});
              });       

         }
        
    })

    // Login Form
    router.post('/loginForm',(req,res) => {
    let myToken = '';

        User.login({email:req.body.email,password : req.body.password})
        .then((token)=> {
                 //Validating Token
                 //  token.validate((err,isValid) => { 
                 //     console.log(isValid);
                //  });
             console.log(" Token id  " + token.id);
             myToken = token;
             return   User.findById(token.userId);
        }).then((user) => {
            console.log("User is logged in ");
            res.cookie('access_token', myToken.id, {  signed: req.signedCookies ? true : false , maxAge: 900000, rolling : true });
            res.redirect('dashboard');

        }).catch((err) => {
            res.render('form/signup',{error:err.message});
        })
    });


    // Upload Post
    router.post('/postForm',(req,res)=>{
        let ctx = LoopBackContext.getCurrentContext();
        let userObj = ctx.get('currentUser');
        console.log(userObj);
       

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
                let obj = {
                    name:resp.fields.name[0],
                    type:resp.fields.type[0],
                    description:resp.fields.desc[0],
                    grade:resp.fields.grade[0],
                    pic:resp.files.fileimg[0].name
                };

                userObj.posts.create(obj)
                .then((instance)=>{
                    console.log(`${instance} is added`);
                    res.redirect('/dashboard');
                })
                .catch((err)=>{
                    console.log(err);
                    res.end(err);c
                })
            }
          
        }));

    })


    //Get By Category
   
    router.get('/postType/:type',(req,res) => {
        let ctx = LoopBackContext.getCurrentContext();
        let userObj = ctx.get('currentUser');

        let postsArr = [];
        let Count  = "";
        let limit = 4;
        Post.count({type:req.params.type})
        .then((count)=>{
            Count = count;
            return  Post.getByCategory(req,limit);
        })
        .then((posts)=>{
            postsArr = Post.getPostArr(posts);
            let paginatedObj = pagination.paginatedObj(req,Count,limit);
            if(!userObj)
            {
                res.render('dashboard/dashboard',{postsArr:postsArr,paginatedObj:paginatedObj,routePath:req.path});
            }
            else
            {            
                res.render('dashboard/dashboard',{user:userObj,postsArr:postsArr,paginatedObj:paginatedObj,routePath:req.path});
            }
            
        })
        .catch((err)=>{
            console.log(err);
        })
           
    })

    //Get By City
    router.get('/postCity/:city',(req,res) => {
        let ctx = LoopBackContext.getCurrentContext();
        let userObj = ctx.get('currentUser');
        let postsArr = [];
        let Count  = "";
        let limit = 4;
        Post.find({include:{relation:'user',scope:{where:{city:req.params.city}}}})
        .then((data)=>{
            Count = _.filter(data, (post)=>{
                return post.user() !== null
            }).length;      
            return   Post.getByCity(req,limit);
        })
        .then((posts) => {

            postsArr = Post.getPostArr(posts);
            let paginatedObj = pagination.paginatedObj(req,Count,limit);
            if(!userObj)
            {
                res.render('dashboard/dashboard',{postsArr:postsArr,paginatedObj:paginatedObj,routePath:req.path});
            }
            else
            {            
                res.render('dashboard/dashboard',{user:userObj,postsArr:postsArr,paginatedObj:paginatedObj,routePath:req.path});
            }       
        })
        .catch((err)=>{
            console.log(err);
        })
           
    })


    // Search 
    router.get('/Search',(req,res) => {
        let ctx = LoopBackContext.getCurrentContext();
        let userObj = ctx.get('currentUser');
        let postsArr = [];
        let Count  = "";
        let limit = 4;

        console.log(req.query.search);
        let query = req.query.search;
        // let pattern = new RegExp('.*'+query+'.*', "i");
       
        Post.count({name:{like:'%'+query+'%'}})
        .then((count)=>{
            console.log("Count is " + count);
            Count = count;
            return  Post.getSearched(req,limit);
        })
        .then((posts)=>{
            postsArr = Post.getPostArr(posts);
            let paginatedObj = pagination.paginatedObj(req,Count,limit);
            if(!userObj)
            {
                res.render('dashboard/dashboard',{postsArr:postsArr,paginatedObj:paginatedObj,routePath:req.path,search:query});
            }
            else if(req.query.valid !== undefined)
            {
                res.render('dashboard/dashboard',{user:userObj,error:decodeURIComponent(req.query.valid),postsArr:postsArr,paginatedObj:paginatedObj,routePath:req.path,search:query});
            }
            else
            {            
                res.render('dashboard/dashboard',{user:userObj,postsArr:postsArr,paginatedObj:paginatedObj,routePath:req.path,search:query});
            }
            
        })
        .catch((err)=>{
            console.log(err);
        })
           
    })



  


   



   
    
    app.use(router);
 
    
}