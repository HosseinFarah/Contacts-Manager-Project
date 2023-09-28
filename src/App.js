import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Components/Contacts/contact.css";
import { Navbar } from "./Components/Navbar";
import { Notfound } from "./Components/Notfound";
import { Footer } from "./Components/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import Contacts from "./Components/Contacts/Contacts";
import EditContact from "./Components/Contacts/EditContact";
import { ViewContact } from "./Components/Contacts/ViewContact";
import { createContext, useState } from "react";
import AddContact from "./Components/Contacts/AddContact";
export const showState = createContext();
const App = () => {
const client = new QueryClient();
const [show,setShow] = useState(false)
  return (
    
    <QueryClientProvider client={client}>
    <showState.Provider value={{show,setShow}}>
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Contacts />} />
      <Route path="/addcontact" element={<AddContact/>} />
      <Route path="/:editId" element={<EditContact />} />
      <Route path="/view-contact/:id" element={<ViewContact/>} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
      
    </BrowserRouter>
    </showState.Provider>
    </QueryClientProvider>

  );
};

export default App;
