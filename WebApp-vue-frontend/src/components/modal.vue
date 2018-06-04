<template>
  <div>
    <!-- MyModal Component -->
    <b-modal id="addPostModal"
             ref="addPostModal"
             title="Add Post"
             size="lg"
             @hide="clear"
            >
             
      <form  id="postForm" @submit.stop.prevent="handleSubmit">
           <b-form-group
                id="title"
                label="Enter Post Title"
                :feedback="titlefeedback"
                :state="titlestate">
                <b-form-input id="postTitle"  :state="titlestate" v-model.trim="post.title"></b-form-input>
            </b-form-group>


            <b-form-group
                id="type"
                label="Type"
                :state="typestate">
            <b-form-select :state="typestate" v-model="post.type" class="mb-3">
                <option :value="null" disabled> Please select an option</option>
                <option value="Education">Education</option>
                <option value="Full Course">Full Course</option>
                <option value="Novel">Novel</option>
                <option value="Magazine">Magazine</option>
            </b-form-select>
           </b-form-group>

            <b-form-group
                id="grade"
                label="Grade"
                :state="gradestate">
            <b-form-select :state="gradestate" v-model="post.grade" class="mb-3">
                <option :value="null" disabled> Please select an option</option>
                <option value="Other">Other</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="O-level">O-level</option>
                <option value="A-level">A-level</option>
                <option value="BSC">BSC</option>
                <option value="MSC">MSC</option>
                <option value="Inter">Inter</option>
            </b-form-select>
           </b-form-group>


            <b-form-group
               id="descripton"
               label="Description"
               :feedback="descfeedback"
               :state="descstate">
              <b-form-textarea id="textarea2"
                   :state="descstate"
                   v-model.trim="post.description"
                   placeholder="Enter something"
                   :rows="3">
                   </b-form-textarea>
            </b-form-group>
        

             <b-form-file ref="imageInput" id="file_input1" :state="filestate" v-model="post.file"></b-form-file>
             <br> Selected file: {{post.file && post.file.name}}
            
            
          
            
      </form>
        <div slot="modal-footer">
            
                <b-form-group  v-if="addbtn"
                id="addbtn" ref="addbtn" >
                      <b-btn size="sm" class="float-left" variant="primary" @click="handleOk">
                        Submit
                      </b-btn>
                </b-form-group>
                <b-form-group
                id="addbtn" ref="editbtn" v-else>
                      <b-btn size="sm" class="float-left" variant="primary" @click.prevent="EditPost">
                        Edit
                      </b-btn>
                </b-form-group>
                 <b-form-group
                id="cancel" ref="cancel">
                      <b-btn size="sm" class="float-right" variant="primary" @click="cancel">
                        Cancel
                      </b-btn>
                </b-form-group>
    
              </div>  


    </b-modal>
    <!-- User Model -->
     <b-modal 
             id="UserModal"
             ref="UserModal"
             title="User"
             size="sm"
             @hide="clearUserModal"
            >
             <!-- Body -->
              <div class="modal-body">
                  <div class="card my-4 card-outline-primary">
                      <div class="card-body">
                          <img v-if="userModal.userProfile !== null" alt="User Pic" :src="getProfileImage" id="profile-image1" class=" card-img img-circle img-responsive">
                          <img v-else alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profile-image1" class=" card-img img-circle img-responsive">
 
                          <div  class="container" >
                                  <h3 id="modalUsername">{{userModal.username}}</h3>
                                  <p id="modalEmail"><b>{{userModal.userEmail}}</b></p>
                                  <p id="modalContact"><b>{{userModal.contact}}</b></p>
                                  <p id="modalCity"><b>{{userModal.city}} </b></p>
                                  <p id="modalAddress"><b>{{userModal.userAddress}} </b></p>            
                          </div>
                      </div>
                </div>
              </div>

               <div slot="modal-footer">
            
             
    
              </div>  

    </b-modal>
  </div>
</template>

<script>

import api from '../axios.js';
import PostsHelper from '../api/posts';
import { mapState,mapGetters,mapActions,mapMutations } from 'vuex'
let axi = api.getInstance();

