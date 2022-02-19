import React from 'react';
import { Header } from './Components/Header';
import { Feed } from './Components/Feed';
import { TestPoster } from './Constants';

function App() {
  return (
    <main>
      <Header />
      <div className="flex justify-center w-full">
        <Feed user={TestPoster} />
      </div>
    </main>
  );
}

export default App;
