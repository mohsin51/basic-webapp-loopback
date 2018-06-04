import api from '../axios'
let axi = api.getInstance();

let getPostArr = (posts) =>{
    let postsArr = [];
    let postObj ="";
    let Urlpart = 'http://localhost:3000/postPhoto/';

    posts.forEach((val,i) => {
        if(val.user !== null)
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
                username:val.user.firstname,
                city:val.user.city,
                uid:val.userId,
                contact:val.user.contact,
                userEmail:val.user.email,
                userIsPrivate:val.user.privateAddress,
                userAddress:val.user.address,
                userProfile:val.user.profile
            }
            postsArr.push(postObj);
        }
    })
    return postsArr; 
}

let getPosts = (paginatedObj) =>{

        let postsArr = [];

        paginatedObj.skip = paginatedObj.limit*(paginatedObj.currPage-1);
        let qsobj = {
            order:'updatedAt DESC',
            skip:paginatedObj.skip,
            limit:paginatedObj.limit,
            include:{
                relation: 'user'
           }
        };
        let qs = JSON.stringify(qsobj);
        return  axi.get('/posts/count')
        .then((count)=>{
            // console.log(count);
            paginatedObj.pageCount = Math.ceil(count.data.count / paginatedObj.limit);
            return axi.get('/posts?filter='+qs)
        })
        .then((posts)=> {
            //   console.log(posts)
              return getPostArr(posts.data);
        });
   
}


let getPostsByCategory = (paginatedObj,cat)=>{

   return new Promise((resolve,reject)=>{
        let postsArr = [];

        paginatedObj.skip = paginatedObj.limit*(paginatedObj.currPage-1);
        let qsobj = {
            order:'updatedAt DESC',
            skip:paginatedObj.skip,
            limit:paginatedObj.limit,
            where:{type:cat},
            include:{
                relation: 'user'
           }
        };
        let qsobj2 = {type:cat};
        let qs2 = JSON.stringify(qsobj2);

        let qs = JSON.stringify(qsobj);
        axi.get('/posts/count?where='+qs2)
        .then((count)=>{
            paginatedObj.pageCount = Math.ceil(count.data.count / paginatedObj.limit);
            return axi.get('/posts?filter='+qs)
        })
        .then((posts)=>{
            postsArr = getPostArr(posts.data);
            resolve(postsArr);
        }).catch((err)=>{
            console.log(err);
            reject(err);
        })
    })
}

let getPostsByCity = (paginatedObj,city) =>
{
    return new Promise((resolve,reject)=>{
        let postsArr = [];
        paginatedObj.skip = paginatedObj.limit*(paginatedObj.currPage-1);
        let qsobj = {
            skip:paginatedObj.skip,
            limit:paginatedObj.limit,
            city:city
        };
        let qs = JSON.stringify(qsobj)
        axi.get('/posts/getByCityRemote?qs='+qs)
        .then((res)=> {
            paginatedObj.pageCount = Math.ceil(res.data.result.count / paginatedObj.limit);
            postsArr = res.data.result.Posts;
            postsArr.forEach((val,i)=>{
                val.postUrl = "http://localhost:3000"+val.postUrl;
            })
            resolve(postsArr);
        })
        .catch((Err)=>{
            reject(Err);
        })
        
    })
}

let addPost = (post) =>{
    console.log(post)
    axi = api.getInstance();
    let obj = {
        name:post.title,
        type:post.type,
        description:post.description,
        grade:post.grade,
        pic:''
    }
    console.log(obj);
   
    let user = window.localStorage.User;
    user = JSON.parse(user);
    return new Promise((resolve,reject)=>{
        const data = new FormData();
        data.append('file',post.file);
        axi.post('/attachments/postPhoto/upload',data)
        .then((res)=>{
             console.log(res.data.result.files);
             let uniqname = res.data.result.files.file[0].name;
             console.log(uniqname);
             obj.pic = uniqname;
             return axi.post('/users/'+ user.id +'/posts',obj);
        })
        .then((result)=>{
            console.log("result");
            console.log(result);
            console.log("post is submiited");
            resolve(result);
        })
        .catch((err)=>{
            console.log(err);
            reject(err);
        })
    })

}


