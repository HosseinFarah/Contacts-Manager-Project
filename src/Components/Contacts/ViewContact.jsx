import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./contact.css";
import { showState } from "../../App";
export const ViewContact = () => {
  const { id } = useParams();
  const [contact, setContact] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/contacts/${id}`)
      .then((res) => setContact(res.data));
  }, []);
const navigate = useNavigate();
const {show,setShow} = useContext(showState)
console.log(show);
  return (
<div className="row row-cols-md-3 row-cols-xs-1 row-cols-sm-1 my-3 justify-content-center"
style={{transform:show?"translateX(0)":"translateX(-100vw)"}}
id="sec"
>
    <div className="col">
        <div className="card">
        <div className="card-body text-center">
        <img src={contact.photo} alt={contact.id} className="card-img-top" />
            <h5 className="card-text">Fullname: <span className="txtinline">{contact.fullname}</span></h5>
            <h5 className="card-text">Email: <span className="txtinline">{contact.email}</span></h5>
            <h5 className="card-text">Mobile: <span className="txtinline">{contact.mobile}</span></h5>
            <button className="btn btn-success" onClick={()=>(navigate("/"),setShow(false))}>Back</button>
        </div>
      </div>
    </div>
</div>

  );
};
