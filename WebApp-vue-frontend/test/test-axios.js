const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const sinon = require('sinon');
let fs = require('fs');


import  PostApi from '../src/api/posts'; 

let paginatedObj = {
    pageCount:0,
    currPage:1,
    skip:0,
    limit:4
};
let qsobj = {
    order:'updatedAt DESC',
    skip:paginatedObj.skip,
    limit:paginatedObj.limit,
    include:{
        relation: 'user'
   }
};
let qs = JSON.stringify(qsobj);

let CountResponse = {
    count:11
};

let getPostsResponse = [
            {
                createdAt:"2017-11-21T13:16:07.000Z",
                description : "asdsadasdasd",
                grade : "Other" ,
                id : 16,   
                name :"POST 12 updated",
                pic  : "77d99fed-49e9-4f5c-b92b-9b92f3f387ad.jpg",
                type : "Novel",
                updatedAt : "2017-11-23T06:54:51.000Z",
                userId : 1,
                user:{
                        DOB : "2444-02-04T00:00:00.000Z",
                        address : "h123  updated 1234",
                        city:"lahore",
                        contact:"03444141121",
                        createdAt:"2017-11-06T12:11:19.000Z",
                        email:"mohsinamjad51@gmail.com",
                        emailVerified:null,
                        firstname:"mohsin",
                        gender:"Male",
                        id:1,
                        lastname:"amjad",
                        privateAddress:true,
                        profile:"25f18225-b96f-44bf-a526-a178a033b8be.jpg",
                        realm:null,
                        state:"pak",
                        updatedAt:"2017-11-23T08:04:34.000Z",
                        username:null
                }
            },
            {
                createdAt:"2017-11-21T13:16:07.000Z",
                description : "asdsadasdasd",
                grade : "Other" ,
                id : 16,   
                name :"POST 12 updated",
                pic  : "77d99fed-49e9-4f5c-b92b-9b92f3f387ad.jpg",
                type : "Novel",
                updatedAt : "2017-11-23T06:54:51.000Z",
                userId : 1,
                user:{
                        DOB : "2444-02-04T00:00:00.000Z",
                        address : "h123  updated 1234",
                        city:"lahore",
                        contact:"03444141121",
                        createdAt:"2017-11-06T12:11:19.000Z",
                        email:"mohsinamjad51@gmail.com",
                        emailVerified:null,
                        firstname:"mohsin",
                        gender:"Male",
                        id:1,
                        lastname:"amjad",
                        privateAddress:true,
                        profile:"25f18225-b96f-44bf-a526-a178a033b8be.jpg",
                        realm:null,
                        state:"pak",
                        updatedAt:"2017-11-23T08:04:34.000Z",
                        username:null
                }
            },
            {
                createdAt:"2017-11-21T13:16:07.000Z",
                description : "asdsadasdasd",
                grade : "Other" ,
                id : 16,   
                name :"POST 12 updated",
                pic  : "77d99fed-49e9-4f5c-b92b-9b92f3f387ad.jpg",
                type : "Novel",
                updatedAt : "2017-11-23T06:54:51.000Z",
                userId : 1,
                user:{
                        DOB : "2444-02-04T00:00:00.000Z",
                        address : "h123  updated 1234",
                        city:"lahore",
                        contact:"03444141121",
                        createdAt:"2017-11-06T12:11:19.000Z",
                        email:"mohsinamjad51@gmail.com",
                        emailVerified:null,
                        firstname:"mohsin",
                        gender:"Male",
                        id:1,
                        lastname:"amjad",
                        privateAddress:true,
                        profile:"25f18225-b96f-44bf-a526-a178a033b8be.jpg",
                        realm:null,
                        state:"pak",
                        updatedAt:"2017-11-23T08:04:34.000Z",
                        username:null
                }
            },
            {
                createdAt:"2017-11-21T13:16:07.000Z",
                description : "asdsadasdasd",
                grade : "Other" ,
                id : 16,   
                name :"POST 12 updated",
                pic  : "77d99fed-49e9-4f5c-b92b-9b92f3f387ad.jpg",
                type : "Novel",
                updatedAt : "2017-11-23T06:54:51.000Z",
                userId : 1,
                user:{
                        DOB : "2444-02-04T00:00:00.000Z",
                        address : "h123  updated 1234",
                        city:"lahore",
                        contact:"03444141121",
                        createdAt:"2017-11-06T12:11:19.000Z",
                        email:"mohsinamjad51@gmail.com",
                        emailVerified:null,
                        firstname:"mohsin",
                        gender:"Male",
                        id:1,
                        lastname:"amjad",
                        privateAddress:true,
                        profile:"25f18225-b96f-44bf-a526-a178a033b8be.jpg",
                        realm:null,
                        state:"pak",
                        updatedAt:"2017-11-23T08:04:34.000Z",
                        username:null
                }
            }
        ];





