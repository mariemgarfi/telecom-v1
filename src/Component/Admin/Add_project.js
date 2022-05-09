import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Banner from "../Banner";

export default function Add_project() {
  const [NomProjet, setNomProjet] = useState("");
  const [lieuProjet, setlieuProjet] = useState("");
  const [chefProjet, setchefProjet] = useState("");
  const [quantitearticl, setquantitearticl] = useState("");
  const [DateDebut, setDateDebut] = useState("");
  let navigate = useNavigate()
  const ChangeNomProjet = (event) => {
    setNomProjet(event.target.value);
  };
  const ChangelieuProjet = (event) => {
    setlieuProjet(event.target.value);
  };
  const ChangechefProjet = (event) => {
    setchefProjet(event.target.value);
  };
  const ChangeDateDebut = (event) => {
    setDateDebut(event.target.value);
  };
  const Changequantitearticl = (event) => {
    setquantitearticl(event.target.value);
  };

  const HandleSubmit = () => {
    let data = {
      NomProjet: NomProjet,
      lieuProjet: lieuProjet,
      chefProjet: chefProjet,
      DateDebut: DateDebut,
      quantitearticl: quantitearticl,

    };
    console.log("here response", data);
    axios
      .post("http://localhost:3200/api/ajouter_project", data)
      .then((response) => {
        console.log("here response", response.data.message);
        navigate("/Tableproject");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Fragment>
      <div className="app-main__inner">
        <Banner title="Ajouter Projet " icon="pe-7s-add-user" />
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h1 className="card-title">Remplir le formulaire</h1>
            <form>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleEmail11">Nom Projet</label>
                    <input
                      name="NomProjet"
                      id="exampleNomProjet"
                      placeholder="NomProjet"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangeNomProjet(event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePassword11">
                      lieuProjet
                    </label>
                    <input
                      name="Li"
                      id="lieuProjet"
                      placeholder="lieuProjet"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangelieuProjet(event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleEmail">chefProjet</label>
                    <input
                      name="chefProjet"
                      id="examplechefProjet"
                      placeholder="chefProjet"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangechefProjet(event)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleTele">quantitearticl</label>
                    <input
                      name="quantitearticl"
                      id="examplequantitearticl"
                      placeholder="Qte"
                      type="number"
                      className="form-control"
                      onChange={(event) => Changequantitearticl(event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleEmail">date Debut</label>
                    <input
                      name="DateDebut"
                      id="exampleDateDebut"
                      placeholder="DateDebut"
                      type="date"
                      className="form-control"
                      onChange={(event) => ChangeDateDebut(event)}
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={HandleSubmit}
                className="mt-2 btn btn-primary"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
