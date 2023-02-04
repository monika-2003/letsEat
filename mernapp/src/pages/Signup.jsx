import React, {useState} from 'react'
import {Link } from 'react-router-dom'

export default function Signup() {

    const[credentials, setCredintials] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
    })

    const handleSubmit = async(e)=> {
        e.preventDefault()       // synthetic event

        const response = await fetch('http://localhost:5000/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                address: credentials.address
            })
        })

        const backendResp = await response.json();
        console.log(backendResp);

        if(!backendResp.success) {
            alert('Enter Valid Credentials');
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
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={handleChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" name='address' value={credentials.address}onChange={handleChange} />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </>
    )
}
