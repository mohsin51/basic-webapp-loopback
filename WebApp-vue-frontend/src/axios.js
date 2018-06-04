import axios from 'axios';
let getInstance = function(){
       let authToken = "";
       if(typeof window === 'undefined')
       {
          authToken = 'TEST'
       }
       else
       {
          authToken = window.localStorage.AuthToken;
       }

       let instance = axios.create({
         baseURL: 'http://localhost:3000/api',
         headers:{'Content-Type':'application/json','Authorization':authToken}
       });
    
    return instance;
};


export default {getInstance};