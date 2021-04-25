import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { deleteAddress } from "../../redux/action/address";
import "./style.css";

const DeleteAddress = ({ id, deleteAddress }) => {
  const deleteAdd = document?.querySelector(".delete-address");
  const modal = document?.querySelector(".modal-overlay");

  const handleDelete = () => {
    deleteAddress(id);
    if (modal) {
      modal.classList.add("hide");
    }
    if (deleteAdd) {
      deleteAdd.classList.add("hide");
    }
  };

  const closeDeleteAdd = () => {
    if (modal) {
      modal.classList.add("hide");
    }
    if (deleteAdd) {
      deleteAdd.classList.add("hide");
    }
  };

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      if (modal) {
        modal.classList.add("hide");
      }
      if (deleteAdd) {
        deleteAdd.classList.add("hide");
      }
    }
  });

  return (
    <div className="modal-overlay hide">
      <div className="delete-address hide">
        <p>Are you sure you want to delete this address?</p>
        <div className="delete-nav">
          <Button onClick={() => handleDelete()} className="delete">
            Confirm
          </Button>
          <Button onClick={() => closeDeleteAdd()} className="cancel">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { deleteAddress })(DeleteAddress);
