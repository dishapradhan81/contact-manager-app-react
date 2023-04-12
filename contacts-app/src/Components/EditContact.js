import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from'react-router-dom';



function EditContact(props) {    

    const navigate = useNavigate();

    let location = useLocation();
    //const {id, name, email} = location.state.contact;
    const contact = location.state ? location.state.contact : null;
    


    const [User, setUser] = useState({name:"", email:""});

   

    let update = (e) => {
        e.preventDefault();     // we dont want our page to get refresh when we click button
        if(User.name === "" || User.email === ""){
            alert("All the fields are mandatory!");
            return;
        }
        props.updateContactHandler(User);
        setUser({name: "", email: ""});

        //console.log(this.props);
       
       navigate('/');
      
      
    };

    if(!contact) {
        return (
            <div className="ui main">
                <h2>Edit Contact</h2>
                <div>Invalid contact</div>
            </div>
        )
    }
    

        return(
            <div className="ui main">
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit = {update}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="name" value = {User.name} onChange={ (e) => setUser({...User, name: e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="xyz@gmail.com" value = {User.email} onChange={ (e) => setUser({...User, email: e.target.value})}/>
                    </div>
                    <button className="ui button blue"> Edit Contact </button> 
                </form>

            </div>
           

        );
    
      
    
};


export default EditContact;

