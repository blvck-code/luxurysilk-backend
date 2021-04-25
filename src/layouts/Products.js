import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getItems } from "../redux/action/products";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ProductsSkeleton from "../Skeleton/ProductsSkeleton";

const Products = ({ items, getItems, loading }) => {
  useEffect(() => {
    getItems();
  }, []);

  let products = items?.results;

  const sortAsc = (products) => {
    let items = products?.map((item) => {
      let prices = item?.price;
      // prices?.sort((a, b) => {
      //   return a - b;
      // });
    });
    console.log(items);
  };

  sortAsc(products);

  // let descending = prices?.sort((a, b) => {
  //   return b - a;
  // });

  const showQuickView = () => {
    document.querySelector(".product-modal").classList.add("transparentBcg");
    document.querySelector(".product-modal__wrapper").classList.add("show");
  };

  const detailLink = (category, slug) => {
    https: return `/collections/${category.toLowerCase()}/${slug}`;
  };

  document.title =
    "All Products | Luxury Silk Online, High Quality Hair Products. Nairobi, Kenya.";

  return (
    <>
      <div className="title">
        <p className="title-nav">
          <Link to="/">Home</Link>/<Link to="/collections">Collections</Link>/
          <span>All products</span>
        </p>
        <h2 className="title-name">All products</h2>
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
        {products && (
          <div className="products-items">
            {products?.length > 0 &&
              products?.map((product) => (
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
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  items: state.products.products,
  loading: state.products.loading,
});

export default connect(mapStateToProps, { getItems })(Products);
