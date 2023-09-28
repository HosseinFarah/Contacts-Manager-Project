import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const AddContact = () => {
  const schema = yup.object().shape({
    fullname: yup.string(),
    email: yup.string().email(),
    mobile: yup.string(),
    photo: yup.string().url(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

    const [newContact,setNewContact] = useState({
        fullname:"",
        email:"",
        mobile:"",
        photo:"",
        like:0,
        dislike:0
    })
 
    useEffect(()=>{

    },[])


  const navigate = useNavigate();
  const submitChk = () => {
    axios.post("http://localhost:8000/contacts",newContact)
    alert("Created!");
    navigate("/");
  };

  return (
    <>
    <div
      className="col my-3"
      style={{
        width: "30%",
        marginLeft: "33%",
        boxShadow: ".1rem .1rem .7rem #6f42c1",
        borderRadius: "6px",
      }}
    >
      <div className="card">
        <img className="img-top-card" src={newContact.photo} alt="" />
        <div className="card-body">
          <form onSubmit={handleSubmit(submitChk)}>
            <input
              {...register("fullname")}
              className="form-control"
              name="fullname"
              placeholder="Fullname"
              type="text"
                onChange={(e)=>setNewContact({...newContact,fullname:e.target.value})}
            />
            {errors.fullname && <h6>{errors.fullname.message}</h6>}
            <input
              className="form-control"
              {...register("email")}
              name="email"
              placeholder="Email"
              type="text"
              onChange={(e)=>setNewContact({...newContact,email:e.target.value})}

            />
            {errors.email && <h6>{errors.email.message}</h6>}
            <input
              {...register("mobile")}
              className="form-control"
              name="mobile"
              placeholder="Mobile"
              type="text"
              onChange={(e)=>setNewContact({...newContact,mobile:e.target.value})}

            />
            {errors.mobile && <h6>{errors.mobile.message}</h6>}
            <input
              {...register("photo")}
              className="form-control"
              name="photo"
              placeholder="Photo"
              type="text"
              onChange={(e)=>setNewContact({...newContact,photo:e.target.value})}

            />
            {errors.photo && <h6>{errors.photo.message}</h6>}
            <button type="submit" className="btn btn-success my-3 float-end">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
  );
};
export default AddContact;
