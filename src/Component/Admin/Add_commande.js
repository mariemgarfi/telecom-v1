import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import UserContext from "../../User_contex";
import Banner from "../Banner";

export default function Add_commande() {
  const [nomarticle, setNomarticle] = useState("");
  const [codearticle, setCodearticle] = useState("");
  const [categorie_article, setCategorie_article] = useState("");
  const [quantitearticl, setQuantitearticle] = useState("");
  const [idFournisseur, setidFournisseur] = useState("");
  const [datecommande, setDatecommande] = useState("");
  const [Fournisseur, setFournisseur] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const { CurrentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    getAllCategorie();
    getAllFournisseur();
  }, []);

  const getAllFournisseur = () => {
    axios
      .get("http://localhost:3200/api/get_fournisseur")
      .then((response) => {
        setFournisseur(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ChangeNomarticle = (event) => {
    setNomarticle(event.target.value);
  };
  const ChangeCodearticle = (event) => {
    setCodearticle(event.target.value);
  };
  const ChangeQuantitearticle = (event) => {
    setQuantitearticle(event.target.value);
  };
  const ChangeidFournisseur = (event) => {
    setidFournisseur(event.target.value);
  };

  const ChangeDatecommande = (event) => {
    setDatecommande(event.target.value);
  };

  const ChangeCategorie = (event) => {
    setCategorie_article(event.target.value);
  };

  const HandleSubmit = () => {
    let data = {
      nomarticle: nomarticle,
      codearticle: codearticle,
      categorie_article: categorie_article,
      quantitearticl: quantitearticl,
      idFournisseur: idFournisseur,
      datecommande: datecommande,
      etat: "attente",
      magasin:CurrentUser.magasin
    };

    axios
      .post("http://localhost:3200/api/Ajouter_Commande", data)
      .then((response) => {
        console.log("here response", response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllCategorie = () => {
    axios
      .get("http://localhost:3200/api/get_Categorie")
      .then((result) => {
        setCategorie(result.data.categorie);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <div className="app-main__inner">
        <Banner title="Ajouter Commande" icon="pe-7s-add-user" />
        <div className="main-card mb-3 card">
          <div className="card-body">
            <h1 className="card-title">Remplir le formulaire</h1>
            <form>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleEmail11">Nom Article</label>
                    <input
                      name="nomarticle"
                      id="exampleNomarticle"
                      placeholder="Nomarticle"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangeNomarticle(event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleCodearticle">Code Article</label>
                    <input
                      name="nomCodearticle"
                      id="exampleCode article"
                      placeholder="Codearticle"
                      type="text"
                      className="form-control"
                      onChange={(event) => ChangeCodearticle(event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePassword11">Categorie Article</label>
                    <select
                      name="categorie"
                      className="form-control"
                      onChange={(event) => ChangeCategorie(event)}
                    >
                      <option value="">Sélectionner Categorie </option>
                      {categorie?.map((value, i) => (
                        <option key={i} value={value.categorie}>
                          {value.categorie}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleQuantitearticl">
                      Quantite articl
                    </label>
                    <input
                      name="nomQuantitearticl"
                      id="exampleQuantitearticl"
                      placeholder="1234"
                      type="number"
                      className="form-control"
                      onChange={(event) => ChangeQuantitearticle(event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleidFournisseur">
                      Nom fournisseur
                    </label>
                    <select
                      name="categorie"
                      className="form-control"
                      onChange={(event) => ChangeidFournisseur(event)}
                    >
                      <option value="">Sélectionner fournisseur </option>
                      {Fournisseur?.map((value, i) => (
                        <option key={i} value={value._id}>
                          {value.nom} {value.prenom}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
             
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleDatecommande">Date commande</label>
                    <input
                      name="nomDatecommande"
                      id="exampleDatecommande"
                      placeholder="JJ/MM/AAAA"
                      type="date"
                      className="form-control"
                      onChange={(event) => ChangeDatecommande(event)}
                    />
                  </div>
                </div>
             
                <button
                  type="button"
                  className="mt-2 btn btn-primary"
                  onClick={HandleSubmit}
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
