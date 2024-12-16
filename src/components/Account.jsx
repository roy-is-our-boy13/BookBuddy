/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useEffect, useState } from 'react';
import '../index.css';

function Account() 
{
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => 
    {
      try 
      {
        const response = await fetch(
          'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me',
          {
            headers: 
            {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) 
        {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        console.log('User data:', data);
        setUser(data);
      } 
      catch (error) 
      {
        console.error('Error fetching user:', error);
        setError('Unable to fetch user information.');
      } 
      finally 
      {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);


  const removeReservation = async (id) => 
  {
    try 
    {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${id}`,
        {
          method: 'DELETE',
          headers: 
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) 
      {
        throw new Error('Removing reservation has failed');
      }

      setReservations(reservations.filter((reservation) => reservation.id !== id));
    } 
    catch (error) 
    {
      setError('Complete. Book is Removed.');
      window.location.reload();
    }
  };

  if (loading) 
  {
    return <p>Loading user information...</p>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h2 className='pageTitle'>My Account</h2>
          <h2>Welcome {user.firstname} {user.lastname}!</h2>
          <p>Email: {user.email}</p>
          <h3>Your Checked-Out Books:</h3>
          <ul className='singleBookDiv'>
            {user.books && user.books.length > 0 ? (
              user.books.map((book) => (
                <div className='singleBookBackground'>
                <li key={book.id}>
                  <p>{book.title}</p> 
                  <p>by {book.author}</p>
                  <img
                    src={book.coverimage}
                    alt={book.title}
                    style={{ width: '200px', height: '250px' }}/>
                  <br />
                  <button onClick={() => removeReservation(book.id)} className='buttonStyle'>
                    Remove
                  </button>
                </li>
                </div>
              ))
            ) : (
              <p>You have no books checked out.</p>
            )}
          </ul>
        </div>
      ) : (
        <p>Unable to load user information.</p>
      )}
    </div>
  );
}

export default Account;