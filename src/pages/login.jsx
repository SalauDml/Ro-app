import React, { useState } from "react";

export default function Login() {
  const initialFormData = {
    email: "",
    password: ""
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mock response
      const res = {
        ok: true,
        json: async () => ({ message: "Login successful" })
      };

      console.log(formData, "TESTING")

      if (res.ok) {
        const result = await res.json();
        setResponse({ type: "success", message: result.message });
        setFormData(initialFormData);
        setTimeout(() => {
          setResponse({ type: "", message: "" });
        }, 5000);
      } else {
        const errorData = await res.json();
        setResponse({ type: "failure", message: errorData.message || "An error occurred" });
      }
    } catch (error) {
      setResponse({ type: "failure", message: error.message || "An error occurred" });
    }
  };

  return (
    <main>
      <div className="main">
        <div className="form-container">
          {response.type === "success" ? (
            <div className="success">{response.message}</div>
          ) : response.type === "failure" ? (
            <div className="failure">{response.message}</div>
          ) : (
            ""
          )}
          <form className="form login" onSubmit={handleSubmit}>
            <h2 className="title">Login</h2>
            <div className="flex-row">
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="flex-row">
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </main>
  );
}