//--compilers js:babel-register 
describe.only('Get Posts test', () => {
    beforeEach(() => {  
      // When passing query string user encodeURI to make final URL  
      nock('http://localhost:3000/api',{reqheaders:{'Content-Type':'application/json','Authorization':'TEST'}})
        .log(console.log)
        .get('/posts/count')
        .reply(200, CountResponse)
        .get('/posts?filter='+encodeURI(qs))
        .reply(200,getPostsResponse);
    });
  
    it('Get Posts test', (done) => {
        PostApi.getPosts(paginatedObj)
        .then((posts) => {
            console.log("posts are");
            console.log(posts);
            expect(posts).to.be.an('array');
            expect(posts[0].postType).to.equal('Novel');
            expect(posts[0].postId).to.be.a('number');
            expect(posts[0]).to.have.property('contact');
            expect(posts[0].userIsPrivate).to.be.true;
            
            done();
        }).catch((err)=>{
            
            done(err);
        })
    });

    afterEach(function() {
        // runs after each test in this block
    });

  });

//----------------------------------------------

let img = fs.readFileSync(__dirname+'/images.jpg');
let obj = {
    description:"testing testing",
    grade:"Other",
    name:"testing 1",
    pic:"7f2abf18-ffa8-4cc8-a4de-188c26a5f882.jpg",
    type:"Education"   
}
let post = {
                title:"testing 1",
                type:"Education",
                grade:"Other",
                description:"testing testing",
                file:img
           }
    // console.log(localStorage);       
    // console.log(window.localStorage.User);       
    // const data = new FormData();
    // data.append('file',post.file);

let photoUploadResponse = {
    result:{
        files:{
            file:[
                {
                 container:"postPhoto",
                 field:"file",
                 name:"7f2abf18-ffa8-4cc8-a4de-188c26a5f882.jpg",
                 originalFilename:"images.jpg",
                 size:16917,
                 type:"image/jpeg"    
                }
            ]
        }
    }
}
let postUploadResult = {
    createdAt:"2017-11-27T13:03:56.430Z",
    description:"testing testing",
    grade:"Other",
    id:27,
    name:"testing 1",
    pic:"7f2abf18-ffa8-4cc8-a4de-188c26a5f882.jpg",
    type:"Education",
    updatedAt:"2017-11-27T13:03:56.430Z",
    userId:1
}

let addPost = (post) =>{
    axi = api.getInstance();
    let obj = {
        name:post.title,
        type:post.type,
        description:post.description,
        grade:post.grade,
        pic:''
    }
   
    let user = {id:1};

  
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
}




describe('Add Post test', () => {
    beforeEach(() => {  
    // When passing query string user encodeURI to make final URL  
    nock('http://localhost:3000/api',{reqheaders:{'Content-Type':'application/json','Authorization':'TEST'}})
    .log(console.log)
    .post('/attachments/postPhoto/upload',data)
    .reply(200, photoUploadResponse)
    .post('/users/1/posts',obj)
    .reply(200,postUploadResult);
    });

    it('Get Posts test', (done) => {
    PostApi.addPost(post)
    .then((res) => {
        console.log("post added");
        console.log(res);
      
        done();
    }).catch((err)=>{
        
        done(err);
    })
    });

    afterEach(function() {
    // runs after each test in this block
    });

});