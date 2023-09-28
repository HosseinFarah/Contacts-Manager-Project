import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const EditContact = () => {
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

  const { editId } = useParams();

  const [showContact, setShowContact] = useState({
    id: editId,
    fullname: "",
    email: "",
    mobile: "",
    photo: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/contacts/${editId}`)
      .then((res) => setShowContact(res.data));
  }, []);

  const navigate = useNavigate();
  const submitChk = () => {
    axios.put(`http://localhost:8000/contacts/${editId}`,showContact)
    alert("Updated!");
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
        <img className="img-top-card" src={showContact.photo} alt="" />
        <div className="card-body">
          <form onSubmit={handleSubmit(submitChk)}>
            <input
              {...register("fullname")}
              className="form-control"
              name="fullname"
              placeholder="Fullname"
              type="text"
              value={showContact.fullname}
              onChange={(e)=>setShowContact({...showContact,fullname:e.target.value})}
            />
            {errors.fullname && <h6>{errors.fullname.message}</h6>}
            <input
              className="form-control"
              {...register("email")}
              name="email"
              placeholder="Email"
              type="text"
              value={showContact.email}
              onChange={(e)=>setShowContact({...showContact,email:e.target.value})}
            />
            {errors.email && <h6>{errors.email.message}</h6>}
            <input
              {...register("mobile")}
              className="form-control"
              name="mobile"
              placeholder="Mobile"
              type="text"
              value={showContact.mobile}
              onChange={(e)=>setShowContact({...showContact,mobile:e.target.value})}
            />
            {errors.mobile && <h6>{errors.mobile.message}</h6>}
            <input
              {...register("photo")}
              className="form-control"
              name="photo"
              placeholder="Photo"
              type="text"
              value={showContact.photo}
              onChange={(e)=>setShowContact({...showContact,photo:e.target.value})}
            />
            {errors.photo && <h6>{errors.photo.message}</h6>}
            <button type="submit" className="btn btn-success my-3 float-end">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
  );
};
export default React.memo(EditContact);
