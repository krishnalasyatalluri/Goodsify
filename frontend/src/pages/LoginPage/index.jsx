import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
const RegisterPage = () => {
    const navigate=useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmailChange=(e)=>{
        setEmail(e.target.value)
    }
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response=await axios.post('http://localhost:5729/user/login',{
                email,
                password
        })
            console.log(response.data)
            alert('Login success')
            navigate('/home')
        }catch(e){
            console.log(e.message)
        }
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={email} placeholder="enter your email here" onChange={handleEmailChange}  />     <br />
                <input type="text" value={password} placeholder="enter your password here" onChange={handlePasswordChange}  /><br />
                <input type="submit" className="submit-btn" placeholder="Register" />
            </form>
        </div>
    )

}
export default RegisterPage