
let app = require('../server.js');
module.exports = function() {

    let accessModel = app.models.accessToken;
    let User = app.models.user;

    return function tokenParser(req, res, next) {
        console.log(req.accessToken);
       if((typeof req.signedCookies !== 'undefined') && (typeof req.signedCookies.access_token !== 'undefined'))
        {
              
                let accessID = req.cookies.access_token;
                
                accessModel.findById(accessID)
               .then((obj) => {
              
                let uid = obj.userId;
                return User.findById(uid);
        
                }).then((user)=>{
                req.user = user;
                res.locals.user = user;
                console.log(user.id);
                console.log("setting user to req"); 
                // return  next();
                next(); 
                }).catch((err)=>{
                console.log(err);
                });    
      }
    //  return next();
     next();
    };
  };


  // tokenParser function in routes

//   function tokenParser(req) {
//     console.log("Cookies  ",req.cookies);
//    let accessModel = app.models.accessToken;
//    let User = app.models.user;

//    return new Promise((resolve,reject) => {
//        if((typeof req.cookies !== 'undefined') && (typeof req.cookies.access_token !== 'undefined'))
//        {

//            let accessID = req.cookies.access_token;
           
//            accessModel.findById(accessID)
//            .then((obj) => {
//               // obj can be null so
//               if(obj === null)
//               {
//                    throw new Error("User not Found");
//               }
//                let uid = obj.userId;
//                return User.findById(uid);
   
//            }).then((user)=>{
//                req.user = user;
//                console.log(user.id);
//                console.log("setting user to req"); 
//                resolve(true);
//            }).catch((err)=>{
//                // console.log(err);
//                resolve(false);
//            });    
//        }
//        else
//        {
//            resolve(false);
//        }
//    });
// }


// Admin Role 
  // Users.observe('after save',(ctx,next)=>{
  //     let Role = Users.app.models.Role;
  //     let RoleMapping = Users.app.models.RoleMapping;
  //     // console.log("ctx.instance", ctx.instance);
  //     let charAtFisrt = ctx.instance.firstname.toLowerCase().charAt(0);
  //     console.log(charAtFisrt);
  //     if((ctx.instance.email === "mohsinamjad51@gmail.com"))
  //     {
  //         console.log("Accessing Role", Role);
  //         Role.findOrCreate({name:'admin'},(err,role)=>{
  //             if (err) {return console.log(err);}
  //             console.log("ROLE : " ,role);
  //             RoleMapping.findOrCreate({
  //                 principalType: RoleMapping.USER,
  //                 principalId: ctx.instance.id,
  //                 roleId:role.id
  //               }, function(err, principal) {
  //                  if(err) throw err;
  //                  //  console.log(principal);
  //                  console.log('User assigned RoleID ' + role.id + ' (' + ctx.instance.firstname + ')');
  //             });
  //         })
  //     }
  //     next();
  // })