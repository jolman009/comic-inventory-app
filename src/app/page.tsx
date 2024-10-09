import React from 'react';
import ComicList from '../components/ComicList';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Comic Book Inventory App</h1>
      <ComicList />
    </div>
  );
};

export default HomePage;