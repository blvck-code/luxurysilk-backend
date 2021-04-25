import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getItems } from "../redux/action/products";
import { Link, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ProductsSkeleton from "../Skeleton/ProductsSkeleton";

const Moisturizer = ({ items, getItems, loading }) => {
  const { pathname } = useLocation();
  let category = pathname.split("/").slice(2, 3).toString();

  useEffect(() => {
    getItems();
  }, []);

  let Items = items?.results;

  let oil = Items?.filter((item) => item.category === "Hair Oil");
  let moisturizer = Items?.filter((item) => item.category === "Moisturizer");

  let shampoo = Items?.filter((item) => item.category === "Shampoo");

  console.log(oil);

  const showQuickView = () => {
    document.querySelector(".product-modal").classList.add("transparentBcg");
    document.querySelector(".product-modal__wrapper").classList.add("show");
  };

  const detailLink = (category, slug) => {
    https: return `/collections/${category.toLowerCase()}/${slug}`;
  };

  document.title =
    "Moisturizer | Luxury Silk Online, High Quality Hair Products. Nairobi, Kenya.";

  return (
    <>
      <div className="title">
        <p className="title-nav">
          <Link to="/">Home</Link>/<Link to="/collections">Collections</Link>/
          <span>Moisturizer</span>
        </p>
        <h2 className="title-name">Moisturizer</h2>
      </div>
      <div className="products">
        <div className="products-filter">
          <select>
            <option value="featured">Featured</option>
            <option value="featured">Price,low to high</option>
            <option value="featured">Price,high to low</option>
          </select>
        </div>
        {loading && <ProductsSkeleton />}
        {moisturizer && (
          <div className="products-items">
            {moisturizer.length > 1 &&
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
                  {/* <div
                  onClick={() => showQuickView()}
                  className="product-quickview">
                  <p>quick vieww</p>
                </div> */}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  items: state.products.products,
  loading: state.products.loading,
});

export default connect(mapStateToProps, { getItems })(Moisturizer);
