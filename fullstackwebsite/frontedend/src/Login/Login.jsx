import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    console.log(formData);
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json(); // Parse the response as JSON
        const { token } = data; // Extract the token from the response data
        console.log("Login successful!");
        console.log("Token:", token); // Log the token to the console
        localStorage.setItem("token", token)
      } else {
        console.error("Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
         
          <input type="submit" value="login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
