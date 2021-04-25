import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/imgs/oil-home.jpg";

const About = () => {
  document.title =
    "About Us | Luxury Silk Online, High Quality Hair Products. Nairobi, Kenya.";

  return (
    <>
      <div className="title">
        <p className="title-nav">
          <Link to="/">Home</Link>/<span>About Us</span>
        </p>
        <h2 className="title-name">About Us</h2>
      </div>
      <div className="about">
        <img className="about-img" src={img} alt="about-img" />
        <div className="about-info">
          <p>
            Here at Luxury Silk, we believe in freedom of expression. Expression
            of your ideas, expression of your inner power, and most importantly,
            expression of your true self. If one of your forms of
            self-expression is makeup, then we give you the right tools to do
            it! For you, we go above and beyond beauty products.
          </p>
          <p>
            We seek to inspire and support you and to always remind you how
            fierce you are! How? Through our products and our messages, we
            encourage you to be your most authentic self, to live big and
            unapologetically and to unleash your inner power! We believe in you,
            and we believe in getting you to believe in yourself. This is the
            spirit of Luxury Silk, instilled by our founder Jayne Irene as she
            pours her heart and soul into the company, and into you!{" "}
          </p>
          <p>
            <strong>
              So be brave, be bold, and stay beautiful; Glow Getter!
            </strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
