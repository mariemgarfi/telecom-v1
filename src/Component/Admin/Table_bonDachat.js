import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../Banner";
import ReactToPrint from "react-to-print";
import UserContext from "../../User_contex";
const pageStyle = `
@media all {
  .page-header {
    display: none;
  }

}

@media print {
  html, body {
    display: block !important;

    height: initial !important;
    overflow: initial !important;
    -webkit-print-color-adjust: exact;
   
  }
}

@media print {

  .page-break {
    display: block;
    page-break-before: always;
  
  }
  .page-header{
    margin: 10mm;
    display: block;
    page-break-before: auto;
  }

 
 
}

@page {
  size: A4;
  margin: 10mm;
}
`;
export default function Table_bonDachat() {
  const [bonDachat, setBonDachat] = useState([]);
  const { CurrentUser, setCurrentUser } = useContext(UserContext);

  const myRef = useRef();
  let navigate = useNavigate();
  useEffect(() => {
    getAllBonDachat();
  }, []);

  const getAllBonDachat = () => {
    axios
      .get("http://localhost:3200/api/get_commande_etat")
      .then((result) => {
        let data = result.data.Commande;
        setBonDachat(data);
        console.log("hereee bon d'achat", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="app-main__inner">
      <Banner title="Bon d'achat" icon="fa-shopping-cart" />
      <div className="row">
        <div className="col-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <h5 className="card-title"> table Bon d'achat</h5>
              <table className="mb-0 table">
                <thead>
                  <tr>
                    <th>Nom article</th>
                    <th>Date bon d'achat</th>
                    <th>print bon d'achat</th>
                  </tr>
                </thead>
                <tbody>
                  {bonDachat?.map((value, i) => {
                    if (CurrentUser.magasin === value.magasin) {
                      return (
                        <tr key={i}>
                          <td>{value.nomarticle}</td>
                          <td>{value.nomarticle}</td>
                          <td>{value.datecommande}</td>

                          <td>
                            <ReactToPrint
                              trigger={() => {
                                return (
                                  <a
                                    href="#"
                                    className="mb-2 mr-2 btn-transition btn btn-outline-info"
                                  >
                                    <i
                                      className="pe-7s-print"
                                      style={{ fontSize: 18 }}
                                    ></i>{" "}
                                  </a>
                                );
                              }}
                              documentTitle="Bon d'achat telecom"
                              content={() => myRef.current}
                              pageStyle={pageStyle}
                            />
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
      <div className="page-break" ref={myRef}>
        <div
          className="container invoice page-header"
          style={{ display: "none", displayPrint: "block" }}
        >
          <div className="invoice-header">
            <div className="ui left aligned grid">
              <div className="row">
                <div className="left floated left aligned six wide column">
                  <div className="ui">
                    <h1 className="ui header pageTitle">
                      Invoice{" "}
                      <small className="ui sub header">With Credit</small>
                    </h1>
                    <h4 className="ui sub header invDetails">
                      NO: 554775/R1 | Date: 01/01/2015
                    </h4>
                  </div>
                </div>
                <div className="right floated left aligned six wide column">
                  <div className="ui">
                    <div className="column two wide right floated">
                      {/* <img
                        className="logo"
                        src="https://scontent.fmel5-1.fna.fbcdn.net/v/t1.0-9/10358691_1595827163984651_6845505980791568353_n.png?_nc_cat=109&_nc_ohc=We4wwT6M2Q0AX8qY8-b&_nc_ht=scontent.fmel5-1.fna&oh=69bd30fc152063c470afd928919c8734&oe=5E94664A"
                      /> */}
                      <ul>
                        <li>
                          <strong>RCJA Australia</strong>
                        </li>
                        <li>Lorem Ipsum</li>
                        <li>2 Alliance Lane VIC</li>
                        <li>info@rcja.com</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ui segment cards">
            <div className="ui card">
              <div className="content">
                <div className="header">Company Details</div>
              </div>
              <div className="content">
                <ul>
                  <li>
                    {" "}
                    <strong> Name: RCJA </strong>{" "}
                  </li>
                  <li>
                    <strong> Address: </strong> 1 Unknown Street VIC
                  </li>
                  <li>
                    <strong> Phone: </strong> (+61)404123123
                  </li>
                  <li>
                    <strong> Email: </strong> admin@rcja.com
                  </li>
                  <li>
                    <strong> Contact: </strong> John Smith
                  </li>
                </ul>
              </div>
            </div>
            <div className="ui card customercard">
              <div className="content">
                <div className="header">Customer Details</div>
              </div>
              <div className="content">
                <ul>
                  <li>
                    {" "}
                    <strong> Name: RCJA </strong>{" "}
                  </li>
                  <li>
                    <strong> Address: </strong> 1 Unknown Street VIC
                  </li>
                  <li>
                    <strong> Phone: </strong> (+61)404123123
                  </li>
                  <li>
                    <strong> Email: </strong> admin@rcja.com
                  </li>
                  <li>
                    <strong> Contact: </strong> John Smith
                  </li>
                </ul>
              </div>
            </div>
            <div className="ui segment itemscard">
              <div className="content">
                <table className="ui celled table">
                  <thead>
                    <tr>
                      <th>Item / Details</th>
                      <th className="text-center colfix">Unit Cost</th>
                      <th className="text-center colfix">Sum Cost</th>
                      <th className="text-center colfix">Discount</th>
                      <th className="text-center colfix">Tax</th>
                      <th className="text-center colfix">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Lorem Ipsum Dolor
                        <br />
                        <small className="text-muted">
                          The best lorem in town, try it now or leave forever
                        </small>
                      </td>
                      <td className="text-right">
                        <span className="mono">$1,000.00</span>
                        <br />
                        <small className="text-muted">Before Tax</small>
                      </td>
                      <td className="text-right">
                        <span className="mono">$18,000.00</span>
                        <br />
                        <small className="text-muted">18 Units</small>
                      </td>
                      <td className="text-right">
                        <span className="mono">- $1,800.00</span>
                        <br />
                        <small className="text-muted">Special -10%</small>
                      </td>
                      <td className="text-right">
                        <span className="mono">+ $3,240.00</span>
                        <br />
                        <small className="text-muted">VAT 20%</small>
                      </td>
                      <td className="text-right">
                        <strong className="mono">$19,440.00</strong>
                        <br />
                        <small className="text-muted mono">$16,200.00</small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Sit Amet Dolo
                        <br />
                        <small className="text-muted">Now you may sit</small>
                      </td>
                      <td className="text-right">
                        <span className="mono">$120.00</span>
                        <br />
                        <small className="text-muted">Before Tax</small>
                      </td>
                      <td className="text-right">
                        <span className="mono">$240.00</span>
                        <br />
                        <small className="text-muted">2 Units</small>
                      </td>
                      <td className="text-right">
                        <span className="mono">- $0.00</span>
                        <br />
                        <small className="text-muted">-</small>
                      </td>
                      <td className="text-right">
                        <span className="mono">+ $72.00</span>
                        <br />
                        <small className="text-muted">VAT:20% S:10%</small>
                      </td>
                      <td className="text-right">
                        <strong className="mono">$312.00</strong>
                        <br />
                        <small className="text-muted mono">$240.00</small>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="full-width">
                    <tr>
                      <th> Total: </th>
                      <th colSpan={2} />
                      <th colSpan={1}> $500 </th>
                      <th colSpan={1}> $800 </th>
                      <th colSpan={1}> $20000.00 </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="ui card">
              <div className="content center aligned text segment">
                <small className="ui sub header"> Amount Due (AUD): </small>
                <p className="bigfont"> $5000.25 </p>
              </div>
            </div>
            <div className="ui card">
              <div className="content">
                <div className="header">Payment Details</div>
              </div>
              <div className="content">
                <p>
                  {" "}
                  <strong> Account Name: </strong> "RJCA"{" "}
                </p>
                <p>
                  {" "}
                  <strong> BSB: </strong> 111-111{" "}
                </p>
                <p>
                  {" "}
                  <strong>Account Number: </strong> 1234101{" "}
                </p>
              </div>
            </div>
            <div className="ui card">
              <div className="content">
                <div className="header">Notes</div>
              </div>
              <div className="content">
                Payment is requested within 15 days of recieving this invoice.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
