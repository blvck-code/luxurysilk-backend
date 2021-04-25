import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaChevronLeft } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import {
  getItemDetail,
  handleAddToCart,
  getItems,
} from "../redux/action/products";
import { connect } from "react-redux";
import { getImage } from "../utils";
import Loading from "./Loading";

const ProductDetail = ({
  getItemDetail,
  handleAddToCart,
  auth,
  addLoading,
  products,
  getItems,
  product: { item, error, loading },
}) => {
  const [quantity, setQuantity] = useState(1);

  const { location } = useHistory();
  let slug = location.pathname;

  let itemSlug = `/products/${slug.split("/").slice(3, 4).toString()}`;

  useEffect(() => {
    getItemDetail(itemSlug);
  }, [slug]);

  useEffect(() => {
    getItems();
  }, []);

  document.title = item
    ? `${item?.title} | Luxury Silk Online`
    : "Luxury Silk Online";

  const history = useHistory();

  const checkUser = (ref_code, qty) => {
    if (auth.token === null) {
      return history.push("/login");
    } else {
      return handleAddToCart(ref_code, qty);
    }
  };
  const category = item?.category;

  const items = products?.results;

  console.log(loading);

  let similars = items
    ?.filter((item) => item.category === category)
    .slice(0, 4);

  const showStepBtn = document.querySelectorAll(".show-step");
  showStepBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".step").forEach((step) => {
        step.classList.remove("show-text");
      });
      e.currentTarget.parentElement.parentElement.classList.toggle("show-text");
    });
  });

  return (
    <>
      {loading && <Loading />}
      {!loading && item && (
        <>
          <div className="title">
            <p className="title-nav">
              <Link to="/">Home</Link>/
              <Link to="/collections">Collections</Link>/
              <Link to="/collections/all-products">All products</Link>/
              <span>{item.title}</span>
            </p>
            <h2 className="title-name">{item.title}</h2>
          </div>
          <Container>
            <div className="product">
              <div className="product_info">
                <div className="product_info-left">
                  {item?.title && (
                    <h1 className="product_info-left__title">{item?.title}</h1>
                  )}
                  {item?.description && (
                    <p className="product_info-left__desc">
                      {item?.description}
                    </p>
                  )}
                  <div className="product_info-left__safe">
                    {item?.safety && (
                      <p>
                        <span>Safe for:</span> {item?.safety}
                      </p>
                    )}
                  </div>
                  <div className="product_info-left__use">
                    <p>
                      <span>When to use:</span> {item?.use_time}
                    </p>
                  </div>
                </div>
                <div className="product_info-right">
                  <div className="product_info-right__img">
                    {item?.image && (
                      <img src={getImage(item?.image)} alt={item?.title} />
                    )}
                  </div>
                  <div className="product_info-right__info">
                    <div className="product-purchase">
                      {item?.price && (
                        <h1 className="product_info-right__price">
                          KSh. {quantity * item?.price}
                        </h1>
                      )}
                      {item?.category && (
                        <div className="product_info-right__category">
                          {item?.category}
                        </div>
                      )}
                      {item?.weight && (
                        <span className="product_info-right__weight">
                          {item?.weight}
                        </span>
                      )}
                      <div className="product_info-right__add">
                        <div className="product_info-right__qty">
                          <FiMinus
                            className="qty-down down"
                            onClick={() => {
                              quantity > 1
                                ? setQuantity(quantity - 1)
                                : setQuantity(1);
                            }}
                          />
                          <span className="product_info-right__value">
                            {quantity}
                          </span>
                          <FiPlus
                            className="qty-up up"
                            onClick={() => setQuantity(quantity + 1)}
                          />
                        </div>
                        {item?.sold_out ? (
                          <Button disabled className="add-btn">
                            sold out
                          </Button>
                        ) : (
                          <>
                            <Button
                              loading={addLoading}
                              disabled={addLoading}
                              onClick={() =>
                                checkUser(item?.ref_code, quantity)
                              }
                              className="add-btn">
                              add to cart
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    {/* <div className="product-extra">
                      <article className="step">
                        <div className="step-header">
                          <h4>direction of use</h4>
                          <FiChevronDown className="show-step" />
                        </div>
                        <div className="step-text">
                          <p>
                            On damp hair, separate into sections depending on
                            volume and length. If hair is dry, spritz lightly
                            with our "Miracle Mist" Daily Spritz to soften and
                            dampen. Apply "Curl Magic!" Curling Gel liberally
                            sections by section from root to tip.
                          </p>
                        </div>
                      </article>
                      <article className="step">
                        <div className="step-header">
                          <h4>Ingredients</h4>
                          <FiChevronDown className="show-step" />
                        </div>
                        <div className="step-text">
                          <p>{item.ingredients}</p>
                        </div>
                      </article>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

const maptStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
  products: state.products.products,
  addLoading: state.cart.loading,
});

export default connect(maptStateToProps, {
  handleAddToCart,
  getItemDetail,
  getItems,
})(ProductDetail);
