import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        localStorage.setItem('token', json.authtoken);
        sessionStorage.setItem('loginSuccessMessage', 'Login successful!');
        navigate("/");
      } else {
        setErrorMessage(json.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5" >
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card p-4">
            <h2 className="text-center mb-4">Login to the iNotebook</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={credentials.email}
                  onChange={onChange}
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  required
                  autoComplete="username"
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={credentials.password}
                  onChange={onChange}
                  id="password"
                  name="password"
                  required
                  autoComplete="current-password"
                />
              </div>
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
              <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;