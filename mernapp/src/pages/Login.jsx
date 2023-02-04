import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

    const[credentials, setCredintials] = useState({
        email: "",
        password: "",
    })

    let navigate = useNavigate();

    const handleSubmit = async(e)=> {
        e.preventDefault()       // synthetic event

        const response = await fetch('http://localhost:5000/api/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            })
        })

        const backendResp = await response.json();
        console.log(backendResp);

        localStorage.setItem("authToken",backendResp.authToken);
        localStorage.setItem("email", credentials.email);

        if(!backendResp.success) {
            alert('Enter Valid Credentials');
        }
        if(backendResp.success) {
            navigate('/');
        }
    }

    const handleChange = (e) => {
        setCredintials({...credentials,[e.target.name]: e.target.value});
    }

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={handleChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to='/createuser' className='m-3 btn btn-danger'>I'm a user</Link>
                </form>
            </div>
        </>
    )
}
