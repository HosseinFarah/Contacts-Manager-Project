import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const View = (props) => {
  const {show} = props;
  const { id } = useParams();
  const [todoList, setTodoList] = useState({
    id: id,
    fullname: "",
    email: "",
    mobile: "",
    photo: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8000/todos/${id}`)
      .then((res) => setTodoList(res.data));
  }, []);
  
  return (
    <div
      className="row row-cols-4 my-3 justify-content-center"
    >
      <div className="col">
        <div className="card">
          <img
            src={todoList.photo}
            className="img-top-card"
            alt={todoList.id}
          />
          <div className="card-body">
            <h5 className="card-title">Fullname: {todoList.fullname}</h5>
            <p className="card-text">Email: {todoList.email}</p>
            <p className="card-text">Mobile: {todoList.mobile}</p>
            <Link className="btn btn-primary" to="/todo">
              Back
              
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default View;
