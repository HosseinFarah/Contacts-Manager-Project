import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Todo = () => {
    const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/todos")
      .then((res) => setTodoList(res.data));
  }, []);

  return (
    <>
    <div className="container">
      <Link to="/addTodo">Create +</Link>
      <table className="table">
        <thead>
          <th>Id</th>
          <th>fullname</th>
          <th>email</th>
          <th>mobile</th>
          <th>Action</th>
        </thead>
        <tbody>
          {todoList.map((todo, index) => (
            <tr key={index}>
              <td>{todo.id}</td>
              <td>{todo.fullname}</td>
              <td>{todo.email}</td>
              <td>{todo.mobile}</td>
              <td>
                <button
                  className="btn btn-danger mx-1"
                  onClick={() => delItem(todo.id)}
                >
                  Delete
                </button>
                <button className="btn btn-info mx-1" onClick={()=>navigate(`/view/${todo.id}`)}>View</button>
                <button className="btn btn-success mx-1" onClick={()=>navigate(`/update/${todo.id}`)}>Update</button>
              </td>
            </tr>
          )
          )}
        </tbody>
      </table>
    </div>
    </>
  )

    function delItem(id){
      const confirm = window.confirm("Are you Sure to Delete This Todo?")
      if(confirm){
        axios.delete(`http://localhost:8000/todos/${id}`)
        navigate("/todo");
      } 
    }
            

}
export default React.memo(Todo);
