import React, { useState } from "react";

function FormToImage() {
  const [imageData, setImageData] = useState(null);
  const [formInput, setFormInput] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new HTML5 canvas
    const canvas = document.createElement("canvas");
    canvas.width = 200; // Set the canvas width (adjust as needed)
    canvas.height = 200; // Set the canvas height (adjust as needed)

    // Get the canvas 2D context
    const ctx = canvas.getContext("2d");

    // Draw your form data or content on the canvas (for simplicity, we're just displaying text here)
    ctx.fillStyle = "blue";
    ctx.font = "20px Arial";
    ctx.fillText(formInput.name || "No Name", 10, 50);
    ctx.fillText(formInput.email || "No Email", 10, 80);

    // Convert the canvas to a data URL (PNG format)
    const imageDataURL = canvas.toDataURL("image/png");

    setImageData(imageDataURL);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Convert to Image</button>
      </form>
      {imageData && (
        <div>
          <h2>Converted Image:</h2>
          <img src={imageData} alt="Converted Image" />
        </div>
      )}
    </div>
  );
}

export default FormToImage;
