import { NavLink } from "react-router-dom";
export const Navbar = () => {
  return (
    <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <NavLink className="navbar-brand" to="/" style={({isActive})=>({color: isActive?"red":""})}>
            {" "}
            Contacts-Manager
          </NavLink>
        </ul>
      </div>
    </nav>
    </header>
  );
};
