//return back an object of all the users info as a custom hook

export const useGetUserInfo = () =>{
    const {name,profilePhoto, userID, isAuth} = JSON.parse(
        localStorage.getItem("auth")
    );
        // return all the user info so that we can use all the time
    return {name,profilePhoto,userID,isAuth} 

}