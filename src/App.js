import React, { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [compressedFileName, setcompressedFileName] = useState(null);
  const [blobImage, setblobImage] = useState(null);
  const [img, setimg] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setcompressedFileName(file.name);
  };

  let formData = new FormData();
  const compressAndDisplayImage = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;

        image.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = image.width;
          canvas.height = image.height;

          ctx.drawImage(image, 0, 0);

          canvas.toBlob(
            (File) => {
              formData.append("file", selectedFile);

              formData.append("file", File, "pexels-photo-15250410.jpeg");
              console.log("----", [...formData]);
            },
            selectedFile.type,
            0.7
          );
        };
      };
      reader.readAsDataURL(selectedFile);
      console.log(selectedFile);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={compressAndDisplayImage}>Compress Image</button>
      {/* {selectedFile && (
        <div>
          <h2>Original Image</h2>
          <h3>{selectedFile && selectedFile.toString()}</h3>
          <img src={URL.createObjectURL(selectedFile)} alt="Original" />
        </div>
      )} */}
      {img && (
        <div>
          <h2>Compressed Image</h2>
          {img}
        </div>
      )}
    </div>
  );
}

export default App;
