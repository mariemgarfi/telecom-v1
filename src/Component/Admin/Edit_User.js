import React, { Fragment, useContext, useEffect, useState } from "react";
import Banner from "../Banner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../User_contex";

export default function Edit_User() {
  const [NomUtilisateur, setNomUtilisateur] = useState("");
  const [PrenomUtilisateur, setPrenomUtilisateur] = useState("");
  const [Email, setEmail] = useState("");
  const [Tele, setTele] = useState();
  const [Poste, setPoste] = useState("");
  const [magasin, setMagasin] = useState("");
  const [DataMagasin, setDataMagasin] = useState([]);
  const { CurrentUser, setCurrentUser } = useContext(UserContext);

  let param = useParams();
  let navigate=useNavigate()

  useEffect(() => {
    getUserById();
    getAllMagasin();
  }, []);
  const getAllMagasin = () => {
    axios
      .get("http://localhost:3200/api/get_Mgasain")
      .then((result) => {
        setDataMagasin(result.data.Magasin);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUserById = () => {
    axios
      .get("http://localhost:3200/api/get_user_byId/" + param.id)
      .then((result) => {
        let data = result.data.user;
        setNomUtilisateur(data.NomUtilisateur);
        setPrenomUtilisateur(data.PrenomUtilisateur);
        setEmail(data.Email);
        setTele(data.Tel);
        setMagasin(data.magasin)
        setPoste(data.Poste);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ChangeNomUtilisateur = (event) => {
    setNomUtilisateur(event.target.value);
  };
  const ChangePrenomUtilisateur = (event) => {
    setPrenomUtilisateur(event.target.value);
  };
  const ChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const ChangePoste = (event) => {
    setPoste(event.target.value);
  };

  const ChangeTele = (event) => {
    setTele(event.target.value);
  };
  const ChangeMagasin = (event) => {
    setMagasin(event.target.value);
  };

  const HandleSubmit = () => {
    let data = {
      _id: param.id,
      NomUtilisateur: NomUtilisateur,
      PrenomUtilisateur: PrenomUtilisateur,
      Email: Email,
      Poste: CurrentUser.Poste === "super_admin" ? "admin" : Poste,
      Tele: Tele,
      magasin: CurrentUser.Poste === "super_admin" ? magasin :CurrentUser.magasin ,

    };

    axios
      .put("http://localhost:3200/api/Update_Utilisateur", data)
      .then((response) => {
        console.log("here response", response.data.message);
        navigate("/tableUser")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Fragment>
      <div className="app-main__inner">
        <Banner title="Modifier Utilisateur " icon="pe-7s-add-user" />
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h1 className="card-title">Remplir le formulaire</h1>
            <form>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleEmail11">NomUtilisateur</label>
                    <input
                      name="NomUtilisateur"
                      id="exampleNomUtilisateur"
                      placeholder="NomUtilisateur"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangeNomUtilisateur(event)}
                      value={NomUtilisateur || ""}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePassword11">PréNomUtilisateur</label>
                    <input
                      name="PréNomUtilisateur"
                      id="examplePassword11"
                      placeholder="PréNomUtilisateur"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangePrenomUtilisateur(event)}
                      value={PrenomUtilisateur || ""}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleTele">Tele</label>
                    <input
                      name="Telee"
                      id="exampleTele"
                      placeholder="Tele"
                      type="number"
                      className="form-control"
                      onChange={(event) => ChangeTele(event)}
                      value={Tele || ""}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleEmail">Email</label>
                    <input
                      name="Email"
                      id="exampleEmail11"
                      placeholder="E-mail"
                      type="Email"
                      className="form-control"
                      onChange={(event) => ChangeEmail(event)}
                      value={Email || ""}
                    />
                  </div>
                </div>
              
                {CurrentUser.Poste === "super_admin" ? null : (
                  <div className="col-md-6">
                    <div className="position-relative form-group">
                      <label htmlFor="examplePoste">Poste Occupé</label>
                      <select
                        name="categorie"
                        className="form-control"
                        onChange={(event) => ChangePoste(event)}
                        value={Poste || ""}

                      >
                        <option value="">Sélectionner Poste </option>
                        <option value="RDS">Responsable de stock </option>
                        <option value="RDA">Responsable d'achat </option>
                      </select>
                    </div>
                  </div>
                )}
                {CurrentUser.Poste === "super_admin" ? (
                  <div className="col-md-6">
                    <div className="position-relative form-group">
                      <label htmlFor="examplePassword11">Magasin</label>
                      <select
                        name="categorie"
                        className="form-control"
                        onChange={(event) => ChangeMagasin(event)}
                        value={magasin}
                      >
                        <option value="">Sélectionner Magasin </option>
                        {DataMagasin?.map((value, i) => (
                          <option key={i} value={value._id}>
                            {value.nomMagasin}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : null}
              
            
             
              </div>
              <button
                type="button"
                onClick={HandleSubmit}
                className="mt-2 btn btn-primary"
              >
                Modifier
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
