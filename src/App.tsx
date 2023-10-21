import { useState } from 'react';
import './scss/app.scss'
import ReactPlayer from 'react-player';
import Banner from './components/Banner';


function App() {

  const [bannerOn, setBannerOn] = useState(false)

  return (
    <div className='screen'>
      <ReactPlayer
        onPlay={() => {
          const timeout = setTimeout(() => {
            setBannerOn(true);
          }, 5000);

          return () => clearTimeout(timeout);
        }}
        className='screen__video'
        width='100%'
        height='100%'
        url='https://www.youtube.com/watch?v=M7FIvfx5J10'
        playing
      />
      <Banner bannerState={bannerOn} />
    </div>
  );
}

export default App;
