

<template>

    <div class="container">
      <div class="row"    style="margin-bottom: 50px;">
        <div class="col-md-9 col-md-offset-3">
          <div class="card panel-login">
            <div class="card-header">
              <div class="row">
                <div class="col-xs-6">
                  <a href=""@click.prevent="loginClick"  :class="{active:activecss.login}" id="login-form-link">Login</a>
                </div>
                <div class="col-xs-6">
                  <a href="" @click.prevent="signupClick" :class="{active:activecss.signup}" id="register-form-link">Register</a>
                </div>
              </div>
              <hr>
            </div>

            <div class="card-block">
              <div class="row">
                <div class="col-lg-12">
<!--  alerts  -->        
             
                 
             
                  <form id="login-form" action="/loginForm" method="post" role="form" style="display: block;">
                    <div class="form-group">
                      <input type="text" v-model="loginForm.email"   v-validate="'required|email'"  :class="{'input':true,'has-error': errors.has('email') }" name="email" id="username" tabindex="1" class="form-control" placeholder="Email" value="" required>
                      <p class="text-danger" v-show="errors.has('email')">{{ errors.first('email') }}</p>
                    </div>
                    <div class="form-group">
                      <input type="password" v-model="loginForm.password" v-validate="'required'"  :class="{'input':true,'has-error': errors.has('password') }" name="password" id="password" tabindex="2" class="form-control" placeholder="Password" required>
                       <p class="text-danger" v-show="errors.has('password')">{{ errors.first('password') }}</p>
                    </div>
                    <div class="form-group text-center">
                      <input type="checkbox" tabindex="3" class="" name="remember" id="remember">
                      <label for="remember"> Remember Me</label>
                    </div>
                    <div class="form-group">
                        <div>
                          <input type="submit"  @click.prevent="login" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Log In">
                        </div>
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="text-center">
                            <a href="https://phpoll.com/recover" tabindex="5" class="forgot-password">Forgot Password?</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                
                    <form id="register-form" action="#" method="post" role="form" style="display: none;">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-sm-6 form-group" >
                            <label>First Name</label>
                            <input type="text" v-validate="'required|alpha|min:3'"  :class="{'input':true,'has-error': errors.has('firstname') }" v-model="registerForm.firstname" name="firstname" placeholder="Enter First Name Here.." class="form-control " required>
                            <p class="text-danger" v-show="errors.has('firstname')">{{ errors.first('firstname') }}</p>
                          </div>
                          <div class="col-sm-6 form-group">
                            <label>Last Name</label>
                            <input type="text"  v-validate="'required|alpha|min:3'"  :class="{'input':true,'has-error': errors.has('lastname') }" v-model="registerForm.lastname" name="lastname" placeholder="Enter Last Name Here.." class="form-control" required>
                            <p class="text-danger" v-show="errors.has('lastname')">{{ errors.first('lastname') }}</p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label>Address</label>
                          <textarea  v-validate="'required'"  :class="{'has-error': errors.has('address')}" placeholder="Enter Address Here.." v-model="registerForm.address" name="address" rows="3" class="form-control"></textarea>
                          <p class="text-danger" v-show="errors.has('address')">{{ errors.first('address') }}</p>
                        </div>
                        <div class="form-check">
                          <label class="form-check-label">
                          <input class="form-check-input"  v-model="registerForm.privateAddress" name="privateAddress"type="checkbox">
                                             Make your Address private
                           </label>
                        </div>
                        <div class="row">
                          <div class="col-sm-6 form-group">
                            <label>City</label>
                            <input type="text" v-validate="'required|alpha|min:3|max:20'"  :class="{'has-error': errors.has('city')}"  v-model="registerForm.city" name="city" placeholder="Enter City Name Here.." class="form-control" required>
                             <p class="text-danger" v-show="errors.has('city')">{{ errors.first('city') }}</p>
                          </div>
                          <div class="col-sm-6 form-group">
                            <label>State</label>
                            <input type="text" v-validate="'required|alpha|min:3|max:20'"  :class="{'has-error': errors.has('state')}"  v-model="registerForm.state" name="state" placeholder="Enter State Name Here.." class="form-control" required>
                            <p class="text-danger" v-show="errors.has('state')">{{ errors.first('state') }}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6 form-group">
                            <label for="gender">Gender</label>
 							            <select v-model="registerForm.gender"  v-validate="'required'"  :class="{'has-error': errors.has('gender')}" class="form-control" name="gender" id="gender" required>
                                                <option disabled value="">Please select one</option>
										    	<option>Male</option>
										    	<option>Female</option>
						                </select>
                                        <p class="text-danger" v-show="errors.has('gender')">{{ errors.first('gender') }}</p>
                         </div>
                          <div class="col-sm-6 form-group">
                            <label>DOB</label>
					           		<!--<input type="text" class=" datepicker" placeholder="Date..."  name="DOB"> -->
                           <input v-model="registerForm.DOB"   v-validate="'required'"  :class="{'has-error': errors.has('DOB')}" type="date" name="DOB" placeholder="DOB" class="form-control datepicker" required>
                           <p class="text-danger" v-show="errors.has('DOB')">{{ errors.first('DOB') }}</p>
                          </div>
                       </div>
                       </div>                  
                        <div class="form-group">
                          <label>Phone Number</label>
                          <input type="tel"  v-validate="'required|numeric'"  :class="{'has-error': errors.has('contact')}"  v-model="registerForm.contact" name="contact" placeholder="Enter Phone Number Here.." class="form-control" required>
                          <p class="text-danger" v-show="errors.has('contact')">{{ errors.first('contact') }}</p>
                        </div>
                        <div class="form-group" >
                          <label>Email Address</label>
                          <input type="text" v-model="registerForm.email"  v-validate="'required|email'"  :class="{'input':true,'has-error': errors.has('Email') }" name="Email" placeholder="Enter Email Address Here.." class="form-control" required>
                          <p class="text-danger" v-show="errors.has('Email')">{{ errors.first('Email') }}</p>
                        </div>
                        <div class="form-group">
                          <label>password</label>
                          <input type="password"  v-model="registerForm.password" v-validate="'required|min:6|confirmed:confirmPass'"  :class="{'input':true,'has-error': errors.has('Password') }" name="Password" placeholder="Enter Password Here.." class="form-control" required>
                          <p class="text-danger" v-show="errors.has('Password')">{{ errors.first('Password') }}</p>
                        </div>
				                <div class="form-group">
                          <label>Confirm password</label>
                          <input type="password" data-vv-as="password"  v-validate="'required'"  :class="{'input':true,'has-error': errors.has('confirmPass') }" name="confirmPass" placeholder="Enter Password Here.." class="form-control " required>
                           <p class="text-danger" v-show="errors.has('confirmPass')">{{ errors.first('confirmPass') }}</p>
                        </div>

                        <div class="form-group">
				        	<input type="submit" @click.prevent="register" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now">	
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
                     <strong> Congrats </strong> {{succses}}
                  </div>
            
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    

