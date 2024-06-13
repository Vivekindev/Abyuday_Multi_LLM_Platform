import React, { useState, useEffect } from 'react';

const App = () => {
  const [isTokenVerified, setIsTokenVerified] = useState(false);

  useEffect(() => {
    // Fetch request to verify the token
    const verifyToken = async () => {
      try {
        const response = await fetch('http://localhost:4040/api/verifyToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZpdmVrQGdtYWlsLmNvbSIsImlhdCI6MTcxMjE2Nzk3OCwiZXhwIjoxNzEyMTY4NTc4fQ.WdZM4Q7PxZguTTYvjDScgpVifQUGss3TXyvskc_bYHw'
          }
        });

        if (response.ok) {
          setIsTokenVerified(true);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    };

    verifyToken();
  }, []);

  if (!isTokenVerified) {
    return null; // Do nothing if the token is not verified
  }

  return (
    <div>
      {/* Your page content goes here */}
      <h1>Welcome to my page!</h1>
    </div>
  );
}

export default App;
