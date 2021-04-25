import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { sendMsg } from "../redux/action/products";

const Contact = ({ sendMsg }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const contacts = [
    {
      title: "phone",
      value: "+0123456789",
    },
    {
      title: "fax",
      value: "+0123456789",
    },
    {
      title: "email",
      value: "+support@luxury.silk",
    },
    {
      title: "address",
      value: "87, Tennesee hwy, Washington, DC, USA, 22406",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      name,
      email,
      subject,
      message,
    });
    sendMsg(data);
  };

  document.title =
    "Contact Us | Luxury Silk Online, High Quality Hair Products. Nairobi, Kenya.";

  return (
    <>
      <div className="title">
        <p className="title-nav">
          <Link to="/">Home</Link>/<span>Contact Us</span>
        </p>
        <h2 className="title-name">Contact Us</h2>
      </div>
      <div className="contact">
        <h2 className="contact-title">Want to get in touch with us?</h2>
        <div className="contact__wrapper">
          <ul className="contact-socials">
            {contacts.map(({ title, value }, idx) => (
              <li key={idx}>
                <span>{title}</span>: {value}
              </li>
            ))}
          </ul>
          <form onSubmit={(e) => handleSubmit(e)} className="contact-form">
            <div className="input-group">
              <label htmlFor="name">Your name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="false"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Your email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="false"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="subject">Your subject *</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                autoComplete="false"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="message">Your message *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                autoComplete="false"
                required
              />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default connect(null, { sendMsg })(Contact);