let myPosts = (paginatedObj) => {
    axi = api.getInstance();
    let user = window.localStorage.User;
    user = JSON.parse(user);
    return new Promise((resolve,reject)=>{
        let postsArr = [];
        paginatedObj.skip = paginatedObj.limit*(paginatedObj.currPage-1);
        let qsobj = {
            order:'updatedAt DESC',
            skip:paginatedObj.skip,
            limit:paginatedObj.limit,
            include:{
                relation: 'user'
            }
        };
        let qs = JSON.stringify(qsobj);
        axi.get('/users/'+user.id+'/posts/count')
        .then((count)=>{
            paginatedObj.pageCount = Math.ceil(count.data.count / paginatedObj.limit);
            return axi.get('/users/'+user.id+'/posts?filter='+qs)
        })
        .then((posts)=>{
            postsArr = getPostArr(posts.data);

            resolve(postsArr);
        }).catch((err)=>{
            console.log(err);
            reject(err);
        })
    })
}

let deletePost = (id) => {
    
    let user = window.localStorage.User;
    user = JSON.parse(user);
    return new Promise((resolve,reject)=>{
        axi.delete('/users/'+user.id+'/posts/'+id)
        .then((res)=>{
            resolve(res);
        }).catch((err)=>{
            console.log(err);
            reject(err);
        })
    })
}

let EditPost = (post,prevData) => {
    let user = window.localStorage.User;
    let id = prevData.editID;
    let prevImg = prevData.prevImage;
    user = JSON.parse(user);
    axi = api.getInstance();

    if( post.file === 'previous-image' )
    {
        let obj = {
            name:post.title,
            type:post.type,
            description:post.description,
            grade:post.grade
        }
        return new Promise((resolve,reject)=>{
            axi.put('/users/'+user.id+'/posts/'+id,obj)
            .then((res)=>{
                resolve(res);
            }).catch((err)=>{
                console.log(err);
                reject(err);
            })
        })
    }
    else
    {
        let obj = {
            name:post.title,
            type:post.type,
            description:post.description,
            grade:post.grade,
            pic:''
        }
        return new Promise((resolve,reject)=>{
            const data = new FormData();
            data.append('file',post.file);
            axi.post('/attachments/postPhoto/upload',data)
            .then((res)=>{
                 let uniqname = res.data.result.files.file[0].name;
                 console.log(uniqname);
                 obj.pic = uniqname;
                 return axi.put('/users/'+user.id+'/posts/'+id,obj)
            })
            .then((result)=>{
                console.log("post is updated");
                return axi.delete('/attachments/postPhoto/files/'+prevImg)
            })
            .then((res)=>{
                console.log("Edit pic deletion response");
                console.log(res);
                resolve(res);
            })
            .catch((err)=>{
                console.log(err);
                reject(err);
            })
        })

    }
}

let searchPost = (paginatedObj,query) =>{
        let postsArr = [];
        query= "%25"+query+"%25";
        paginatedObj.skip = paginatedObj.limit*(paginatedObj.currPage-1);
        let qsobj = {
            order:'updatedAt DESC',
            skip:paginatedObj.skip,
            limit:paginatedObj.limit,
            where:{name:{like:query}},
            include:{
                relation: 'user'
            }
        };
        let qs = JSON.stringify(qsobj);
        
        let qsobj2 = {name:{like:query}};
        let qs2 = JSON.stringify(qsobj2);
        console.log(qs2);
        return axi.get('/posts/count?where='+qs2)
            .then((count)=>{
                paginatedObj.pageCount = Math.ceil(count.data.count / paginatedObj.limit);
                return axi.get('/posts?filter='+qs)
            })
            .then(posts => getPostArr(posts.data))
   
}


export default { getPostArr,getPosts,getPostsByCategory,getPostsByCity,addPost,myPosts,deletePost,EditPost,searchPost } ;