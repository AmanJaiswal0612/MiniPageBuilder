# Welcome to Mini Page Builder

## Quick Start

To launch the local server, execute the following commands:

```bash
npm install # Install dependencies
npm start   # Start the server
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Mini-Page-Builder Component Documentation

### Overview

The 'MiniPageBuilder' component is a versatile React component designed for crafting pages with drag-and-drop functionality. Empowering users to effortlessly drag and customize components on a blank canvas, this component facilitates seamless configuration and saving of page layouts.

### Usage

1. Upon accessing the link, the Mini Page Builder UI unfolds with a user-friendly sidebar, housing blocks such as Labels, Inputs, and Buttons. The canvas, on the other side, awaits your creative touch.

2. Drag Labels, Inputs, or Buttons from the sidebar onto the canvas. A modal pops up with pre-filled X and Y configuration settings.

3. Fill in the details in the modal, click 'Save Changes,' and witness the magic. The dropped element manifests on the canvas, adhering to the provided details and the specified X and Y configurations.

4. Select elements by clicking on them. The selected element boasts a distinctive red border for easy identification. To edit details, select the element and press 'Enter.'

5. Upon pressing 'Enter,' a modal promptly opens with pre-filled details. Modify the data as needed and click 'Save Changes' to update the selected component.

6. To bid farewell to an element, select it and press either 'Delete' or 'Backspace.' A pro-tip: for deleting an input field, ensure the element is selected but not in focus (input should not be focused).

7. Feeling proud of your creation? Click 'Export Configuration' to download the component data as a JSON file for convenient storage and retrieval.

## Sneak Peek

Explore the builder: [Mini Page Builder](https://mini-page-builder-ten.vercel.app/)

## Dependencies

- **React:** This component leverages React, the JavaScript library for building delightful user interfaces.

## Structure

- **App.js:** The core React component file.
- **/Css/PageBuilder.css:** CSS file for styling the page builder.
- **/assets/vertical.svg:** SVG image for the vertical grip.
- **/Components/Popup.jsx:** Component responsible for the modal display to edit component properties.
- **/Css/Popup.css:** CSS file styling the modal.

## Component Anatomy

### State Variables:

- **elements:** Array of objects representing dropped components on the page.
- **selectedElementIndex:** Index of the currently selected component.
- **position:** Object containing clientX, clientY, mode, and type information for drag-and-drop operations.
- **popUpOpen:** Boolean controlling the modal's visibility.
- **focusInput:** Boolean indicating whether the input tag is focused.

### Event Handlers:

- **handleDragElementStart:** Initiates the drag operation and sets data for the dragged component.
- **handleDragElementEnd:** Handles the end of the drag operation by removing the "dragging" class.
- **handleDropElement:** Manages the drop event, updating component positions or opening a modal for a new component.
- **handleSelectElement:** Selects a dropped component for editing.
- **handleSavePopUp:** Saves changes made in the modal to the component state.
- **handleClosePopUp:** Closes the modal.
- **handleKeyPress:** Manages key presses for editing or deleting components.
- **storeDataToLocalStorage:** Saves the component data to local storage.
- **handleChange:** Handles changes in input fields for the selected component.

### Effect Hooks:

- **useEffect:** Clears the selected component when a new element is added.
- **useEffect:** Retrieves component data from local storage on mount.

### Rendering:

- Blank container for dropping components.
- Sidebar with draggable blocks (Label, Input, Button).
- Dropped components with drag-and-edit functionality.
- Modal component for editing component properties.

### Export Configuration:

- Button to export the current page component configurations as a JSON file for easy storage and retrieval.

## Styles

The styling for the page builder is meticulously crafted in the PageBuilder.css and Popup.css files. Feel free to tailor the styles to match your application's design seamlessly.

## Additional Notes

- Components and configurations are stored in local storage for persistence.
- The Modal component facilitates editing component properties.
- Components are draggable, droppable, editable, and deletable using convenient keyboard shortcuts.# MiniPageBuilder
# MiniPageBuilder
