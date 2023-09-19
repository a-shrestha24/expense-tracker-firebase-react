// //hooks always start with use
// import {addDoc,collection,serverTimestamp} from "firebase/firestore"; //to add documents to firebase
// import {db} from "../config/firebase-config";//
// import {useGetUserInfo} from "../hooks/useGetUserInfo";//To get all of the user info
// export const useAddTransaction = () =>{
//     const transactionCollectionRef = collection(db, "transactions") // need a reference to collection. And we made sure there is a 
//     //connection to our collection of transaction

//     //pulling out the userID to use in the addDoc from the custom hook
//     const {userID} = useGetUserInfo() 


//     const addTransaction = async(
//         //useAddTransaction function will take in these values as paremeters and then use them in the addhoc
//         {
//         description,
//         transactionAmount,
//         transactionType,
//         }
//     ) =>{
//         //addDoc is used to add documents to a firebase database.
        
//         //We are going to use addDoc to add transaction to the database we set up
        
//         //addDoc takes in 2 parameters. 1 being the location of where to write, which we specifed in transactionCollectionRef variable. And the second
//         //being a interface like object that has all the attributes of the transaction object
//         await addDoc(transactionCollectionRef, {
//             //This is imported in the userGetUserInfo from the hook that only return the user info. Then in a function is pulled out
//             userID,
//             //will be passed into function 
//             description,
//             transactionAmount,
//             transactionType,
//             //uses a import from firebase to get the time of when the transaction was made
//             createdAt:serverTimestamp()
//         }) 
//     }
//     return {addTransaction};
// }

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();
  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    await addDoc(transactionCollectionRef, {
      userID,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};