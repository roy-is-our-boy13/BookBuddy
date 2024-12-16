/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';

function Register({ setToken }) 
{
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
    {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    });
  
    const handleSubmit = async (e) =>
    {
      e.preventDefault(); 
  
      try 
      {
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register`, 
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(formData),
            });
  
        if (!response.ok) 
        {
            throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
        console.log('Registration result:', result);
  
        localStorage.setItem('token', result.token);
        setToken(result.token);
        navigate('/account');
      } 
      catch (error) 
      {
          console.error('Error registering user:', error);
      }
    };
  
    const handleChange = (event) => 
    {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    return (
      <>
      <form onSubmit={handleSubmit} className="formStyle"><br></br>
        <label>
          First Name:
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} /><br></br>
        </label>
        <lable>
            Last Name:
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange}/><br></br>
        </lable>
        <lable>
            Email: 
            <input type="text" name="email" value={formData.email} onChange={handleChange}/><br></br>
        </lable>
        <lable>
            Password: 
            <input type="text" name="password" value={formData.password} onChange={handleChange}/><br></br>
        </lable>
        <button type="submit" className='buttonStyle'>Register