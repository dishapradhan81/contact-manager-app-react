import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function AddContact(props) {    

    const navigate=useNavigate();


    const [User, setUser] = useState({name:"", email:""});

    let add = (e) => {
        e.preventDefault();     // we dont want our page to get refresh when we click button
        if(User.name === "" || User.email === ""){
            alert("All the fields are mandatory!");
            return;
        }
        props.addContactHandler(User);
        setUser({name: "", email: ""});

        //console.log(this.props);
       
       navigate('/');
      
      
    };
    

        return(
            <div className="ui main">
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit = {add}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="name" value = {User.name} onChange={ (e) => setUser({...User, name: e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="xyz@gmail.com" value = {User.email} onChange={ (e) => setUser({...User, email: e.target.value})}/>
                    </div>
                    <button className="ui button blue"> Add </button> 
                </form>

            </div>
           

        );
    
      
    
};


export default AddContact;