export default {
  data () {
    return {
        post:{
            title:'',
            type:null,
            grade:null,
            description:'',
            file:null
        },
        editPostData:{
          editID:'',
          prevImage:''
        },
        userModal:{
          userProfile:null,
          username:'',
          userEmail:'',
          userAddress:'',
          contact:'',
          city:'',
          userIsPrivate:''
        },
        addbtn:true,
    }
  },
  methods: {
    showModal () {
      this.$refs.addPostModal.show();
    },
    clear () {
        this.post.title='';
        this.post.type=null;
        this.post.grade=null;
        this.post.description='';
        this.post.file=null;
        this.addbtn = true;
        this.editPostData.editID = '';
        this.editPostData.prevImage = '';
        this.$refs.imageInput.reset();

    },
    cancel()
    {
       this.clear();
       this.$refs.addPostModal.hide(); 
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.post.title || !this.post.type || !this.post.grade || !this.post.description || !this.post.file) {
        alert('Please enter all Fields')
      } else {
          let allowed = ['jpg','png'];
          if(allowed.indexOf(this.post.file.name.split('.')[1]) > -1)
          {
            this.handleSubmit()  
          }
          else
          {
              alert('Only images are required');
          }
      }
    },
    handleSubmit () {
      console.log(JSON.stringify(this.post));
      console.log('submiiting form');
      PostsHelper.addPost(this.post)
      .then((res)=>{
           this.clear();
           this.$emit('postAdded',[res]);
      }).catch((err)=>{

      })
      this.clear();
      this.$refs.addPostModal.hide();
    },
    editPost(post){
       console.log("modal editPsot is callled");
       this.post.title = post.postTitle;
       this.post.type = post.postType;
       this.post.grade = post.postGrade;
       this.post.description = post.postDescription;
       this.post.file = 'previous-image';
       this.editPostData.editID = post.postId;
       this.editPostData.prevImage = post.postUrl.split('/postPhoto/')[1];
       this.addbtn = false;
       this.showModal();
      
    },
    EditPost(){
       if (!this.post.title || !this.post.type || !this.post.grade || !this.post.description || !this.post.file) {
        alert('Please enter all Fields')
      } else {
        if(this.post.file !== 'previous-image')
        {
          let allowed = ['jpg','png'];
          if(!(allowed.indexOf(this.post.file.name.split('.')[1]) > -1))
          {
             alert('Only images are required');
          }
        }
        PostsHelper.EditPost(this.post,this.editPostData)
        .then((res)=>{
           console.log("post is updated");
           this.$refs.addPostModal.hide(); 
           this.$emit('postUpdated');
        })
        .catch((err)=>{
          console.log(err);
        })
       
      }

    },
    showUserModel(post){
      this.userModal.userProfile = post.userProfile;
      this.userModal.username = post.username;
      this.userModal.userEmail = post.userEmail;
      this.userModal.userAddress = post.userAddress;
      this.userModal.contact = post.contact;
      this.userModal.city = post.city;
      this.userModal.userIsPrivate = post.userIsPrivate;
      console.log(this.userModal);
      this.$refs.UserModal.show(); 
    },
    clearUserModal()
    {
      this.userModal.userProfile = null;
      this.userModal.username = '';
      this.userModal.userEmail = '';
      this.userModal.userAddress = '';
      this.userModal.contact = '';
      this.userModal.city = '';
      this.userModal.userIsPrivate = ''; 
    }
  },
  computed: {
    getProfileImage()
    {
        
              return 'http://localhost:3000/userPhoto/' + this.userModal.userProfile;
      
    },
    titlefeedback () {
      return this.post.title.length > 0 ? 'Enter at least 4 characters' : 'Please enter something'
    },
    titlestate () {
      return this.post.title.length > 4 ? 'valid' : 'invalid'
    },
    typestate(){
      return this.post.type !== null ? 'valid' : 'invalid'
    },
    gradestate(){
         return this.post.grade !== null ? 'valid' : 'invalid'
    },
    descstate(){
         return this.post.description.length > 10 ? 'valid' : 'invalid'
    },
    descfeedback(){
         return this.post.description.length < 10 ? 'Enter at least 10 characters' : ''
    },
    filestate(){
        return this.post.file !== null ? 'valid' : 'invalid'
    }
  },
  created(){
    // on parent generated event call this.editPost
    this.$parent.$on('editPost',this.editPost);
    this.$parent.$on('userModel',this.showUserModel);
  }
}
</script>

<style scoped>
#postForm {
margin-bottom: 100px;
} 

</style>

