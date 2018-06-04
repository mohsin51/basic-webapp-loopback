
let state = {};
if(window.localStorage.User !== undefined)
{
    state = {
        accessToken: window.localStorage.AuthToken,
        user: JSON.parse(window.localStorage.User)
     }
}
else
{
    state = {
        accessToken: null,
        user: null
     }

}


 export default state