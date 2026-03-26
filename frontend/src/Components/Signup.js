import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://inotebook-backend.onrender.com/api/auth/createuser", {
      method: 'Post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth-token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Account Created Successfully", "success")
      navigate("/");
    }
    else {
      props.showAlert("Invaild Details", "danger")
    }
  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="container mt-2">
      <h2 className="my-2">Create an account to use I-Notebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" value={credentials.name} onChange={onChange} name='name' id="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange} name='email' id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name='cpassword' id="cpassword" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  )
}
export default Signup;