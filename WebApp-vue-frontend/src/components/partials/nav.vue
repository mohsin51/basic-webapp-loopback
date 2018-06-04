 <template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="/">{{title}}</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive" >
          <ul class="navbar-nav ml-auto" >

          
            <li v-if="checkLoggedIn" class="nav-item" >
              <a class="nav-link" href="" @click.prevent="logout()">Logout</a>
            </li>
        
            <li v-else class="nav-item" >
              <a class="nav-link" href="/signup">Login</a>
            </li>
       
            <li class="nav-item">
              <a class="nav-link" href="/dashboard">Posts</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
import { mapState,mapGetters,mapActions,mapMutations } from 'vuex';

export default {
  name: 'nav-bar',
  data () {
    return {
      msg: 'Nav Page',
      title:'Project Title',
      loggedIn:false
    }
  },
  methods: {
       ...mapActions('user', [
              'LogoutUser'
      ]),
      logout(){
        this.LogoutUser()
        .then((res)=>{
          // this.$router.push('/');
          window.location.reload();
          console.log("user is logged out");
        })
      }
  },
  computed:{
   ...mapState('user',[
     'accessToken',
     'user'
   ]),
   checkLoggedIn(){
      if(this.user === null)
      {
          return this.loggedIn = false;
      }
      else
      {
          return this.loggedIn = true;
      }
   }
  },
  created() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>


