import React, { useContext, useEffect, useState } from "react";
import Banner from "../Banner";
import axios from "axios";
import Modal_delete from "./Modal_delete";
import { useNavigate } from "react-router-dom";
import UserContext from "../../User_contex";

export default function Tablefournisseur() {
    const [Project, setProject] = useState([]);
    const [open, setOpen] = useState(false);
    const [ProjectSelected, setProjectSelected] = useState({});
    const { CurrentUser, setCurrentUser } = useContext(UserContext);
    let navigate = useNavigate();

    useEffect(() => {
        getAllProject();
    }, []);

    const handleClickOpen = (project) => {
        setProjectSelected(project)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        getAllProject();
    };


    const getAllProject = () => {
        axios
            .get("http://localhost:3200/api/get_project")
            .then((result) => {
                setProject(result.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="app-main__inner">
            <Banner title="Mes Projet" icon="pe-7s-Fournisseurs" />
            <div className="row">
                <div className="col-12">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title"> tableaux des Project</h5>
                            <table className="mb-0 table">
                                <thead>
                                    <tr>
                                        <th>Nom Project</th>
                                        <th>chef Project</th>
                                        <th>lieu Project</th>
                                        <th>Etat Projet</th>
                                        <th>Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Project?.map((value, i) => (
                                        <tr key={i}>
                                            <td>{value.NomProjet}</td>
                                            <td>{value.chefProjet}</td>
                                            <td>{value.lieuProjet}</td>

                                            <td
                                                style={{
                                                    color: `${value.etat === "attente"
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
                                                <button className="mb-2 mr-2 btn-transition btn btn-outline-info"
                                                    onClick={() => navigate("/EditProject/" + value._id)}>
                                                    <i className="pe-7s-pen" style={{ fontSize: 18 }}></i>
                                                </button>
                                
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {open ? <Modal_delete type="Project" data={ProjectSelected} open={open} onClose={handleClose} /> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
