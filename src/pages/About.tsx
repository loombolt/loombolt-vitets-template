import React from 'react';
import useCountStore from '../store/useCountStore';

const About: React.FC = () => {
  const count = useCountStore((state) => state.count);

  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page.</p>
      <div className="card">
        <p>The current count from the store is: {count}</p>
      </div>
    </div>
  );
};

export default About;
