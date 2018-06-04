<template>
<!-- Page Content -->
<div class="container">

<!-- include Modal -->
 <modal @postAdded="refresh" @postUpdated="showMyPosts" ></modal>
<!-- /include Modal -->


      <!-- Page Heading/Breadcrumbs -->
      <h1 class="mt-4 mb-3">Users
        <small>Posts</small>
      </h1>

      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="/">Home</a>
        </li>
        <li class="breadcrumb-item active">Posts</li>
      </ol>
    
          <div v-if="error" class="alert alert-danger alert-dissmissible fade show">
                <button class="close" type="button" data-dismiss="alert">
                    <span>×</span>
                </button>
                <strong>Failed </strong> {{error}}
          </div>
    

      <div class="row">

        <!-- Blog Entries Column -->
        <div class="col-md-8">

          <!-- Blog Post -->

    
         <!--  check for key attribute -->
            <div v-for="(post, index) in postsArr" class="card mb-4 card-outline-primary postItem" :key="index" id="uniq<%=i%>">
              <img class="card-img-top"  :src="post.postUrl" alt="Card image cap" style="max-width:75%; max-height:75%; align-self:center;">
              <hr>
              <div class="card-body">
                <h2 class="card-title postTitle">{{post.postTitle}}  </h2> 
                <p class="card-text"> {{post.postDescription}} </p>
              </div>
              <div class="card-footer card-inverse card-primary" style="color:white;text-align: left;">
                Posted on {{post.postUpdatedAt}}   by

                  <Button v-if="currViewType=== 'myPosts'" :data-id="post.postId" :data-Obj="JSON.stringify(post) " class="btn btn-info btn-sm postProfile" >  {{post.username }} </Button>
                  <a v-else href="#" @click.prevent="$emit('userModel', post)" class="btn btn-info btn-sm">{{post.username}}  </a>
               
                 <template v-if="currViewType === 'myPosts'">
                    <!-- <Button :data-id="post.postId " :data-Obj="JSON.stringify(post)" @click.prevent="this.$emit('editPost', post);" class="btn btn-success btn-sm postEdit" style="margin-left:25px;"> Edit </Button> -->
                    <Button @click.prevent="$emit('editPost', post)" class="btn btn-success btn-sm postEdit" style="margin-left:25px;"> Edit </Button>
                    <a href="" @click.prevent="deletePost(post.postId)" class="btn btn-danger btn-sm"> Delete </a>
                 </template>
                <div class="posttype" style="float:right;">
                  <a href="" @click.prevent="getByCat(post.postType)" class="btn btn-info btn-sm">{{post.postType}} </a>
                </div>
                <br>
                Contact : {{post.contact}}  
                <div class="posttype" style="float:right;">
                  <a href="" @click.prevent="getByCity(post.city)" class="btn btn-info btn-sm">{{post.city}}</a>
                </div>          
              </div>
            </div>



          <!-- Pagination -->
             <pagination :current-page="paginatedObj.currPage"
                :total-pages="paginatedObj.pageCount"
                :items-per-page="paginatedObj.limit"
                @page-changed="pageOneChanged">
              </pagination>  
          <!-- /Pagination -->

        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">

          <!-- Profile --> 

        <template v-if="user">
          <div class="card my-4 card-outline-primary">
          <h5 class="card-header card-inverse card-primary" style="color:white;">Profile</h5>
          <div class="card-body">
               <!-- <img class="card-img-top img-circle img-responsive" src="http://placehold.it/750x300" alt="Card image cap"> -->
              
                  <img v-if="user.profile !== null" alt="User Pic" :src="getProfileImage" id="profile-image1" class=" card-img img-circle img-responsive">
                  <img v-else alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profile-image1" class=" card-img img-circle img-responsive">

               <div class="container" >
                      <h3>{{user.firstname }}</h3>
                      <p><b> {{ user.email }}</b></p>
                      <b> {{user.contact }} </b> 
               </div>
                     <hr>
                    <ul class="container details" >
                      <li><p><span class="glyphicon glyphicon-user one" style="width:50px;"></span> <button class="btn btn-link" v-b-modal.addPostModal>Add Post</button></p></li>
                        <!-- <li><p><span class="glyphicon glyphicon-user one" style="width:50px;"></span> <a href="" v-b-modal.addPostModal>Add Post</a></p></li> -->
                      <li><p><span class="glyphicon glyphicon-envelope one" style="width:50px;"></span><a href ="/editProfile" >Edit Profile</a></p></li>
                   
                          <li v-if="currViewType === 'myPosts'"><p><span class="glyphicon glyphicon-envelope one" style="width:50px;"></span><a href ="" @click.prevent="showAllPosts">All Posts</a></p></li>
                          <li v-else ><p><span class="glyphicon glyphicon-envelope one" style="width:50px;"></span><a href ="" @click.prevent="showMyPosts">My Posts</a></p></li>
                    
                    </ul>      
            </div>
          </div>
        </template>


          <!-- Search Widget -->
          <div class="card mb-4 card-outline-info">
            <h5 class="card-header card-inverse card-success" style="color:white;">Search</h5>
            <div class="card-body">
            <form method="GET" action="/Search">
              <div class="input-group">
                <!-- <input v-if="search === null" type="text" id="searchBar" name="search" class="form-control"  placeholder="Search for..."> -->
                <!-- <input v-else type="text" id="searchBar" name="search" class="form-control" :value="search"> -->
                <input type="text" id="searchBar" name="search" class="form-control" v-model="search" placeholder="Search for...">
                <span class="input-group-btn">
                  <button class="btn btn-success" type="submit"  @click.prevent="searchPost" id="searchBtnn">Search</button>
                </span>
              </div>
            </form>
            </div>
          </div>

          <!-- Categories Widget -->
          <div class="card my-4 card-outline-primary">
            <h5 class="card-header card-inverse card-primary" style="color:white;">Categories</h5>
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="" @click.prevent="getByCat('Education',$event)">Education</a>
                    </li>
                    <li>
                      <a href="" @click.prevent="getByCat('Full Course',$event)">Full Courses</a>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-6">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="" @click.prevent="getByCat('Novel',$event)">Novels</a>
                    </li>
                    <li>
                      <a href="" @click.prevent="getByCat('Magazine',$event)">Magazines</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Side Widget -->
        

        </div>

      </div>
      <!-- /.row -->

    </div>
