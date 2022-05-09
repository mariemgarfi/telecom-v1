import React, { Fragment, useContext, useEffect, useState } from "react";
import Banner from "../Banner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../User_contex";

export default function Edit_commande() {
  const [nomarticle, setNomarticle] = useState("");
  const [codearticle, setCodearticle] = useState("");
  const [categorie_article, setCategorie_article] = useState("");
  const [quantitearticl, setQuantitearticle] = useState("");
  const [idFournisseur, setidFournisseur] = useState("");
  const [datecommande, setDatecommande] = useState("");
  const [etat, setEtat] = useState("");
  const { CurrentUser, setCurrentUser } = useContext(UserContext);

  let param = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    getCommandeById();
  }, []);

  const getCommandeById = () => {
    axios
      .get("http://localhost:3200/api/get_commande_byId/" + param.id)
      .then((result) => {
        let data = result.data.Commande;
        setNomarticle(data.nomarticle);
        setCodearticle(data.codearticle);
        setCategorie_article(data.categorie_article);
        setQuantitearticle(data.quantitearticl);
        setidFournisseur(data.idFournisseur);
        setDatecommande(data.datecommande);
        setEtat(data.etat);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ChangeEtatCammande = (e) => {
    setEtat(e.target.value);
  };

  const HandleSubmit = () => {
    let data = {
      _id:param.id,
      nomarticle: nomarticle,
      codearticle: codearticle,
      categorie_article: categorie_article,
      quantitearticl: quantitearticl,
      idFournisseur: idFournisseur._id,
      datecommande: datecommande,
      etat: etat,
      magasin:CurrentUser.magasin

    };
    console.log("here response", data);
    axios
      .put("http://localhost:3200/api/Update_commande", data)
      .then((response) => {
        console.log("here response", response.data.message);
        navigate("/TableCommande");
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
                <div className="col-md-12">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePassword11">Etat Commande</label> 
                    <select
                      name="categorie"
                      className="form-control"
                      onChange={(event) => ChangeEtatCammande(event)}
                      value={etat}
                    >
                      <option value="">Sélectionner Etat Commande </option>
                      <option value="accepter">accepter</option>
                      <option value="attente">attente</option>
                      <option value="anullée">anullée </option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleEmail11">Nom Article</label>
                    <input
                      name="nomarticle"
                      id="exampleNomarticle"
                      placeholder="Nomarticle"
                      type="text"
                      className="form-control"
                      disabled
                      // onChange={(event) => ChangeNomarticle(event)}
                      value={nomarticle || ""}
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
                      // onChange={(event) => ChangeCodearticle(event)}
                      disabled
                      value={codearticle || ""}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="examplePassword11">categorie_article</label>
                    <input
                      name="nomCodearticle"
                      id="exampleCode article"
                      placeholder="Codearticle"
                      type="text"
                      className="form-control"
                      // onChange={(event) => ChangeCodearticle(event)}
                      disabled
                      value={categorie_article || ""}
                    />
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
                      // onChange={(event) => ChangeQuantitearticle(event)}
                      disabled
                      value={quantitearticl || ""}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="exampleidFournisseur">
                      Nom fournisseure
                    </label>
                    <input
                      name="nomidFournisseur"
                      id="exampleidFournisseur"
                      placeholder={idFournisseur.nom}
                      type="text"
                      className="form-control"
                      // onChange={(event) => ChangeidFournisseur(event)}
                      disabled
                      value={idFournisseur.nom +" "+ idFournisseur.prenom || ""}
                    />
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
                      // onChange={(event) => ChangeDatecommande(event)}
                      disabled
                      value={datecommande || ""}
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
