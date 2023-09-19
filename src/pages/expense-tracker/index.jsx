import { signOut } from "firebase/auth";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAddTransaction } from "../../hooks/useAddTransaction"; //importing the hook that lets us write to the firebase database using a addDoc function
import {useGetTransactions} from "../../hooks/useGetTransactions";
import {useGetUserInfo} from "../../hooks/useGetUserInfo";
import { auth } from "../../config/firebase-config";
import{navigate} from "react-router-dom";
import "./styles.css";


export const ExpenseTracker = () =>{

     //call addTransaction when the submit button, becuase it will take in all requred attributes
    const { addTransaction } = useAddTransaction();
    const { transactions, transactionTotals } = useGetTransactions();
    const {name,profilePhoto} = useGetUserInfo();
    //adding info from user input in the html
    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType,setTransactionType] = useState("expense");
    const navigate = useNavigate();
    const {balance, income, expenses} = transactionTotals;

    //function that runs when teh submit button is pressed

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({
          description,
          transactionAmount,
          transactionType,
        });
    
        setDescription("");
        setTransactionAmount("");
      };

      const signUserOut =async() =>{
        try{
        await signOut(auth);
        localStorage.clear();
        navigate("/")
        }
        catch(error){
          console.error(error)
        }
      };

    return( 
        // <> added to return 2 divs, because only one thing can be returned. Because we are returning 
        //expense-tracker div and the transaction div
    <>  
    <div className="expence-tracker">
        <div className = "container">
            <h1>{name}'s Expense Tracker</h1>
            <div className="balance">
                <h3>Your balance</h3>
                {balance >= 0 ? (
                  <h2>${balance}</h2>
                ): (
                <h2>-${balance * -1}</h2>)}
                
            </div>
            <div className="summary">
                <div className="income">
                    <h4>Income</h4>
                    <p>${income}</p>
                </div>
                <div className="expenses">
                    <h4>Expenses</h4>
                    <p>${expenses}</p>
                </div>
            </div>
            <form className="add-transaction" onSubmit={onSubmit}>
               
                <input 
                type="text" 
                placeholder="Description" 
                required 
                //   When change occurs to one of these input boxes we will use the hooks we set up earlier to change the variable
                onChange={e  =>  setDescription(e.target.value)}
                /> 
                
                
                <input
                type="number"
                placeholder="Amount" 
                required
                //When change occurs to one of these input boxes we will use the hooks we set up earlier to change the variable
                onChange={e  => setTransactionAmount(e.target.value)}
                 />

                <input 
                type="radio" 
                id="expense" 
                value="expense" 
                checked= {transactionType == "expense"}
                //   When change occurs to one of these input boxes we will use the hooks we set up earlier to change the variable
                onChange={e  => setTransactionType(e.target.value)}
                />
                <label htmlFor="expense">Expense</label>

                <input 
                type="radio" 
                id="income" 
                value="income" 
                checked= {transactionType == "income"}
                //   When change occurs to one of these input boxes we will use the hooks we set up earlier to change the variable
                onChange={e  => setTransactionType(e.target.value)}
                />
                <label htmlFor="income">Income</label>

                <button type="submit">Add transaction</button>
            </form>
        </div>
        {profilePhoto && (
         <div className="profile">
           <img className="profile-photo" src = {profilePhoto}></img>
           <button className="sign-out-button" onClick={signUserOut}>Sign Out</button>
         </div>
        )}
    </div>
    
    
    
    
    <div className="transactions">
        <h3>Transaction</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li>
                <h4> {description} </h4>
                <p>
                  ${transactionAmount} •{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {" "}
                    {transactionType}{" "}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
    </div>
    </>
    );
}