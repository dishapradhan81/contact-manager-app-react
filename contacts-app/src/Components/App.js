import React, {useState, useEffect} from "react";   // import react library and hooks
import './App.css';
import {v4 as uuid} from 'uuid';   // unique id
import {BrowserRouter, Routes, Route} from "react-router-dom";
import api from '../api/contact';
// import components
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import EditContact from "./EditContact";


function App() {

 //const LOCAL_STORAGE_KEY = "contacts-manager";

  // fucnctional component using useState hook, to store the name and email entered  
  const [contacts, setContacts] = useState([]);

  const [SearchTerm, setSearchTerm] = useState("");
  const [SearchResults, setSearchResults] = useState([]);
  
  // Retrive contacts 
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log(contact);

    const request = {
      id: uuid(),
      ...contact
    }
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);

    
     
    

     //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...contacts, response.data]));
    

  };

  // store contacts in local storage
  // useEffect(() => {

  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));

  // }, [contacts]);
 
  
  // get back the contacts from the local storage when page is reload or refreshed
  useEffect(() => {

    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts) ;  
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    };
     getAllContacts();            

  }, []);
  


  const removeContactHandler = async (id) => {

    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);

  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts((contacts) => {
      return contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      });

    });
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }else{
      setSearchResults(contacts);
    }

  };


  return (
    <div  className="ui container">
      <BrowserRouter>
        <Header />
        <Routes>
           <Route path="/" element={<ContactList contacts={SearchTerm.length < 1 ? contacts : SearchResults} getContactId={removeContactHandler} term={SearchTerm} searchKeyword={searchHandler} />} /> 
           <Route path="/add" element={<AddContact addContactHandler = {addContactHandler} />} />
           <Route path="/edit"  element={<EditContact updateContactHandler={updateContactHandler}/>} /> 
        </Routes>
        
     
      {/* <AddContact addContactHandler = {addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler}/>      contacts, getContactId are props name */}

      </BrowserRouter>
      
    </div>    
    
     
  );
}

export default App;
