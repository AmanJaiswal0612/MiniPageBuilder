import React, { useEffect, useState } from "react";
import "./Css/PageBuilder.css";
import vertical from "./assets/vertical.svg";
import Popup from "./Components/Popup";

const App = () => {
  const [elements, setElement] = useState([]);
  const [selectedElementIndex, setSelectedElementIndex] = useState(null);
  const [possition, setPossition] = useState({
    clientX: "",
    clientY: "",
    mode: "",
    type: "",
  });
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [focusInput, setFocusInput] = useState(false);

  const handleDragElementStart = (event, type, index = "") => {
    event.target.classList.add("dragging");
    const boundingRect = event.target.getBoundingClientRect();

    const offsetX = event.clientX - boundingRect.left;
    const offsetY = event.clientY - boundingRect.top;
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ type, index, offsetX, offsetY })
    );
  };

  const handleDragElementEnd = (event) => {
    event.target.classList.remove("dragging");
  };

  const handleDropElement = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const { type, index, offsetX, offsetY } = JSON.parse(data);
    const { clientX, clientY } = event;

    const updatedElements = [...elements];

    if (updatedElements[index]) {
      updatedElements[index] = {
        ...updatedElements[index],
        type,
        clientX: clientX - offsetX,
        clientY: clientY - offsetY,
      };
      setElement(updatedElements);
      storeDataToLocalStorage(updatedElements);
      return;
    }

    setPossition({
      ...possition,
      clientX: clientX - offsetX,
      clientY: clientY - offsetY + 20,
      mode: "",
      type,
    });
    setPopUpOpen(true);
  };

  const handleSelectElement = (index) => {
    setSelectedElementIndex(index);
  };

  const handleSavePopUp = (inputValues, mode, index) => {
    const updatedElements = [...elements];
    if (mode == "edit") {
      if (updatedElements[index]) {
        updatedElements[index] = {
          ...updatedElements[index],
          ...inputValues,
          clientX: inputValues.clientX,
          clientY: inputValues.clientY,
        };
        setElement(updatedElements);
        storeDataToLocalStorage(updatedElements);
      }
    } else {
      updatedElements.push({
        type: possition.type,
        clientX: inputValues.clientX,
        clientY: inputValues.clientY,
        text: inputValues.text,
        fontSize: inputValues.fontSize,
        fontWeight: inputValues.fontWeight,
      });
      setElement(updatedElements);
      storeDataToLocalStorage(updatedElements);
    }
    setPopUpOpen(false);
  };

  const handleClosePopUp = () => {
    setPopUpOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setPossition({ ...possition, mode: "edit" });
      setPopUpOpen(true);
    } else if (event.key === "Backspace" && !focusInput) {
      event.preventDefault();
      let x = elements.filter((_, index) => index !== selectedElementIndex);
      setElement(x);
      storeDataToLocalStorage(x);
    }
  };

  const storeDataToLocalStorage = (updatedElements) => {
    localStorage.setItem("elements", JSON.stringify(updatedElements));
  };
  useEffect(() => {
    setSelectedElementIndex(null);
  }, [elements.length]);

  useEffect(() => {
    const storedComponents = JSON.parse(localStorage.getItem("elements"));
    if (storedComponents) {
      setElement(storedComponents);
    }
  }, []);

  const handleExport = () => {
    const jsonData = JSON.stringify(elements);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pageBuilderConfig.json";
    link.click();
  };

  const handleChange = (event, index) => {
    const updatedComponents = [...elements];
    if (updatedComponents[index]) {
      updatedComponents[index] = {
        ...updatedComponents[index],
        [event.target.name]: event.target.value,
      };
      setElement(updatedComponents);
      storeDataToLocalStorage(updatedComponents);
    }
  };

  return (
    <div>
      <div
        className="pageBuilderBox"
        tabIndex={0}
        onKeyDown={(e) => handleKeyPress(e)}
      >
        <div
          className="blankBox"
          onDrop={handleDropElement}
          onDragOver={(e) => e.preventDefault()}
        >
          {elements.map((component, index) => (
            <div
              draggable
              key={index}
              onDragStart={(e) =>
                handleDragElementStart(e, component.type, index)
              }
              onDragEnd={handleDragElementEnd}
              onClick={() => handleSelectElement(index)}
              style={{
                left: component.clientX + "px",
                top: component.clientY + "px",
                fontSize: component.fontSize + "px" || "auto",
                fontWeight: component.fontWeight || "auto",
                position: "absolute",
                width: component?.type == "Input" ? "20%" : "auto",
              }}
              className={`draggableElem component_${
                selectedElementIndex === index ? "selected" : ""
              }`}
            >
              {component?.type === "Label" ? (
                component?.text || component?.type
              ) : component?.type === "Input" ? (
                <input
                  type="text"
                  name="text"
                  value={component?.text}
                  onChange={(event) => handleChange(event, index)}
                  onFocus={() => setFocusInput(true)}
                  onBlur={() => setFocusInput(false)}
                />
              ) : (
                <button>{component?.text || component?.type}</button>
              )}
            </div>
          ))}
        </div>
        <div className="sidebarBox">
          <div>
            <h3>Blocks</h3>
            <div
              draggable
              onDragStart={(e) => handleDragElementStart(e, "Label")}
              onDragEnd={handleDragElementEnd}
            >
              <img
                src={vertical}
                alt="Grip Vertical Image"
                className="verGripImage"
              />
              <p>Label</p>
            </div>
            <div
              draggable
              onDragStart={(e) => handleDragElementStart(e, "Input")}
              onDragEnd={handleDragElementEnd}
            >
              <img
                src={vertical}
                alt="Grip Vertical Image"
                className="verGripImage"
              />
              <p>Input</p>
            </div>
            <div
              draggable
              onDragStart={(e) => handleDragElementStart(e, "Button")}
              onDragEnd={handleDragElementEnd}
            >
              <img
                src={vertical}
                alt="Grip Vertical Image"
                className="verGripImage"
              />
              <p>Button</p>
            </div>
          </div>
        </div>
      </div>
      <Popup
        handleSaveChanges={handleSavePopUp}
        handleCloseModal={handleClosePopUp}
        isOpen={popUpOpen}
        coordinates={possition}
        setCoordinates={setPossition}
        components={elements}
        selectedComponentIndex={selectedElementIndex}
      />
      <div className="confBtn">
        <button onClick={handleExport}>Export Configurations</button>
      </div>
    </div>
  );
}

export default App