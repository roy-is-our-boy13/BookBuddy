/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useEffect, useState } from 'react';

function Account()
{
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);

    useEffect(() => 
    {
        const fetchUser = async () => 
        {
            try
            {
                const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me`, 
                {
                    headers: 
                    {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    },
                });

                const data = await response.json();
                setUser(data);
            }
            catch(error)
            {
                console.error('Error fetching user:', error);
            }
        };
        
        const fetchReservations = async () => {
            try {
              const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
              });
      
              const data = await response.json();
              setReservations(data);
            } catch (error) {
              console.error('Error fetching reservations:', error);
            }
          };

        fetchUser();
        fetchReservations();
    }, []);
    

    return (
        <>
          <div>
            {user ? (
              <div>
                <h2>Welcome {user.firstname} {user.lastname}!</h2>
                <p>Email: {user.email}</p>
                <h3>Your Checked-Out Books:</h3>
                <ul>
                  {reservations && reservations.length > 0 ? (
                    reservations.map((reservation) => (
                      <li key={reservation.id}>
                        <p>{reservation.title} by {reservation.author}</p>
                        <img
                          src={reservation.coverimage}
                          alt={reservation.title}
                          style={{ width: '100px', height: 'auto' }}
                        />
                      </li>
                    ))
                  ) : (
                    <p>You have no books checked out.</p>
                  )}
                </ul>
              </div>
            ) : (
              <p>Loading user information...</p>
            )}
          </div>
        </>
      );
}

export default Account;