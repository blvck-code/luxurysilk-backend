import React, { useEffect, useState } from "react";
import { Button, Container } from "semantic-ui-react";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiPhone, FiPlus, FiUser } from "react-icons/fi";
import { connect } from "react-redux";
import { fetchAddress } from "../redux/action/address";
import { fetchProfile } from "../redux/action/auth";
import DeleteAddress from "../modals/Address/DeleteAddress";
import AddAddress from "../modals/Address/AddAddress";
import UpdateAddress from "../modals/Address/UpdateAddress";
import { getImage } from "../utils";
import ChangePass from "./ChangePass";
import EditDetails from "./EditDetails";

const Profile = ({ profile, user, fetchAddress, addresses, fetchProfile }) => {
  const [deleteId, setDeleteId] = useState(null);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetchAddress();
    fetchProfile();
  }, []);

  let defaultAdd = addresses?.filter((item) => item.default === true)[0];

  const deleteAdd = (id) => {
    setDeleteId(id);
    const deleteAdd = document?.querySelector(".delete-address");
    const modal = document?.querySelector(".modal-overlay");

    if (modal) {
      modal.classList.remove("hide");
    }
    if (deleteAdd) {
      deleteAdd.classList.remove("hide");
    }
  };

  const handleClick = (e) => {
    document.querySelectorAll(".account_inner-content").forEach((item) => {
      item.classList.add("hide");
    });
    document.querySelectorAll(".account-nav_item").forEach((item) => {
      item.classList.remove("active");
    });

    e.target.classList.add("active");

    let id = e.target.dataset.id;
    let activeItem = document.querySelector(`#${id}`);
    activeItem.classList.remove("hide");
  };

  const addAddress = () => {
    const addAddress = document?.querySelector(".add-address");
    const modal = document?.querySelector(".modal-overlay");

    if (modal) {
      modal.classList.remove("hide");
    }
    if (addAddress) {
      addAddress.classList.remove("hide");
    }
  };

  const upadateAddress = (id) => {
    setUpdateId(id);
    const addAddress = document?.querySelector(".update-address");
    const modal = document?.querySelector(".modal-overlay");

    if (modal) {
      modal.classList.remove("hide");
    }
    if (addAddress) {
      addAddress.classList.remove("hide");
    }
  };

  const updateUser = (e) => {
    document.querySelectorAll(".account_inner-content").forEach((item) => {
      item.classList.add("hide");
    });
    document.querySelector("#detail").classList.remove("hide");
  };

  return (
    <>
      <DeleteAddress id={deleteId} />
      <AddAddress />
      <UpdateAddress updateId={updateId} />
      <div className="title">
        <p className="title-nav">
          <Link to="/">Home</Link>/<span>Account</span>
        </p>
        <h2 className="title-name">Account</h2>
      </div>
      <div className="account">
        <Container className="account_inner">
          <div className="account_inner-nav">
            <div className="profile-nav">
              <img src={getImage(profile?.image)} alt="user" />
              <h5>
                {profile?.first_name} {profile?.last_name}
              </h5>
              <span>
                <i className="fa fa-pencil" />
                _Edit Profile
              </span>
            </div>
            <ul className="account-nav">
              <li
                className="account-nav_item active"
                onClick={(e) => handleClick(e)}
                data-id="account">
                Account
              </li>
              <li
                className="account-nav_item"
                onClick={(e) => handleClick(e)}
                data-id="orders">
                Orders
              </li>
              <li
                className="account-nav_item"
                onClick={(e) => handleClick(e)}
                data-id="address">
                Address Book
              </li>
              <li
                className="account-nav_item"
                onClick={(e) => handleClick(e)}
                data-id="password">
                Change Password
              </li>
            </ul>
          </div>
          <div className="account_inner-content  account" id="account">
            <h3>Account Overview</h3>
            <div className="underline" />
            <div className="account_inner-items">
              <div className="account_inner-item">
                <div className="account_inner-item-title">
                  <h3>Account Details</h3>
                  <FaPen data-id="details" onClick={(e) => updateUser(e)} />
                </div>
                <div className="underline" />
                <div className="account_inner-item-details">
                  <h3>
                    {profile?.first_name} {profile?.last_name}
                  </h3>
                  <div>
                    <p>
                      <span>Username:</span>
                      {user?.username}
                    </p>
                    <p>
                      <span>Email:</span>
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="account_inner-item">
                <div className="account_inner-item-title">
                  <h3>Account Book</h3>
                  <FaPen onClick={() => upadateAddress(defaultAdd?.id)} />
                </div>
                <div className="underline" />
                <div className="account_inner-item-details">
                  <h3>Your default delivery address:</h3>
                  <div>
                    <p>
                      {defaultAdd?.first_name} {defaultAdd?.last_name}
                    </p>
                    <p> {defaultAdd?.address}</p>
                    <p>{defaultAdd?.apartment}</p>
                    <p>{defaultAdd?.state_or_region}</p>
                    {defaultAdd?.contact && <p>+254 {defaultAdd?.contact}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="account_inner-content hide details" id="detail">
            <h2>Details</h2>
            <div className="underline" />
            <EditDetails />
          </div>
          <div className="account_inner-content hide orders" id="orders">
            <h3 className="order-status">
              Order Status: <span>Cancelled</span>
            </h3>
            <div className="order-wrapper">
              <div className="order-wrapper__left">
                <div className="order-info">
                  <p className="order-info__title">Cousignee name:</p>
                  <p>Maurice Oluoch</p>
                </div>
                <div className="order-info">
                  <p className="order-info__title">Contact telephone:</p>
                  <p>+254795772333</p>
                </div>
                <div className="order-info">
                  <p className="order-info__title">Address:</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perspiciatis eos explicabo provident reiciendis quaerat
                    libero necessitatibus quidem atque laboriosam sequi?
                  </p>
                </div>
                <div className="order-info">
                  <p className="order-info__title">County:</p>
                  <p>Alego Usonga</p>
                </div>
                <div className="order-info">
                  <p className="order-info__title">Town:</p>
                  <p>Siaya</p>
                </div>
                <div className="order-info">
                  <p className="order-info__title">Country:</p>
                  <p>Kenya</p>
                </div>
              </div>
              <div className="order-wrapper__right">
                <div className="order-info">
                  <p className="order-info__title">Order date:</p>
                  <p>2021-02-12 16:52:18</p>
                </div>
                <div className="order-info">
                  <p className="order-info__title">Payment:</p>
                  <p>
                    Online Payment <span>(Already Paid)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="account_inner-content hide address" id="address">
            <div className="address-header">
              <h3>Address Book</h3>
              <div onClick={() => addAddress()} className="address-add">
                <FiPlus /> Add New Address
              </div>
            </div>
            <div className="underline" />
            {addresses && addresses.length > 0 && (
              <div className="address-items">
                {addresses?.map((a) => (
                  <div key={a.id} className="address-item">
                    {a.default && (
                      <span className="address-item__default">Default</span>
                    )}

                    <div>
                      <FiUser />
                      <p>
                        {a?.first_name} {a?.last_name}
                      </p>
                    </div>
                    <div>
                      <FiPhone />
                      {a?.contact && <p>+254 {a?.contact}</p>}
                    </div>
                    <div>
                      <i className="fa fa-building-o" />
                      <p>{a?.apartment}</p>
                    </div>
                    <div>
                      <i className="fa fa-envelope" />
                      <p>{a?.address}</p>
                    </div>
                    <div>
                      <i className="fa fa-location-arrow" />
                      <p>
                        {a?.state_or_region}, {a?.city}
                      </p>
                    </div>
                    <div className="address-nav">
                      <Button
                        onClick={() => deleteAdd(a?.id)}
                        className="address-delete">
                        Delete
                      </Button>
                      <div
                        onClick={() => upadateAddress(a?.id)}
                        className="address-edit">
                        Edit
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {addresses.length < 1 && (
              <div className="no-address">
                <p>
                  No address available.{" "}
                  <span onClick={() => addAddress()}>Add here</span>
                </p>
              </div>
            )}
          </div>
          <div className="account_inner-content hide password" id="password">
            <div className="address-header">
              <h3>Change Password</h3>
            </div>
            <div className="underline" />
            <ChangePass />
          </div>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  addresses: state.address.address,
  profile: state.auth.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, { fetchAddress, fetchProfile })(
  Profile
);
