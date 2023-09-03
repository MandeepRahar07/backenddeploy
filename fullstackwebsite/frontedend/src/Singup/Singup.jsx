import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => { // Add the 'async' keyword here
    e.preventDefault();
    const formData = {
      email,
      password,
      name,
      city
    };
    console.log(formData);
    try {
      const response = await fetch("http://localhost:8000/signup", { // Fixed the typo in the URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Signup successful!");
      } else {
        console.error("Signup failed.");
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
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="city"
            onChange={(e) => setCity(e.target.value)}
          />
          <input type="submit" value="Sign Up" />
        </div>
      </form>
    </div>
  );
};

export default Signup;
