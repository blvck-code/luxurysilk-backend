import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { orderSummaryURL, productListURL } from "../../constant";
import { authAxios } from "../../utils";
import { connect } from "react-redux";
import img1 from "../../assets/imgs/shampoo1.jpg";
import img2 from "../../assets/imgs/oilhome.jpg";

const Cart = () => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cartBtn = document.getElementById("cart-btn");
  const closeCartBtn = document.querySelector(".close-cart");
  const clearCartBtn = document.querySelector(".clear-cart");
  const cartDOM = document.querySelector(".cart-content");
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartContent = document.querySelector(".cart-content");
  const cartItems = document.querySelector(".cart-total");
  const cartTotal = document.querySelector(".cart-total");

  useEffect(() => {
    fetchCart();
  }, []);

  // cart
  let cart = [];

  useEffect(() => {}, []);

  // buttons
  let buttonsDOM = [];

  const fetchCart = () => {
    authAxios
      .get(orderSummaryURL)
      .then((res) => {
        setShoppingCart(res.data);
      })
      .catch((err) => {
        console.log(error);
      });
  };

  // fetching products
  class Products {
    async getProducts() {
      try {
        let result = await fetch(productListURL);
        let data = result.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  }

  // display
  class UI {
    getCartButtons() {
      const buttons = [...document.querySelectorAll("#add-cart")];

      buttonsDOM = buttons;

      buttons.forEach((button) => {
        let id = button.dataset.id;
        let inCart = cart.find((item) => item.id === id);

        if (inCart) {
          button.innerText = "In Cart";
          button.disable = true;
        } else {
          button.addEventListener("click", (event) => {
            event.target.innerText = "In Cart";
            event.target.disable = true;

            // get product from products
            let cartItem = { ...Storage.getProduct(id), amount: 1 };

            // add product to the product
            cart = [...cart, cartItem];
            console.log(cart);
            // save cart in local storage
            Storage.saveCart(cart);
            // set cart values
            this.setCartValues(cart);
            // display cart item
            this.addCartItem(cartItem);
            // show the cart
            this.showCart();
          });
        }
      });
    }

    setCartValues(cart) {
      let tempTotal = 0;
      let itemsTotal = 0;

      cart.map((item) => {
        if (item.discount_price) {
          tempTotal += item.discount_price * item.amount;
          itemsTotal += item.amount;
        } else {
          tempTotal += item.price * item.amount;
          itemsTotal += item.amount;
        }
      });

      localStorage.setItem("tempTotal", parseFloat(tempTotal.toFixed(2)));
      localStorage.setItem("itemsTotal", itemsTotal);

      // cartItems.innerText = itemsTotal;

      console.log(tempTotal, itemsTotal);
    }

    addCartItem(item) {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
      <img src=${item.image} alt="" />
      <div>
        <h3>${item.title}</h3>
        <h5>KSh. ${item.discount_price ? item.discount_price : item.price}</h5>
        <span className="remove-item" data-id=${item.ref_code}>remove</span>
      </div>
      <div>
        <i className="fa fa-chevron-up" data-id=${item.ref_code}></i>
        <p className="item-amount">${item.amount}</p>
        <i className="fa fa-chevron-down" data-id=${item.ref_code}></i>
      </div>
      `;

      cartContent.append(div);
      console.log(cartContent);
    }

    showCart() {
      cartOverlay.classList.add("transparentBcg");
      cartDOM.classList.add("showCart");
    }
  }

  // local storage
  class Storage {
    static saveProducts(products) {
      localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(ref_code) {
      let products = JSON.parse(localStorage.getItem("products"));
      return products.find((product) => product.ref_code === ref_code);
    }
    static saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  useEffect(() => {
    const ui = new UI();
    const products = new Products();

    products
      .getProducts()
      .then((data) => {
        localStorage.setItem("products", data.results);
        Storage.saveProducts(data.results);
      })
      .then(() => {
        ui.getCartButtons();
      });
  }, []);

  return (
    <div className="cart-overlay">
      <div className="cart-wrapper">
        <span className="close-cart">
          <i className="fa fa-window-close" />
        </span>
        <h2>your cart</h2>
        <div className="cart-content">
          {/* <div className="cart-item">
          
          </div> */}
          <div className="cart-footer">
            <h3>
              your total : $ <span className="cart-total">0</span>
            </h3>
            <button className="clear-cart banner-btn">clear cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
