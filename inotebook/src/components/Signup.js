import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const [errormassage, setErrormassage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        localStorage.setItem("token", json.authtoken);
        sessionStorage.setItem("SignupSuccessmassage", "Signup successful!");
        navigate("/");
      } else {
        setErrormassage(json.massage || "Signup failed. Please try again.");
      }
    } catch (error) {
      setErrormassage("An error occurred. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card p-4">
            <h2 className="text-center mb-4">Create a account in iNotebook</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={onChange}
                  name="name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={onChange}
                  aria-describedby="emailHelp"
                  required
                  autoComplete="username"
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={onChange}
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="cPassword"
                  name="cPassword"
                  onChange={onChange}
                  required
                  autoComplete="new-password"
                />
              </div>
              {errormassage && (
                <div className="alert alert-danger" role="alert">
                  {errormassage}
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100">
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;