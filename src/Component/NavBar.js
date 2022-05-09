import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../User_contex";

export default function NavBar() {
  const { CurrentUser, setCurrentUser } = useContext(UserContext);

  let navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("connected_user");
    setCurrentUser({})
    setTimeout(() => {
      navigate("")
    }, 1000);
  };
  
  return (
    <div className="app-header header-shadow">
      <div className="app-header__logo">
        <div className="logo-src" />
        <div className="header__pane ml-auto">
          <div>
            <button
              type="button"
              className="hamburger close-sidebar-btn hamburger--elastic"
              data-class="closed-sidebar"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="app-header__mobile-menu">
        <div>
          <button
            type="button"
            className="hamburger hamburger--elastic mobile-toggle-nav"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>
      </div>
      <div className="app-header__menu">
        <span>
          <button
            type="button"
            className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
          >
            <span className="btn-icon-wrapper">
              <i className="fa fa-ellipsis-v fa-w-6" />
            </span>
          </button>
        </span>
      </div>
      <div className="app-header__content">
        <div className="app-header-left">
          <div className="search-wrapper">
            <div className="input-holder">
              <input
                type="text"
                className="search-input"
                placeholder="Type to search"
              />
              <button className="search-icon">
                <span />
              </button>
            </div>
            <button className="close" />
          </div>
          <ul className="header-menu nav">
            <li className="nav-item">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="nav-link"
              >
                <i className="nav-link-icon fa fa-database"> </i>
                Statistics
              </a>
            </li>
            <li className="btn-group nav-item">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="nav-link"
              >
                <i className="nav-link-icon fa fa-edit" />
                Projects
              </a>
            </li>
            <li className="dropdown nav-item">
              <a
                href="#"
                onClick={() => logout()}
                className="nav-link"
              >
                <i className="nav-link-icon pe-7s-back-2" />
              Déconnecter
              </a>
            </li>
          </ul>
        </div>
        <div className="app-header-right">
          <div className="header-btn-lg pr-0">
            <div className="widget-content p-0">
              <div className="widget-content-wrapper">
                <div className="widget-content-left">
                  <div className="btn-group">
                    <a
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="p-0 btn"
                    >
                      <img
                        width={42}
                        className="rounded-circle"
                        src="assets/images/avatars/1.jpg"
                        alt="/"
                      />
                    </a>
                   
                  </div>
                </div>
                <div className="widget-content-left ml-3 header-user-info">
                  <div className="widget-heading">{`${CurrentUser?.NomUtilisateur} ${CurrentUser?.PrenomUtilisateur}`}</div>
                  <div className="widget-subheading">{CurrentUser?.Poste==="admin"?"admin":CurrentUser?.Poste==="RDS"?"Responsable de stock":CurrentUser?.Poste==="RDA"?"Responsable d'achat":"Super Admin"}</div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
