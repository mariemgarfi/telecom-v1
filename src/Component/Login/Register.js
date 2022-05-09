import * as React from "react";
import { createTheme } from "@mui/material/styles";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const theme = createTheme();

export default function Register() {
  let navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let body = {
      Name: data.get("NomUtilisateur"),
      Email: data.get("Email"),
      Password: data.get("password"),
      Password: data.get("password"),
      Poste: "super_admin",
    }
    axios
      .post("http://localhost:3200/api/add_super_admin", body)
      .then((result) => {
        console.log(result.data.message);
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="app-container app-theme-white body-tabs-shadow">
      <div className="app-container">
        <div className="h-100">
          <div className="h-100 no-gutters row">
            <div className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center col-md-12 col-lg-7">
              <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
                <div className="app-logo" />
                <h4>
                  <div>Welcome,</div>
                  <span>It only takes a <span className="text-success">few seconds</span> to create your account</span>
                </h4>
                <div>
                  <form >
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="exampleEmail" ><span className="text-danger">*</span> Email</label>
                          <input name="email" id="exampleEmail" placeholder="Email here..." type="email" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="exampleName" >Name</label>
                          <input name="text" id="exampleName" placeholder="Name here..." type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="examplePassword"><span className="text-danger">*</span> Password</label>
                          <input name="password" id="examplePassword" placeholder="Password here..." type="password" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="position-relative form-group">
                          <label htmlFor="examplePasswordRep" ><span className="text-danger">*</span> Repeat Password</label>
                          <input name="passwordrep" id="examplePasswordRep" placeholder="Repeat Password here..." type="password" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 position-relative form-check">
                      <input name="check" id="exampleCheck" type="checkbox" className="form-check-input" />
                      <label htmlFor="exampleCheck" className="form-check-label">Accept our <a href="javascript:void(0);">Terms and Conditions</a>.</label>
                    </div>
                    <div className="mt-4 d-flex align-items-center">
                      <h5 className="mb-0">Already have an account? <a href="javascript:void(0);" className="text-primary">Sign in</a></h5>
                      <div className="ml-auto">
                        <button className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg" type="button"

                          onClick={handleSubmit}>Create Account </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="d-lg-flex d-xs-none col-lg-5">
              <div className="slider-light">
                <div className="slick-slider slick-initialized">
                  <div>
                    <div className="position-relative h-100 d-flex justify-content-center align-items-center bg-premium-dark" tabIndex={-1}>
                      <div className="slide-img-bg" 
                      style={{ backgroundImage: 'url("assets/citynights.jpg")' }} />
                      <div className="slider-content">
                        <h3>Scalable, Modular, Consistent</h3>
                        <p>Easily exclude the components you don't require. Lightweight, consistent
                          Bootstrap based styles across all elements and components
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
