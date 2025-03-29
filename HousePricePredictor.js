import React, { useState } from "react";
import "./HousePricePredictor.css";

function HousePricePredictor() {
  const [formData, setFormData] = useState({
    city: "",
    province: "",
    latitude: "",
    longitude: "",
    lease_term: "",
    type: "",
    beds: "",
    baths: "",
    sq_feet: "",
    furnishing: "Unfurnished",
    smoking: "",
    pets: false,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const type = target.type;
    const checked = target.checked;

    const newFormData = { ...formData };

    if (type === "checkbox") {
      newFormData[name] = checked;
    } else {
      newFormData[name] = value;
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);

    const dataToSend = {
      city: formData.city,
      province: formData.province,
      latitude: formData.latitude,
      longitude: formData.longitude,
      lease_term: formData.lease_term,
      type: formData.type,
      beds: parseInt(formData.beds),
      baths: parseFloat(formData.baths),
      sq_feet: parseInt(formData.sq_feet),
      furnishing: formData.furnishing,
      smoking: formData.smoking,
      pets: formData.pets,
    };

    try {
      const response = await fetch("http://localhost:5000/predict_house_price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      const responseData = await response.json();
      const predictedPrice = responseData.predicted_price;
      const formattedResult = "Predicted Rent Price: $" + predictedPrice.toFixed(2);
      setResult(formattedResult);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>House Price Predictor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="province">Province:</label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="lease_term">Lease Term:</label>
          <input
            type="text"
            id="lease_term"
            name="lease_term"
            value={formData.lease_term}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="beds">Beds:</label>
          <input
            type="text"
            id="beds"
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="baths">Baths:</label>
          <input
            type="text"
            id="baths"
            name="baths"
            value={formData.baths}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="sq_feet">Square Feet:</label>
          <input
            type="text"
            id="sq_feet"
            name="sq_feet"
            value={formData.sq_feet}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="furnishing">Furnishing:</label>
          <select
            id="furnishing"
            name="furnishing"
            value={formData.furnishing}
            onChange={handleChange}
            required
          >
            <option>Unfurnished</option>
            <option>Partially Furnished</option>
            <option>Fully Furnished</option>
          </select>
        </div>

        <div className="form-item">
          <label htmlFor="smoking">Smoking:</label>
          <input
            type="text"
            id="smoking"
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="pets">I have a pet:</label>
          <input
            type="checkbox"
            id="pets"
            name="pets"
            checked={formData.pets}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
        <button type="submit">Predict</button>'
        </div>
      </form>

      {result !== null && (
        <div className="result-box">
          {result}
        </div>
      )}
    </div>
  );
}

export default HousePricePredictor;
