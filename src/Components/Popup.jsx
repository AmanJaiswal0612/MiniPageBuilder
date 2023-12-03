import React, { useEffect, useState } from "react";
import "../Css/Popup.css";
import close from "../assets/close.svg"

const Popup = (props) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSave = () => {
    props.handleSaveChanges(
      formData,
      props.coordinates.mode,
      props?.selectedComponentIndex
    );
    setFormData({
      text: "",
      clientX: "",
      clientY: "",
      fontSize: "",
      fontWeight: "",
    });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      ...props.coordinates,
      text: "",
      fontSize: "",
      fontWeight: "",
    });

    if (
      props?.selectedComponentIndex != null &&
      props.coordinates.mode == "edit"
    ) {
      setFormData(props.components[props.selectedComponentIndex]);
    }
  }, [props?.coordinates, props?.isOpen]);
  return (
    <div className={`modal ${props?.isOpen ? "open" : "closed"}`}>
      <div className="modal-content">
        <div>
          <div className="modal-heading">
            <h2>
              Edit {props?.components[props.selectedComponentIndex]?.type}
            </h2>
            <img
              src={close}
              alt="cancel"
              className="cancel"
              onClick={props?.handleCloseModal}
            />
          </div>
        </div>
        <div className="input-group">
          <label>Text</label>
          <input
            name="text"
            type="text"
            value={formData.text}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-group">
          <label>X</label>
          <input
            name="clientX"
            type="text"
            value={formData.clientX}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-group">
          <label>Y</label>
          <input
            name="clientY"
            type="text"
            value={formData.clientY}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-group">
          <label>Font Size</label>
          <input
            name="fontSize"
            type="text"
            value={formData.fontSize}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-group">
          <label>Font Weight</label>
          <input
            name="fontWeight"
            type="text"
            value={formData.fontWeight}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="button-group">
          <button onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
