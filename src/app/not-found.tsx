// app/not-found.tsx
import React from 'react';

const NotFound = () => {
  return (
      <div className="text-center mt-12">
          <h1 className="text-6xl font-bold">404 - Page Not Found</h1>
          <p className="text-2xl font-bold">The page you are looking for does not exist.</p>
          <a href="/" className="text-xl font-bold">Go back to Home</a>
      </div>
  );
};

export default NotFound;
