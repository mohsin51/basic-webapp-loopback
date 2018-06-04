import api from '../../../axios';
import * as types from './mutation-types';
let axi = api.getInstance();

const action = {
    registerUser({commit,state},data)
    {
        return new Promise((resolve,reject)=>{
            axi.post('/users',data)
            .then((instance)=>{
                console.log("user is successfully registered"); 
                resolve("You are successfully registered Please Login");   
            }).catch((err)=>{
                reject(err);
            })      
        })
    },

    LoginUser({commit,state},data)
    {
        return new Promise((resolve,reject)=>{
            axi.post('/users/login',data)
            .then((instance)=>{
                console.log("setting access Token");
                let token = instance.data.id; 
                window.localStorage.AuthToken = token;
                commit(types.SET_TOKEN,token);
                let uid = instance.data.userId;
                axi = api.getInstance();
                return axi.get('/users/'+uid.toString());
            })
            .then((user)=>{
                console.log("setting user");
                let User = user.data;
                window.localStorage.User = JSON.stringify(User);
                commit(types.SET_USER,User);
                resolve(true);              
            })
            .catch((err)=>{
                reject(err);
            })
        })

    },

    LogoutUser({commit,state})
    {

        return new Promise((resolve,reject) => {
            axi.post('/users/logout')
            .then((response)=>{
               if(response.status === 204)
               {
                window.localStorage.User = null;
                window.localStorage.AuthToken = null;
                commit(types.REMOVE_TOKEN);
                commit(types.REMOVE_USER);
                resolve(true);
               }
            })
            .catch((err)=>{
                reject(err);
            })
        })

    },

    updateUser({commit,state},obj)
    {
        axi = api.getInstance();
      
        return new Promise((resolve,reject) => { 
            if(obj.user.profile === null || obj.user.profile === undefined)
            {
                delete obj.user.profile;
                axi.patch('/users',obj.user)
                .then((user)=>{
                    console.log("user is successfully updated"); 
                    let User = user.data;
                    window.localStorage.User = JSON.stringify(User);
                    commit(types.UPDATE_USER,User);
                    resolve("You are successfully updated");   
                }).catch((err)=>{
                    reject(err);
                })
           }
           else
           {
                const data = new FormData();
                data.append('file',obj.user.profile);
                axi.post('/attachments/userPhoto/upload',data)
                .then((res)=>{
                    let uniqname = res.data.result.files.file[0].name;
                    console.log(uniqname);
                    obj.user.profile = uniqname;
                    return axi.patch('/users',obj.user)
                })
                .then((user)=>{
                    console.log("user is updated");
                    let User = user.data;
                    window.localStorage.User = JSON.stringify(User);
                    commit(types.UPDATE_USER,User);
                    if(obj.prevProfile !== null)
                    {
                        return axi.delete('/attachments/userPhoto/files/'+obj.prevProfile);
                    }
                    else
                    {
                        resolve("user is updated");
                    }
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
           }   
        })
    }

}
export default action;