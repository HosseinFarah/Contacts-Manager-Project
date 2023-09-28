import { useNavigate } from "react-router";

export const Notfound = () => {
  const navigate = useNavigate()
  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">404 - Page Not Found</h4>
        <p>The page you are looking for does not exist.</p>
        <button onClick={()=>{navigate("/")}}>Back</button>
      </div>
    </div>
  );
};