</template>

<script>


import api from '../axios.js';
import PostsHelper from '../api/posts';
import { mapState,mapGetters,mapActions,mapMutations } from 'vuex'
let axi = api.getInstance();
import Pagination from './pagination.vue';
import modal from './modal.vue';



export default {
  name: 'dashboardPage',
  props :[],
  components : { Pagination,modal },
  data () {
    return {
        ProfileBaseUrl:"http://localhost:3000/userPhoto/",
        error:null,
        postsArr:[],
        myPosts:false,
        viewType:['dashboard','category','city','search','myPosts'],
        paginatedObj:{
            pageCount:0,
            currPage:1,
            skip:0,
            limit:4
        },
        search:null,
        routePath:"",
        currViewType:"",
        currCategory:"",
        currCity:""
    }
  },
  methods: {
    refresh(res){
        this.getPosts();
    },
    showMyPosts(){
        if(this.currViewType !== this.viewType[4]) //myPosts
        {
             this.resetPaginate();
             this.currViewType = this.viewType[4];
             this.myPosts = true;
        }
        PostsHelper.myPosts(this.paginatedObj)
        .then((posts)=>{
            // console.log(posts);
            this.postsArr = posts;
        })
        .catch((err)=>{
            console.log(err);
        })
    },
    showAllPosts(){
        this.myPosts = false;
        this.getPosts();
    },
    pageOneChanged (pageNum) {
       console.log(pageNum);
       this.paginatedObj.currPage = pageNum;
        switch(this.currViewType)
        {
          case this.viewType[0] : // dashboard
          {
              this.getPosts(this.paginatedObj);
              break;
          }
          case this.viewType[1] :
          {
              this.getByCat(this.currCategory);
              break;
          }
          case this.viewType[2] :
          {
              this.getByCity(this.currCity);
              break;
          }
          case this.viewType[3] :
          {
              this.searchPost();
              break;
          }
          case this.viewType[4] :
          {
              this.showMyPosts();
              break;
          }
        }
    },
    getPosts(paginatedObj){
         if(this.currViewType !== this.viewType[0]) //dashboard
         {
             this.resetPaginate();
             this.currViewType = this.viewType[0];
         }
         PostsHelper.getPosts(this.paginatedObj)
        .then((posts)=>{
            this.postsArr = posts;
        })
        .catch((err)=>{
            console.log(err);
        })
    },
    getByCat(cat){
        console.log(cat);
        if(this.currViewType !== this.viewType[1]) //cat
        {
             this.resetPaginate();
             this.currViewType = this.viewType[1];
             this.currCategory = cat;
        }
        PostsHelper.getPostsByCategory(this.paginatedObj,cat)
        .then((posts)=>{
            this.postsArr = posts;
        })
        .catch((err)=>{
            console.log(err);
        })
    },
    getByCity(city){
       
        if(this.currViewType !== this.viewType[2]) //city
        {
             this.resetPaginate();
             this.currViewType = this.viewType[2];
             this.currCity = city;
        }
        PostsHelper.getPostsByCity(this.paginatedObj,city)
        .then((posts)=> {
           this.postsArr= posts;
        })
        .catch((err)=> {
            console.log(err);
        })
    },
    resetPaginate()
    {
        this.paginatedObj.pageCount = 0;
        this.paginatedObj.currPage = 1;
    },
    deletePost(id)
    {
        console.log("delete this id " + id);
        PostsHelper.deletePost(id)
        .then((res)=>{
            console.log(res);
            this.showMyPosts();
        })
        .catch((err)=>{
            console.log(err);
        })
    },
    searchPost()
    {
        if(this.currViewType !== this.viewType[3]) //search
        {
             this.resetPaginate();
             this.currViewType = this.viewType[3];
        }
        PostsHelper.searchPost(this.paginatedObj,this.search)
        .then((posts) => {
            console.log(posts);
            this.postsArr= posts;
        })
        .catch((err)=> {
            console.log(err);
        })
    }

  },
  computed:{
  ...mapState('user',[
     'accessToken',
     'user'
   ]),
   getProfileImage()
   {
       if(this.user !== null)
       {
             return this.ProfileBaseUrl + this.user.profile;
       }
   }

  },
  created() {
        console.log("created is called");
        this.getPosts(this.paginatedObj);
        this.resetPaginate();
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
