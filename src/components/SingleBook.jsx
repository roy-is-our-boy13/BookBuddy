/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function SingleBook() 
{
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [showReservations, setShowReservations] = useState(false);
  const navigate = useNavigate();

    useEffect(() => 
    {
      fetch (`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`)
      .then ((response) => response.json())
      .then ((data) => setBook(data.book))
      .catch((error) => console.error ("Error fetching a single book:", error));
    }, [bookId]);
    console.log('Book ID:', bookId);

    useEffect(() =>
    {
      fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', 
      {
        headers: 
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => response.json())
      .then((result) => setReservations(result))
      .catch((error) => console.error('Error fetching reservations:', error));
    }, []);

    const handleCheckout = async () => 
    {
      try 
      {
          const token = localStorage.getItem('token');

          if (!token) 
          {
              alert("To Checkout a Book, you must be Signed In or Registered.");
              return;
          }

          const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`, 
          {
            method: 'PATCH',
            headers: 
            {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ available: false }),
          });
    
          if (!response.ok) 
          {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const result = await response.json();
          console.log("Updated Book:", result);
    
          navigate('/account');
      } 
      catch (error) 
      {
          console.error("Error updating book availability:", error);
      }
    };

    return(
        <>
          <div className='singleBookDiv'>
          {book ? (
            <div>
              <div className='singleBookBackground'>
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
         