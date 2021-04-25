import React from "react";
import { Container } from "semantic-ui-react";
import img1 from "../assets/imgs/shampoo1.jpg";
import img2 from "../assets/imgs/shampoo2.jpg";
import img3 from "../assets/imgs/shampoo3.jpg";
import img4 from "../assets/imgs/shampoo4.jpg";

const Featured = () => {
  return (
    <div className="featured">
      <Container className="featured_wrapper">
        <h2>Featured products</h2>
        <ul className="featured_titles">
          <li className="featured_title active">featured</li>
          <li className="featured_title">latest</li>
          <li className="featured_title">special</li>
        </ul>
        <div className="featured_items">
          <div className="featured_item">
            <img src={img1} alt="" />
            <div className="featured_item-detail">
              <h3>
                Creme Of Nature Sulphate Free Moisture & Shine Shampoo AS
                PICTURED Small
              </h3>
              <div className="featured_item-detail__price">
                <h4 className="discount_price">Ksh 900</h4>{" "}
                <h4 className="price">Ksh 1000</h4>
              </div>
            </div>
          </div>
          <div className="featured_item">
            <img src={img2} alt="" />
            <div className="featured_item-detail">
              <h3>
                Creme Of Nature Sulphate Free Moisture & Shine Shampoo AS
                PICTURED Small
              </h3>
              <div className="featured_item-detail__price">
                <h4 className="discount_price">Ksh 900</h4>{" "}
                <h4 className="price">Ksh 1000</h4>
              </div>
            </div>
          </div>
          <div className="featured_item">
            <img src={img3} alt="" />
            <div className="featured_item-detail">
              <h3>
                Creme Of Nature Sulphate Free Moisture & Shine Shampoo AS
                PICTURED Small
              </h3>
              <div className="featured_item-detail__price">
                <h4 className="discount_price">Ksh 900</h4>{" "}
                <h4 className="price">Ksh 1000</h4>
              </div>
            </div>
          </div>
          <div className="featured_item">
            <img src={img4} alt="" />
            <div className="featured_item-detail">
              <h3>
                Creme Of Nature Sulphate Free Moisture & Shine Shampoo AS
                PICTURED Small
              </h3>
              <div className="featured_item-detail__price">
                <h4 className="discount_price">Ksh 900</h4>{" "}
                <h4 className="price">Ksh 1000</h4>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Featured;
