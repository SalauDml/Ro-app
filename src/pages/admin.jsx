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

  const initialResponseDataStructure = { type: "", message: "" };
  // State to hold form data
  const [response, setResponse] = useState(initialResponseDataStructure);
  const [formData, setFormData] = useState(initialFormData);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/product/add_product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });


    if(response.ok) {
      const result = await response.json();
      setResponse({ type: "success", message: result.message})

      // Sets form vlues empty
      setFormData(initialFormData)

      //At 5 secs, set the response hook empty
      setTimeout(() => {
        setResponse(initialResponseDataStructure)
      }, 5000);
    }else {
      const errorData = await response.json();
      setResponse({ type: "failure", message: errorData.message })
    }

    } catch (error){
      console.log(error.message, "catch error")
      setResponse({ type: "failure", message: "Internal Server Error" })
    } 
  }


  return (
    <main>
    <section className="container flex-row-between p-1">
          <div className="logo">
              <img src="/rocommerce.png" alt="logo" />
          </div>

          <div>
            Search
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
        <form className="form" onSubmit={handleSubmit}>
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
