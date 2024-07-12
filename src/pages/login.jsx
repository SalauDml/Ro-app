import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { setCookie } from "../utils/functions";

export default function Login() {
  const initialFormData = {
    username: "",
    password: ""
  };

  // State to hold form data
  const [response, setResponse] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();  // Initialize navigate

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
      const response = await fetch("http://127.0.0.1:8000/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setCookie(result.token);
        setResponse({ type: "success", message: result.message });
        setFormData(initialFormData);
        setTimeout(() => {
          setResponse({ type: "", message: "" });
          navigate("/dashboard");  // Redirect to dashboard after login
        }, 500);
      } else {
        const errorData = await response.json();
        setResponse({ type: "failure", message: "An error occurred" });
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
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
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
