import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">e-Maalem</span>
          </Link>
        </div>
        <div className="links">
          {/* <span>e-Maalem Business</span> */}
          {!currentUser?.isTasker && <span>Devenir un prestataire</span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isTasker && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Connexion</Link>
              <Link className="link" to="/register">
                <button>Inscription</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Ameublement
            </Link>
            <Link className="link menuLink" to="/">
              Installation et Fixation
            </Link>
            <Link className="link menuLink" to="/">
              Renovation des Murs
            </Link>
            <Link className="link menuLink" to="/">
              Plomberie
            </Link>
            <Link className="link menuLink" to="/">
              Serrurerie
            </Link>
            <Link className="link menuLink" to="/">
              Electromenager
            </Link>
            <Link className="link menuLink" to="/">
              Electricite
            </Link>
            <Link className="link menuLink" to="/">
              Renovation des sols
            </Link>
            <Link className="link menuLink" to="/">
              Reparation
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
