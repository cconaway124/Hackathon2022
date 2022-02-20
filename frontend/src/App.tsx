import React from 'react';
import { Header } from './Components/Header';
import { Feed } from './Components/Feed';
import { TestPoster } from './Constants';

function App() {
  return (
    <main>
      <Header />
      <div className="flex justify-center w-full h-full bg-cover bg-fixed bg-[url('https://alumni.wsu.edu/s/1613/images/gid2/editor/zoom_backgrounds/165440_general_zoom_background_3_p1.jpg')]">
        <Feed user={TestPoster} />
      </div>
    </main>
  );
}

export default App;


/*
HACKATHON PIC:
https://www.google.com/url?sa=i&url=https%3A%2F%2Fevents.wsu.edu%2Fevent%2Fcrimsoncode-hackathon-2020%2F&psig=AOvVaw3VwsUGzw0ubpAwQSmPHSjj&ust=1645400793447000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLiFiOH5jPYCFQAAAAAdAAAAABAD

GREY BACKGROUND:
https://alumni.wsu.edu/s/1613/images/gid2/editor/zoom_backgrounds/165440_general_zoom_background_3_p1.jpg
*/