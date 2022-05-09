import React, { useContext, useEffect, useState } from "react";
import Banner from "../Banner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../User_contex";
export default function TableCommande() {
  const { CurrentUser, setCurrentUser } = useContext(UserContext);

  const [Commande, setCommande] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    getAllCommande();
  }, []);

  const getAllCommande = () => {
    axios
      .get("http://localhost:3200/api/get_Commande")
      .then((result) => {
        console.log("heertedehud", result.data.data);
        setCommande(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app-main__inner">
      <Banner title="Mes Commandes" icon="fa-shopping-cart" />
      <div className="row">
        <div className="col-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <h5 className="card-title"> table des Commandes</h5>
              <table className="mb-0 table">
                <thead>
                  <tr>
                    <th> Nom Article</th>
                    <th> code_article</th>
                    <th> quantité_article</th>
                    <th> nom fournisseur</th>
                    <th>date commande</th>
                    <th>etat commande</th>
                  </tr>
                </thead>
                <tbody>
                  {Commande?.map((value, i) => {
                    if (CurrentUser.magasin === value.magasin) {
                      return (
                        <tr key={i}>
                          <td>{value.nomarticle}</td>
                          <td>{value.codearticle}</td>
                          <td>{value.quantitearticl}</td>
                          <td>
                            {value.idFournisseur.nom}{" "}
                            {value.idFournisseur.prenom}
                          </td>
                          <td>{value.datecommande}</td>
                          <td
                            style={{
                              color: `${
                                value.etat === "attente"
                                  ? "orange"
                                  : value.etat === "accepter"
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          >
                            {value.etat}
                          </td>

                          <td>
                            {CurrentUser.Poste === "admin" ? (
                              <button
                                className="mb-2 mr-2 btn-transition btn btn-outline-info"
                                onClick={() =>
                                  navigate("/Edit_Commande/" + value._id)
                                }
                              >
                                <i
                                  className="pe-7s-pen"
                                  style={{ fontSize: 18 }}
                                ></i>
                              </button>
                            ) : null}
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
