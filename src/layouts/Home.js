import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import img1 from "../assets/imgs/shampoo_carousel_4.982a32e6.jpg";
import img4 from "../assets/imgs/hair-growth-oil.jpg";
import img2 from "../assets/imgs/hair-growth-oil2.jpg";
import img3 from "../assets/imgs/hair-growth-oil3.jpg";
import { Button, Container } from "semantic-ui-react";
import { fetchCart } from "../redux/action/cart";
import { getItems } from "../redux/action/products";
import { Link } from "react-router-dom";
import { SlideData } from "../data/data";
import Hero from "./Hero";
import Featured from "./Featured";
import hero1 from "../assets/imgs/hero2.jpg";
import hero2 from "../assets/imgs/beaux-slider1.jpg";
import hero3 from "../assets/imgs/hero3.jpg";
import oil1 from "../assets/imgs/oil-home.jpg";
import oil2 from "../assets/imgs/oil-home2.jpg";
import {
  RiShoppingBagLine,
  RiUserLine,
  RiSearch2Line,
  RiLoginBoxLine,
} from "react-icons/ri";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// import { RiShoppingBagLine, RiUser2Line, RiSearch2Line } from "react-icons/fi";

import { FiChevronDown, FiMinus, FiPlus } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import ProductsSkeleton from "../Skeleton/ProductsSkeleton";

