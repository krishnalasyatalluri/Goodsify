import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
const RegisterPage = () => {
    const navigate=useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const handleUsernameChange=(e)=>{
        setName(e.target.value)
    }
    const handleEmailChange=(e)=>{
        setEmail(e.target.value)
    }
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value)
    }
    const handleMobileChange=(e)=>{
        setMobileNumber(e.target.value)
    }
    const handleLoginClick=()=>{
        navigate('/login')
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response=await axios.post('http://localhost:5729/user/register',{
                name,
                email,
                password,
                mobileNumber
        })
            console.log(response.data)
            alert('user registered successfully')
        }catch(e){
            console.log(e.message)
        }
    }
    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} placeholder="enter your name here" onChange={handleUsernameChange} />     <br />
                <input type="text" value={email} placeholder="enter your email here" onChange={handleEmailChange}  />     <br />
                <input type="text" value={password} placeholder="enter your password here" onChange={handlePasswordChange}  /><br />
                <input type="text" value={mobileNumber} placeholder="enter mobile number" onChange={handleMobileChange}/>     <br />
                <label>Already have an account?</label> <button onClick={handleLoginClick}>Login</button><br />
                <input type="submit" className="submit-btn" placeholder="Register" />
            </form>
        </div>
    )

}
export default RegisterPage