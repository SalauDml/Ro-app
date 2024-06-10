import React, { useState } from "react";
// import Search from "../components/search";

export default function Admin() {
  const initialFormData = {
        name: "",
        image_url: "",
        description: "",
        type: "",
        brand: "",
        price: "",
      };

  // State to hold form data
  const [response, setResponse] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState(initialFormData);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <main>
    <section className="container flex-row-between p-1">
          <div className="logo">
              <img src="/rocommerce.png" alt="logo" />
          </div>

          <div>
            asdfg
          </div>
    </section>

    <div className="main">
      <div className="form-container">
        {response.type === "success" ? (
          <div className="success">{response.message}</div>
        ) : response.type === "failure" ? (
          <div className="failure">{response.message}</div>
        ) : (
          ""
        )}
        <form className="form" onSubmit={()=>"Something here"}>
        <h2 className="title">Add a Product</h2>
          <div className="flex-row">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="flex-row">
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="flex-row">
            <label>
              Brand:
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </main>
  );
}
