import React, {useRef} from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
    console.log(props);

    const deleteContactHandler = (id) => {
        props.getContactId(id);

    };

    const inputE1 = useRef("");
   
    const rendercontactlist = props.contacts.map((contact) => {
        return (
            <ContactCard 
             contact={contact}
             clickHandler={deleteContactHandler} 
             key={contact.id}/>
        );

    });

    const getSearchTerm = () => {
        props.searchKeyword(inputE1.current.value);

    };

    return(

        <div className="main">
            <h2>Contact List
            
            <Link to="/add">
             <button className="ui primary button right floated">Add Contact</button>
            </Link>
            </h2>
           
            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputE1} type="text" placeholder="Search Contacts" className="prompt" value={props.term} onChange={getSearchTerm} />
                    <i className="search icon"></i>
                </div>
            
            </div>
        
        <div className="ui celled list">
         {rendercontactlist.length > 0 ? rendercontactlist : "no contacts available"}            {/* reference variable in jsx  */}      
        </div>
        </div>
        

    );
};

export default ContactList;
