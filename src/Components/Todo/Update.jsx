import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { uid } = useParams();

  const [todoList, setTodoList] = useState({
    id:uid,
    fullname: "",
    email: "",
    mobile: "",
    photo: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/todos/" + uid)
      .then((res) => setTodoList(res.data));
  },[]);

const navigate = useNavigate();
  const submitChk = (event)=>{
    event.preventDefault();
    axios.put(`http://localhost:8000/todos/${uid}`,todoList)
    navigate("/todo")
  }

  console.log(uid);
  return (
    <div className="container justify-content-center my-5 ">
      <form className="form" onSubmit={submitChk}>
        <label htmlFor="fullname">Fullname</label>
        <input
          className="form-control"
          type="text"
          placeholder="Fullname"
          name="fullname"
          value={todoList.fullname}
          onChange={(e)=>setTodoList({...todoList,fullname:e.target.value})}
        />
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          name="email"
          value={todoList.email}
          onChange={(e)=>setTodoList({...todoList,email:e.target.value})}
        />
        <label htmlFor="mobile">Mobile</label>
        <input
          className="form-control"
          type="number"
          placeholder="Mobile"
          name="mobile"
          value={todoList.mobile}
          onChange={(e)=>setTodoList({...todoList,mobile:e.target.value})}
        />
        <label htmlFor="photo">Photo</label>
        <input
          className="form-control"
          type="text"
          placeholder="Photo"
          name="photo"
          value={todoList.photo}
          onChange={(e)=>setTodoList({...todoList,photo:e.target.value})}
        />
        <button className="btn btn-success float-end">Update</button>
      </form>
    </div>
  );
};
export default Update;
