import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'Post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth-token and redirect
            localStorage.setItem('token', json.authtoken);
             props.showAlert("Logged In Successfully", "success")
            navigate("/");
        }
 
        else{
             props.showAlert("Invaild credentials", "danger")
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="mt-2">
            <h2 className="my-2">Login to continue to I-Notebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="my-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} name='email' id="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
        </div>
    )
}

export default Login;