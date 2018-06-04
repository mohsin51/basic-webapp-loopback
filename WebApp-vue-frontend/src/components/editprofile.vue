<template>
  
     <!-- Page Content -->
    <b-container class="container">

      <b-row class="row">
         

        <!-- Blog Entries Column -->
        <div class="col-md-8">

          <!-- Form -->
          <div class="card my-4 card-outline-success">
              <form id="register-form" role="form" style="padding:50px;">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-sm-6 form-group" >
                            <label>First Name</label>
                            <input type="text" v-validate="'required|alpha|min:3'"  :class="{'input':true,'has-error': errors.has('firstname') }" v-model="editForm.firstname" name="firstname" placeholder="Enter First Name Here.." class="form-control ">
                            <p class="text-danger" v-show="errors.has('firstname')">{{ errors.first('firstname') }}</p>
                          </div>
                          <div class="col-sm-6 form-group">
                            <label>Last Name</label>
                            <input type="text"  v-validate="'required|alpha|min:3'"  :class="{'input':true,'has-error': errors.has('lastname') }" v-model="editForm.lastname" name="lastname" placeholder="Enter Last Name Here.." class="form-control">
                            <p class="text-danger" v-show="errors.has('lastname')">{{ errors.first('lastname') }}</p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label>Address</label>
                          <textarea  v-validate="'required'"  :class="{'has-error': errors.has('address')}" placeholder="Enter Address Here.." v-model="editForm.address" name="address" rows="3" class="form-control"></textarea>
                          <p class="text-danger" v-show="errors.has('address')">{{ errors.first('address') }}</p>
                        </div>
                        <div class="form-check">
                          <label class="form-check-label">
                          <input class="form-check-input" v-model="editForm.privateAddress" name="privateAddress"type="checkbox">
                                             Make your Address private
                           </label>
                        </div>
                        <div class="row">
                          <div class="col-sm-6 form-group">
                            <label>City</label>
                            <input type="text" v-validate="'required|alpha|min:3|max:20'"  :class="{'has-error': errors.has('city')}"  v-model="editForm.city" name="city" placeholder="Enter City Name Here.." class="form-control" >
                             <p class="text-danger" v-show="errors.has('city')">{{ errors.first('city') }}</p>
                          </div>
                          <div class="col-sm-6 form-group">
                            <label>State</label>
                            <input type="text" v-validate="'required|alpha|min:3|max:20'"  :class="{'has-error': errors.has('state')}"  v-model="editForm.state" name="state" placeholder="Enter State Name Here.." class="form-control">
                            <p class="text-danger" v-show="errors.has('state')">{{ errors.first('state') }}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6 form-group">
                            <label for="gender">Gender</label>
 							            <select v-model="editForm.gender"  v-validate="'required'"  :class="{'has-error': errors.has('gender')}" class="form-control" name="gender" id="gender">
                                                <option disabled value="">Please select one</option>
										    	<option>Male</option>
										    	<option>Female</option>
						                </select>
                                        <p class="text-danger" v-show="errors.has('gender')">{{ errors.first('gender') }}</p>
                         </div>
                          <div class="col-sm-6 form-group">
                            <label>DOB</label>
					           		<!--<input type="text" class=" datepicker" placeholder="Date..."  name="DOB"> -->
                           <input v-model="editForm.DOB"   v-validate="'required'"  :class="{'has-error': errors.has('DOB')}" type="date" name="DOB" placeholder="DOB" class="form-control datepicker">
                           <p class="text-danger" v-show="errors.has('DOB')">{{ errors.first('DOB') }}</p>
                          </div>
                       </div>
                       </div>                  
                        <div class="form-group">
                          <label>Phone Number</label>
                          <input type="tel"  v-validate="'required|numeric'"  :class="{'has-error': errors.has('contact')}"  v-model="editForm.contact" name="contact" placeholder="Enter Phone Number Here.." class="form-control" >
                          <p class="text-danger" v-show="errors.has('contact')">{{ errors.first('contact') }}</p>
                        </div>

                        <div class="form-group ">
                         <label for="image">Update Profile</label>
                            <input type="file" name="Profimg" v-validate.reject="'image|size:1000'" :class="{'has-error': errors.has('Profimg')}"  @change="getProfile($event)" class="form-control-file" id="modalImage" aria-describedby="fileHelp" >
                            <p class="text-danger" v-show="errors.has('Profimg')">{{ errors.first('Profimg') }}</p>
                            <small id="fileHelp" class="form-text text-muted">Only image files are allowed .</small>
                         </div>    
                      <div class="form-group" style="margin-left:50px; margin-right:50px;">
                                <input type="submit" name="edit-submit" id="edit-submit" @click.prevent="edit" tabindex="4" class="form-control btn btn-success" value="Update">	
                      </div>


                    </form>

                  <div v-if="error" class="alert alert-danger alert-dissmissible fade show">
                     <button class="close" type="button" data-dismiss="alert">
                            <span>×</span>
                     </button>
                     <strong>Error</strong> {{error}} <span> Please try again</span>
                  </div>
                
                  <div v-if="succses" class="alert alert-success alert-dissmissible fade show">
                     <button class="close" type="button" data-dismiss="alert">
                            <span>×</span>
                     </button>
                     <strong> Edited </strong> {{succses}}
                  </div>
          </div>
        <!-- /Form -->
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
            </div>
          </div>
        </template>
   

        </div>

      </b-row>
      <!-- /.row -->

    </b-container>

