/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import React from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import '../index.css';

const Navigations = ({ isAuthenticated, onLogout }) => 
{
  const navigate = useNavigate();

  return (
    <>
        <nav className='tabsStyle'>
            <Link to="/books">Books</Link>
                {!isAuthenticated ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>) : (
            <>
          <Link to="/account">My Account</Link>
          <button onClick={