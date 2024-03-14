import React, { useState } from "react";
import { createWorker } from 'tesseract.js';
 

//  const api_url = https://sherlock-backend-3.onrender.com

const apiUrl = process.env.REACT_APP_BACKEND_URL || 'https://sherlock-backend-3.onrender.com';

const Home = () => {
  const [values, setValues] = useState({
    name: "",
    textdata:"",
    file: null,
  });

  const handleInput = (e) => {
    if (e.target.name === "file") {
      // Handle file input separately
      setValues({ ...values, file: e.target.files[0] });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const addFile = async (e) => {
    e.preventDefault();

    const { name,textdata, file } = values;

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("name", name);
    formData.append("textdata", textdata);
    formData.append("file", file);

    // Send data to backend
    try {
      const response = await fetch(`${apiUrl}/filedata`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload");
      }

      const data = await response.json();
      console.log(data);
      alert("Upload successful!");
    } catch (error) {
      console.error("Error occurred:", error);
      alert("An error occurred during upload.");
    }
  };
  // const worker = createWorker({
  //   logger: m => console.log(m)
  // });
   
  // (async () => {
  //   await worker.load();
  //   await worker.loadLanguage('');
  //   await worker.initialize('auto');
  //   const { data: { text } } = await worker.recognize('https://res.cloudinary.com/dcnblai32/image/upload/v1710174945/ptvcrnfdi0twoqsexf6l.jpg');
  //   console.log(text);
  //   await worker.terminate();
  // })();

  return (
    <div className="container">
      <h2>Upload Document</h2>
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" onChange={handleInput} />
        </div>
        <div className="form-group">
          <input
            type="file"
            accept="image/*"
            className="file"
            name="file"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            
            className="text"
            name="textdata"
            onChange={handleInput}
          />
        </div>

        <button type="submit" onClick={addFile}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
