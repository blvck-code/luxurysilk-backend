import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import credit from "../../assets/imgs/payments/logo_CreditBank.png";
import eco from "../../assets/imgs/payments/logo_Ecobank.png";
import ipay from "../../assets/imgs/payments/logo_ipay.png";
import kcb from "../../assets/imgs/payments/logo_KCB.png";
import mastercard from "../../assets/imgs/payments/logo_mastercard.png";
import mpesa from "../../assets/imgs/payments/logo_mpesa.png";
import visa from "../../assets/imgs/payments/logo_visa.png";
import { subscribe } from "../../redux/action/auth";
import { connect } from "react-redux";
import "./style.css";

const Footer = ({ subscribe }) => {
  const [email, setEmail] = useState("");
  const date = new Date();
  const year = date.getFullYear();

  const payments = [
    {
      img: credit,
      alt: "CreditBank",
    },
    {
      img: eco,
      alt: "EcoBank",
    },
    {
      img: ipay,
      alt: "Ipay",
    },
    {
      img: kcb,
      alt: "KCB",
    },
    {
      img: mastercard,
      alt: "Mastercard",
    },
    {
      img: mpesa,
      alt: "Mpesa",
    },
    {
      img: visa,
      alt: "Visa",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({ email: email });
    subscribe(data);
  };

  return (
    <>
      <div className="footer">
        <div className="footer__wrapper">
          <div className="footer-top">
            <h2>Newletter</h2>
            <p>Get timely updates from your favorites products</p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="false"
                required
                placeholder="Your email address"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          <div className="footer-contact">
            <div className="footer-contact__wrapper">
              <div className="footer-contact__item">
                <div className="footer-icon">
                  <FiPhoneCall />
                  <p>do you have a question</p>
                </div>
                <div className="footer-info phone">
                  <h3>+0123456789</h3>
                </div>
              </div>
              <div className="footer-contact__item">
                <div className="footer-icon">
                  <i className="fa fa-envelope-o" />
                  <p>offer question?</p>
                </div>
                <div className="footer-info">
                  <h3>Contact@luxurysilk.com</h3>
                </div>
              </div>
              <div className="footer-contact__item">
                <div className="footer-icon">
                  <i className="fa fa-support" />
                  <p>support question?</p>
                </div>
                <div className="footer-info">
                  <h3>Support@luxurysilk.com</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom__item">
              <h4>customer care</h4>
              <ul>
                <li>
                  <Link to="">Refund & Return Policy</Link>
                </li>
                <li>
                  <Link to="">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="">Terms of Service</Link>
                </li>
                <li>
                  <Link to="">Shipping Policy</Link>
                </li>
              </ul>
            </div>
            <div className="footer-bottom__item">
              <h4>follow us</h4>
              <a href="" target="_blank">
                <i className="fa fa-facebook-f" />
              </a>
              <a href="" target="_blank">
                <i className="fa fa-twitter" />
              </a>
              <a href="" target="_blank">
                <i className="fa fa-instagram" />
              </a>
              <a href="" target="_blank">
                <i className="fa fa-whatsapp" />
              </a>
            </div>
            <div className="footer-bottom__item">
              <h4>payment methods</h4>
              <div className="footer-payment">
                {payments.map(({ img, alt }, idx) => (
                  <div key={idx} className="payment-item">
                    <img src={img} alt={alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="copyright">
          copyright &copy; {year}. <Link to="/">Luxury Silk</Link>
        </p>
      </div>
    </>
  );
};

export default connect(null, { subscribe })(Footer);
