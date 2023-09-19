import {auth,provider} from '../../config/firebase-config';
import {signInWithPopup} from 'firebase/auth';
import {useNavigate, navigate, Navigate} from "react-router-dom";
import {useGetUserInfo} from "../../hooks/useGetUserInfo";
import "./styles.css";
import { useEffect } from 'react';
export const Auth = () =>{

    const navigate = useNavigate();// changed name for readibility
    const {isAuth} = useGetUserInfo();
    //Funtion to fun sign in with google and results info about the user, like name, email, and if they logged in
    const signInWithGoogle = async() =>{
        const results = await signInWithPopup(auth,provider);
        //this is to keep the user signed in

        //First we make an object to hold all the user info pulled for the signinwithpopup funtion.
        //gets the userid, name, photo, and sets isAuth == if they signed in => true
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }

        //local storage is what keeps them signed in and JSON.stringify turns the object into a string
        //we do this because we can't keep a object inside of an object. it needs to be string
        localStorage.setItem("auth", JSON.stringify(authInfo))
        navigate("/expense-tracker"); //after logining in it will take the user to the expense tracker page
        
        };

        if(isAuth){
            return < Navigate to="/expense-tracker" />;
        }
    return <div className="login-page">
         <p>Sign In With Google</p>
         {/* when this button is clicked the google sign in page should open as it should run the funtion */}
         <button className="Login-with-google-btn" onClick={signInWithGoogle}> 
             {" "}
            Sign In with Google
            </button>
         </div>
}