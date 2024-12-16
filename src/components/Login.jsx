/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import '../index.css';

function Login({ setToken }) 
{
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
    {
        email: '',
        password: '',
    });


    const handleSubmit = async (e) => 
    {
        e.preventDefault();

        try
        {
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login`, 
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
            console.log('Login result:', result);

            localStorage.setItem('token', result.token);
           
            setToken(result.token);
            navigate('/account');
            window.location.reload();
        }
        catch(error)
        {
          console.error('Error logging in user:', error);
        }
    };

    const handleChange = (event) => 
    {
        setFormData({ ...formData, [event.target.name]: event.target.value });

    };

    return(
      <>
        <form onSubmit={handleSubmit} className='formStyle'>
        <br></br>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <br></br>
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} /><br></br>
            </label>
            <button type="submit" className='buttonStyle'>Login</button>
        </form>
      </>
    );
};

export default Login;