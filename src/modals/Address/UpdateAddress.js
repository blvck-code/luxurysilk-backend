import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { addAddress } from "../../redux/action/address";
import "./style.css";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import {
  countyListURL,
  cityListURL,
  userIdURL,
  updateAddressURL,
} from "../../constant";
import { authAxios, config } from "../../utils";

const AddAddress = ({ updateId, addresses }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [userID, setUserID] = useState(null);
  const [counties, setCounties] = useState([]);
  const [cities, setCities] = useState([]);
  const [makeDefault, setMakeDefault] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);

  let item = addresses?.filter((item) => item.id === updateId)[0];
  useEffect(() => {
    setUpdateItem(item);
  }, [updateId]);

  console.log(updateItem?.first_name);

  useEffect(() => {
    handleFetchCounties();
    handleFetchCities();
    getUserID();
  }, []);

  useEffect(() => {
    if (updateItem !== undefined && updateItem !== null) {
      setFirstname(updateItem?.first_name);
      setLastname(updateItem?.last_name);
      setContact(updateItem?.contact);
      setAddress(updateItem?.address);
      setApartment(updateItem?.apartment);
      setCity(updateItem?.city);
      setCounty(updateItem?.state_or_region);
      setMakeDefault(updateItem?.default);
    }
  }, [updateItem]);

  const getUserID = () => {
    authAxios
      .get(userIdURL)
      .then((res) => {
        setUserID(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let id = userID?.userID;

  const handleFormatData = (counties) => {
    const keys = Object.keys(counties);
    return keys.map((k) => {
      return {
        key: k,
        text: counties[k],
        value: k,
      };
    });
  };

  const handleFetchCounties = () => {
    authAxios
      .get(countyListURL)
      .then((res) => {
        setCounties(handleFormatData(res.data));
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleFetchCities = () => {
    authAxios
      .get(cityListURL)
      .then((res) => {
        setCities(handleFormatData(res.data));
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      user: id,
      contact,
      first_name: firstname,
      last_name: lastname,
      address,
      apartment,
      city,
      state_or_region: county,
      default: makeDefault,
    };

    authAxios
      .put(updateAddressURL(updateId), data, config)
      .then((res) => {
        setSaving(false);
        setSuccess(true);
      })
      .catch((err) => setError(err));
  };

  const closeModal = () => {
    document.querySelector(".modal-overlay").classList.add("hide");
    document.querySelector(".update-address").classList.add("hide");
  };

  if (success) {
    closeModal();
  }

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      document.querySelector(".modal-overlay").classList.add("hide");
      document.querySelector(".update-address").classList.add("hide");
    }
  });

  return (
    <div className="modal-overlay hide update-address">
      <div className="modal-wrapper">
        <div className="modal-header">
          <span className="modal-title">UpdateAddress</span>
          <div className="modal-title__btn">
            <IoMdClose onClick={() => closeModal()} />
          </div>
        </div>
        <div className="underline" />
        <form
          className="shipping-form"
          onSubmit={(e) => handleSubmitAddress(e)}>
          <div className="shipping-data">
            <div className="input-inline">
              <div className="input-group firstname">
                <label htmlFor="firstname">First name</label>
                <input
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  type="text"
                />
              </div>
              <div className="input-group lastname">
                <label htmlFor="lastname">Last name</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group firstname">
              <label htmlFor="firstname">Mobile number</label>
              <div className="input-group phone">
                <div className="phone_code">+254</div>
                <input
                  placeholder="E.g 79000000"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  maxLength="9"
                  type="text"
                />
              </div>
            </div>
            <div className="input-group address">
              <label htmlFor="address">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
              />
            </div>
            <div className="input-group apartment">
              <label htmlFor="apartment">Apartment, suite, etc.</label>
              <input
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                type="text"
              />
            </div>
            <div className="input-inline">
              <div className="input-group state">
                <label htmlFor="city">County / Region *</label>
                <select
                  onChange={(e) => setCounty(e.target.value)}
                  loading={counties.length < 1}>
                  <option value="0">Please select...</option>
                  {counties &&
                    counties.map((item) => (
                      <option key={item.k} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                </select>
              </div>
              <div className="input-group city">
                <label htmlFor="city">City *</label>
                <select
                  onChange={(e) => setCity(e.target.value)}
                  loading={cities.length < 1}>
                  <option value="0">Please select...</option>
                  {cities &&
                    cities.map((item) => (
                      <option key={item.k} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="input-default">
              <input
                type="checkbox"
                checked={makeDefault === true ? true : false}
                onChange={() => setMakeDefault(!makeDefault)}
              />
              <span>Make this default address?</span>
            </div>
          </div>
          <div className="checkout-nav">
            <Button
              loading={saving}
              disabled={saving}
              type="submit"
              className="checkbox-btn">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.address.loading,
  success: state.address.success,
  addresses: state.address.address,
});

export default connect(mapStateToProps, { addAddress })(AddAddress);