const Home = ({ products, fetchCart, getItems, auth, cart, loading }) => {
  const [quantity, setQuantity] = useState(1);
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      img: hero2,
      class: "slide1",
      title: "Your best hair starts with custom haircare.",
      btn: "get your formula",
      path: "/collections/all-products",
    },
    {
      img: hero1,
      class: "slide2",
      title: "Custom Curl Cream. The power to redefine your curls.",
      btn: "Learn More",
      path: "/collections/all-products",
    },
    {
      img: hero3,
      class: "slide3",
      title: "Custom Dry Shampoo. Zero aerosol. All good.",
      btn: "Shampoo",
      path: "/collections/shampoo",
    },
  ];

  const length = slides.length;
  const timeout = useRef(null);

  useEffect(() => {
    fetchCart();
    getItems();
  }, []);

  useEffect(() => {
    const nextSlide = () => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    };
    timeout.current = setTimeout(nextSlide, 10000);
    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length]);

  const nextSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  let items = products?.results;

  let cartItems = cart?.order_items;

  let shampoo = items
    ?.filter((item) => item.category === "Shampoo")
    .slice(0, 4);

  let oil = items?.filter((item) => item.category === "Hair Oil").slice(0, 4);

  let moisturizer = items
    ?.filter((item) => item.category === "Moisturizer")
    .slice(0, 4);

  const showQuickView = () => {
    document.querySelector(".product-modal").classList.add("transparentBcg");
    document.querySelector(".product-modal__wrapper").classList.add("show");
  };

  const showStepBtn = document.querySelectorAll(".show-step");
  showStepBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".step").forEach((step) => {
        step.classList.remove("show-text");
      });
      e.currentTarget.parentElement.parentElement.classList.toggle("show-text");
    });
  });

  const detailLink = (category, slug) => {
    https: return `/collections/${category.toLowerCase()}/${slug}`;
  };

  document.title =
    "Luxury Silk Online, High Quality Hair Products. Nairobi, Kenya.";

  const content = (title, btn, path) => {
    return (
      <motion.div
        className="slide-content"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2 }}>
        <h2 className="slide-title">{title}</h2>
        <Link className="slide-btn" to={path}>
          {btn}
        </Link>
      </motion.div>
    );
  };

  return (
    <>
      <div className="homepage">
        <section className="showcase">
          {slides?.map((item, idx) => (
            <div className="slides" key={idx}>
              <AnimatePresence exitBeforeEnter>
                {idx === current && (
                  <motion.div
                    className="slide"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 2 }}>
                    <img src={item.img} alt="" />
                    {content(item.title, item.btn, item.path)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="sliders__nav">
            <div className="slider__btn">
              <MdChevronLeft onClick={prevSlide} />
            </div>
            <div className="slider__btn">
              <MdChevronRight onClick={nextSlide} />
            </div>
          </div>
        </section>
        <div className="home-info">
          <Container className="home-info__wrapper">
            <div className="home-info-item">
              <div className="home-info-icon">
                <i className="fa fa-truck"> </i>
              </div>
              <div className="home-info-detail">
                <h4>free delivery</h4>
                <p>On all orders over KS 8000</p>
              </div>
            </div>
            <div className="home-info-item">
              <div className="home-info-icon">
                <i className="fa fa-headphones" />
              </div>
              <div className="home-info-detail">
                <h4>free support</h4>
                <p>24/7 call center available</p>
              </div>
            </div>
            <div className="home-info-item">
              <div className="home-info-icon">
                <i className="fa fa-refresh" />
              </div>
              <div className="home-info-detail">
                <h4>free returns</h4>
                <p>No questions asked</p>
              </div>
            </div>
            <div className="home-info-item">
              <div className="home-info-icon">
                <i className="fa fa-shield" />
              </div>
              <div className="home-info-detail">
                <h4>security payment</h4>
                <p>Secure online payments</p>
              </div>
            </div>
          </Container>
        </div>
        <section className="products">
          <Container className="products-wrapper">
            <h1 className="home-title">trending products</h1>
            {loading && <ProductsSkeleton />}
            {shampoo && (
              <div className="products-items">
                {shampoo?.length > 0 &&
                  shampoo.map((product) => (
                    <div className="products-item">
                      {product.sold_out && (
                        <div className="product-sold_out">
                          <h4>sold out</h4>
                        </div>
                      )}
                      <Link to={detailLink(product.category, product.slug)}>
                        <img
                          className="products-item__img"
                          src={product.image}
                          alt=""
                        />
                      </Link>
                      <div className="products-item__info">
                        <Link to={detailLink(product.category, product.slug)}>
                          <p>{product.title}</p>
                        </Link>
                        <h3>Ksh {product.price}</h3>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Container>
        </section>
        <section className="oil-product">
          <div className="row">
            <div className="oil-product-info">
              <h5>put it in neutral</h5>
              <h3>enlightened beauty</h3>
              <h2>KSh 1250.00</h2>
              <p>
                Shampoo Growth ButterOn damp hair, separate into sections
                depending on volume and length. If hair is dry, spritz lightly
                with our "Miracle Mist" Daily Spritz to soften and dampen. Apply
                "Curl Magic!" Curling Gel liberally sections by section from
                root to tip.{" "}
              </p>
              <Link to="">more infor</Link>
            </div>
            <div className="oil-product-img">
              <img src={oil1} alt="LuxurySilkOil" />
            </div>
          </div>
          <div className="row">
            <div className="oil-product-img">
              <img src={oil2} alt="LuxurySilkOil" />
            </div>
            <div className="oil-product-info">
              <h3>user instructions</h3>
              <div className="oil-product-steps">
                <article className="step show-text">
                  <div className="step-header">
                    <h4>step 1</h4>
                    <FiChevronDown className="show-step current" />
                  </div>
                  <div className="step-text">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Alias perspiciatis eligendi tempore corporis repudiandae
                      dolore animi laborum commodi similique illo!
                    </p>
                  </div>
                </article>
                <article className="step">
                  <div className="step-header">
                    <h4>step 2</h4>
                    <FiChevronDown className="show-step" />
                  </div>
                  <div className="step-text">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Alias perspiciatis eligendi tempore corporis repudiandae
                      dolore animi laborum commodi similique illo!
                    </p>
                  </div>
                </article>
                <article className="step">
                  <div className="step-header">
                    <h4>step 3</h4>
                    <FiChevronDown className="show-step" />
                  </div>
                  <div className="step-text">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Alias perspiciatis eligendi tempore corporis repudiandae
                      dolore animi laborum commodi similique illo!
                    </p>
                  </div>
                </article>
                <div className="oil-product-add">
                  <div className="oil-product-qty">
                    <span>Quantity</span>
                    <FiMinus
                      className="qty-down"
                      onClick={() => {
                        quantity > 1
                          ? setQuantity(quantity - 1)
                          : setQuantity(1);
                      }}
                    />
                    <span className="qty-value">{quantity}</span>
                    <FiPlus
                      className="qty-up"
                      onClick={() => setQuantity(quantity + 1)}
                    />
                  </div>
                  <Link to="">purchase</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="products">
          <Container className="products-wrapper">
            <h1 className="home-title">Hair Moisturizer</h1>
            {loading && <ProductsSkeleton />}
            {moisturizer && (
              <div className="products-items">
                {moisturizer?.length > 0 &&
                  moisturizer.map((product) => (
                    <div className="products-item">
                      {product.sold_out && (
                        <div className="product-sold_out">
                          <h4>sold out</h4>
                        </div>
                      )}
                      <Link to={detailLink(product.category, product.slug)}>
                        <img
                          className="products-item__img"
                          src={product.image}
                          alt=""
                        />
                      </Link>
                      <div className="products-item__info">
                        <Link to={detailLink(product.category, product.slug)}>
                          <p>{product.title}</p>
                        </Link>
                        <h3>Ksh {product.price}</h3>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Container>
        </section>
        <section className="instagram">
          <Container className="instagram__wrapper">
            <div className="instagram-follow">
              <i className="fa fa-instagram" />
              <h1>instagram</h1>
              <h3>@luxurysilk.hair</h3>
              <a
                href="https://www.instagram.com/luxurysilk.hair/"
                target="_blank">
                follow
              </a>
            </div>
            <div className="instagram-imgs">
              <a
                href="https://www.instagram.com/luxurysilk.hair/"
                target="_blank">
                <img src={img1} alt="" />
              </a>
              <a
                href="https://www.instagram.com/luxurysilk.hair/"
                target="_blank">
                <img src={img2} alt="" />
              </a>
              <a
                href="https://www.instagram.com/luxurysilk.hair/"
                target="_blank">
                <img src={img3} alt="" />
              </a>
              <a
                href="https://www.instagram.com/luxurysilk.hair/"
                target="_blank">
                <img src={img4} alt="" />
              </a>
              <a
                href="https://www.instagram.com/luxurysilk.hair/"
                target="_blank">
                <img src={img1} alt="" />
              </a>
              <a
                href="https://www.instagram.com/luxurysilk.hair/"
                target="_blank">
                <img src={img2} alt="" />
              </a>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
  auth: state.auth,
  cart: state.cart.shoppingCart,
  loading: state.products.loading,
});

export default connect(mapStateToProps, { fetchCart, getItems })(Home);
