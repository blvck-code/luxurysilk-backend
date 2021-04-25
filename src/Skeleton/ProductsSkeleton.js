import React from "react";
import { Container } from "semantic-ui-react";
import "./style.css";

const ProductsSkeleton = () => {
  const items = 8;
  return (
    <div className="skeleton_products">
      <Container className="skeleton_products-item">
        <div className="skeleton_products-img" />
        <div className="skeleton_products-info">
          <div className="skeleton_products-title" />
          <div className="skeleton_products-price" />
        </div>
      </Container>
      <Container className="skeleton_products-item">
        <div className="skeleton_products-img" />
        <div className="skeleton_products-info">
          <div className="skeleton_products-title" />
          <div className="skeleton_products-price" />
        </div>
      </Container>
      <Container className="skeleton_products-item">
        <div className="skeleton_products-img" />
        <div className="skeleton_products-info">
          <div className="skeleton_products-title" />
          <div className="skeleton_products-price" />
        </div>
      </Container>
      <Container className="skeleton_products-item">
        <div className="skeleton_products-img" />
        <div className="skeleton_products-info">
          <div className="skeleton_products-title" />
          <div className="skeleton_products-price" />
        </div>
      </Container>
    </div>
  );
};

export default ProductsSkeleton;