</template>

<script>

import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { mapState,mapGetters,mapActions,mapMutations } from 'vuex'
// import api from '../axios.js';
// let axi = api.getInstance();
// import axios from 'axios';

Vue.use(VeeValidate);

  export default {
        name: 'signupLogin',
        // props :['error','success'],
        data () {
            return {
                error:null,
                succses:null,
                activecss:{
                    login:true,
                    signup:false
                },
                registerForm:{
                    firstname:"",
                    lastname:"",
                    address:"",
                    privateAddress:false,
                    city:"",
                    state:"",
                    gender:"",
                    DOB:"",
                    contact:"",
                    email:"",
                    password:""
                },
                loginForm:{
                    email:"",
                    password:""
                }
            }
        },
        methods: {
            ...mapActions('user', [
              'registerUser',
              'LoginUser'
            ]),         
            loginClick : function(){
                $("#login-form").delay(100).fadeIn(100);
                $("#register-form").fadeOut(100);
                this.activecss.login = true;
                this.activecss.signup = false;

            },
            signupClick : function() {
                $("#register-form").delay(100).fadeIn(100);
                $("#login-form").fadeOut(100);
                this.activecss.login = false;
                this.activecss.signup = true;
            },
            register:function(){  
                // console.log(this.registerForm);
                this.errors.clear(); 
                this.$validator.validateAll({  'firstname':this.registerForm.firstname,
                                               'lastname':this.registerForm.lastname,
                                               'address':this.registerForm.address,
                                               'city':this.registerForm.city,
                                               'state':this.registerForm.state,
                                               'gender':this.registerForm.gender,
                                               'DOB':this.registerForm.DOB,
                                               'contact':this.registerForm.contact,
                                               'Email':this.registerForm.email,
                                               'Password':this.registerForm.password}) 
                  .then((result) => {
                   console.log("result is " , result);
                   if(result)
                   {   
                       this.registerUser(this.registerForm)
                      .then((msg)=>{
                        console.log(msg);
                        this.error= null;
                        this.succses = msg;
                        // alert(msg);

                      }).catch((err)=>{
                        console.log(err);
                        this.error = err.message;
                      })
                
                   }
                })
                .catch((err)=>{
                    console.log("Error is ", err);
                });
                    
            },
            login:function(){
                 this.errors.clear();
                 this.$validator.validateAll({'email':this.loginForm.email,'password':this.loginForm.password})
                 .then((result)=>{
                     if(result)
                     {
                        this.LoginUser(this.loginForm)
                        .then((loggedIn)=>{
                          if(loggedIn)
                          {
                            this.error = null;
                            this.$router.push('/dashboard');
                          }
                        }).catch((err)=>{
                           this.error = err.message;
                        })

                     }
                 })
            }
            
        }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container {
    padding-top: 90px;
    padding-bottom: 30px;
}
.panel-login {
	border-color: #ccc;
	-webkit-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
	-moz-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
	box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
	padding: 20px;
}
.panel-login>.card-header {
	color: #00415d;
	background-color: #fff;
	border-color: #fff;
	text-align:center;
	
}
.panel-login>.card-header a{
	text-decoration: none;
	color: #666;
	font-weight: bold;
	font-size: 15px;
	-webkit-transition: all 0.1s linear;
	-moz-transition: all 0.1s linear;
	transition: all 0.1s linear;
	margin:70px;
}
.panel-login>.card-header a.active{
	color: #029f5b;
	font-size: 18px;
}
.panel-login>.card-header hr{
	margin-top: 10px;
	margin-bottom: 0px;
	clear: both;
	border: 0;
	height: 1px;
	background-image: -webkit-linear-gradient(left,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.15),rgba(0, 0, 0, 0));
	background-image: -moz-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
	background-image: -ms-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
	background-image: -o-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
}
.panel-login input[type="text"],.panel-login input[type="email"],.panel-login input[type="password"] {
	height: 45px;
	border: 1px solid #ddd;
	font-size: 16px;
	-webkit-transition: all 0.1s linear;
	-moz-transition: all 0.1s linear;
	transition: all 0.1s linear;
}
.panel-login input:hover,
.panel-login input:focus {
	outline:none;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	box-shadow: none;
	border-color: #ccc;
}
.btn-login {
	background-color: #59B2E0;
	outline: none;
	color: #fff;
	font-size: 14px;
	height: auto;
	font-weight: normal;
	padding: 14px 0;
	text-transform: uppercase;
	border-color: #59B2E6;
}
.btn-login:hover,
.btn-login:focus {
	color: #fff;
	background-color: #53A3CD;
	border-color: #53A3CD;
}
.forgot-password {
	text-decoration: underline;
	color: #888;
}
.forgot-password:hover,
.forgot-password:focus {
	text-decoration: underline;
	color: #666;
}

.btn-register {
	background-color: #1CB94E;
	outline: none;
	color: #fff;
	font-size: 14px;
	height: auto;
	font-weight: normal;
	padding: 14px 0;
	text-transform: uppercase;
	border-color: #1CB94A;
}
.btn-register:hover,
.btn-register:focus {
	color: #fff;
	background-color: #1CA347;
	border-color: #1CA347;
}
</style>
