import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showState } from "../../App";
const Contacts = () => {
  const { show, setShow } = useContext(showState);
  const [contactsList, setContactsList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/contacts/")
      .then((res) => setContactsList(res.data));
  }, []);
  const navigate = useNavigate();
  console.log(show);
  const [search, setSearch] = useSearchParams();

  return (
    <>
      <div class="alert alert-secondary" role="alert">
        Contacts Manager(Create,Read,Update,Delete) with json-server,used by useEffect,useState,axios,react-router-dom,
        useSearchParams,useNavigate
      </div>
      <button
        className="btn btn-success rounded my-3 mx-1"
        onClick={() => navigate(`/addcontact`)}
      >
        {" "}
        <i class="fa-solid fa-user-plus"></i> Create New Contact{" "}
      </button>
      <div className="container">
        <input
          className="form-control"
          placeholder="Search Contact By Fullname"
          name="search"
          style={{ width: "60%" }}
          value={search.get("filter") || ""}
          onChange={(e) => {
            let filter = e.target.value;
            if (filter) return setSearch({ filter: filter });
            else return setSearch({});
          }}
        />
      </div>
      <div className="row row-cols-3 row-cols-md-3 g-4 my-3 mx-1">
        {contactsList
          .filter((contact) => {
            let filter = search.get("filter");
            if (!filter) return true;
            const name = contact.fullname.toLowerCase();
            return name.includes(filter.toLowerCase());
          })
          .map((contact, index) => (
            <div className="col" key={index}>
              <div className="card">
                <img
                  className="img-top-card"
                  src={contact.photo}
                  alt={contact.id}
                />
                <div className="card-body">
                  <input
                    className="form-control"
                    name="fullname"
                    placeholder="Fullname"
                    type="text"
                    value={contact.fullname}
                  />
                  <input
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    type="text"
                    value={contact.email}
                  />
                  <input
                    className="form-control"
                    name="mobile"
                    placeholder="Mobile"
                    type="text"
                    value={contact.mobile}
                  />
                  <input
                    className="form-control"
                    name="photo"
                    placeholder="Photo"
                    type="text"
                    value={contact.photo}
                  />
                  <button
                    className="btn btn-warning rounded my-3"
                    onClick={() => navigate(`/${contact.id}`)}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="btn btn-danger rounded my-3 mx-1 float-end"
                    onClick={() => delContact(contact.id)}
                  >
                    <i class="fa-solid fa-user-minus"></i>{" "}
                  </button>
                  <button
                    className="btn btn-info rounded my-3 mx-1"
                    onClick={() => (
                      navigate("/view-contact/" + contact.id), setShow(true)
                    )}
                  >
                    <i class="fa-solid fa-eye"></i>{" "}
                  </button>
                  <div>
                    <i
                      className="fa-solid fa-heart"
                      style={{ color: "red" }}
                      onClick={() => plusLike(contact.id)}
                    >
                      (<sup>{contact.like}</sup>){" "}
                    </i>
                  </div>
                  <div>
                    <i
                      className="fa-solid fa-heart-crack"
                      style={{ color: "red" }}
                      onClick={() => disLike(contact.id)}
                    >
                      {" "}
                      (<sub>{contact.dislike}</sub>){" "}
                    </i>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
  function delContact(id) {
    const contactIndex = contactsList.findIndex((contact) => {
      return contact.id === id;
    });
    if (contactIndex !== -1) {
      const confirm = window.confirm("Are You Sure?");
      if (confirm) {
        axios.delete(`http://localhost:8000/contacts/${id}`);
        window.location.reload(false);
        navigate("/");
      }
    }
  }

  function plusLike(id) {
    const contactIndex = contactsList.findIndex((contact) => {
      return contact.id === id;
    });
    const backUpContactsList = [...contactsList];
    backUpContactsList[contactIndex].like += 1;
    axios
      .put(
        `http://localhost:8000/contacts/${id}`,
        backUpContactsList[contactIndex]
      )
      .then(() => setContactsList(backUpContactsList));
  }
  function disLike(id) {
    const contactIndex = contactsList.findIndex((contact) => {
      return contact.id === id;
    });
    const backUpContactsList = [...contactsList];
    backUpContactsList[contactIndex].dislike += 1;
    axios
      .put(
        `http://localhost:8000/contacts/${id}`,
        backUpContactsList[contactIndex]
      )
      .then(() => setContactsList(backUpContactsList));
  }

  /* 
  function disLike(id){
    const contactIndex = contactsList.findIndex((contact)=>{
      return contact.id ===id;
    })
    const newContactsList = [...contactsList]
    newContactsList[contactIndex].dislike +=1;
    axios.put(`http://localhost:8000/contacts/${id}`,newContactsList[contactIndex]).then(()=>setContactsList(newContactsList))
  } */
};
export default Contacts;
