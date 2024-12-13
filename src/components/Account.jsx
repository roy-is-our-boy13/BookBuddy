/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useEffect, useState } from 'react';

function Account()
{
    const [user, setUser] = useState(null);

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
        
        fetchUser();
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
                  {user.books && user.books.length > 0 ? (
                    user.books.map((book) => (
                      <li key={book.id}>
                        <p>{book.title}</p>
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