import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState({
    fullname: "",
    email: "",
    mobile: "",
    photo: "",
  });
  const navigate = useNavigate();
  const submitChk = (event)=>{
    event.preventDefault();
    axios.post("http://localhost:8000/todos",newTodo)
    navigate("/todo")
  }
  return (
    <div className="container justify-content-center my-5 ">
      <form className="form" onSubmit={submitChk}>
        <label htmlFor="fullname">Fullname</label>
        <input
          className="form-control"
          type="text"
          placeholder="Fullname"
          name="fullname"
          onChange={(e) => setNewTodo({ ...newTodo, fullname: e.target.value })}
        />
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setNewTodo({ ...newTodo, email: e.target.value })}
        />
        <label htmlFor="mobile">Mobile</label>
        <input
          className="form-control"
          type="number"
          placeholder="Mobile"
          name="mobile"
          onChange={(e) => setNewTodo({ ...newTodo, mobile: e.target.value })}
        />
        <label htmlFor="photo">Photo</label>
        <input
          className="form-control"
          type="text"
          placeholder="Photo"
          name="photo"
          onChange={(e) => setNewTodo({ ...newTodo, photo: e.target.value })}
        />
        <button className="btn btn-success float-end">Create New Todo</button>
      </form>
    </div>
  );
};
export default AddTodo;