</template>
<script>

import api from '../axios.js';
import PostsHelper from '../api/posts';
import { mapState,mapGetters,mapActions,mapMutations } from 'vuex'
let axi = api.getInstance();

import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

export default {
  name: 'editProfilePage',
  props :[],
  data () {
    return {
        error:null,
        succses:null,
        ProfileBaseUrl:"http://localhost:3000/userPhoto/",
        PrevProfile:null,
        editForm:{
                id:"",
                firstname:"",
                lastname:"",
                address:"",
                privateAddress:false,
                city:"",
                state:"",
                gender:"",
                DOB:"",
                contact:"",
                profile:null
            }
     }
  },
  methods : {
     ...mapActions('user', [
        'updateUser'
      ]),
      clear(){
          console.log(" ON CLEAR", this.user.profile);          
          this.PrevProfile = this.user.profile;
          this.editForm.profile = null;
      },
      edit(){
        this.errors.clear(); 
        this.$validator.validateAll({   'firstname':this.editForm.firstname,
                                        'lastname':this.editForm.lastname,
                                        'address':this.editForm.address,
                                        'city':this.editForm.city,
                                        'state':this.editForm.state,
                                        'gender':this.editForm.gender,
                                        'DOB':this.editForm.DOB,
                                        'contact':this.editForm.contact,
                                     })
            .then((result) => {
            console.log("result is " , result);
            if(result)
            {   
                console.log("calling with prevProfile :"+ this.PrevProfile );
                console.log("calling with user.profile :"+ this.editForm.profile);
                let obj = {
                    user:this.editForm,
                    prevProfile:this.PrevProfile
                };
                this.updateUser(obj)
                .then((res)=>{
                    console.log(res);
                    this.clear();
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
        })
        .catch((err)=>{
            console.log("Error is ", err);
        });

      },
      getProfile(event)
      {
          this.editForm.profile = event.target.files[0];
    
      },
      checkobj()
      {
          console.log(this.editForm);
      }

  },
  computed : {
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
   },
   updatePrevProfile()
   {
       // run when ever the user is updated
       console.log("updatePrevPRofile()");
       this.prevProfile = this.user.profile;
   }
  },
  created(){
      
      this.editForm.firstname = this.user.firstname;
      this.editForm.lastname = this.user.lastname;
      this.editForm.address = this.user.address;
      this.editForm.privateAddress  = this.user.privateAddress;
      this.editForm.city = this.user.city;
      this.editForm.state = this.user.state;
      this.editForm.gender = this.user.gender;
      this.editForm.DOB = this.user.DOB.split('T')[0];
      this.editForm.contact = this.user.contact;
      this.editForm.id = this.user.id;
      console.log("this.User",this.user);
      console.log("this.editForm",this.editForm);
      this.PrevProfile = this.user.profile;
      console.log(this.PrevProfile);
  },
  watch:{
      '$store.state.user'(val){
          console.log("from watch",val);
      }
  }
}
</script>
