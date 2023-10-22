import { useState } from 'react';
import './scss/app.scss'
import Banner from './components/Banner';
import ReactPlayer from 'react-player';
import NumberScreen from './components/NumberScreen';


function App() {

  const [bannerOn, setBannerOn] = useState(false)
  const [numberScreenState, setNumberScreenState] = useState(false)

  const toggleNumberScreen = () => {
    if (numberScreenState) {
      setNumberScreenState(!numberScreenState)
    } else {
      setBannerOn(!bannerOn)
      setNumberScreenState(!numberScreenState)
    }
  }

  return (
    <div className='screen'>
      <ReactPlayer
        playing={numberScreenState ? false : true}
        muted={true}
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
        controls={true}
      />
      <Banner toggleScreen={toggleNumberScreen} bannerState={bannerOn} />
      <NumberScreen toggleScreen={toggleNumberScreen} stateOpen={numberScreenState} />
    </div >
  );
}

export default App;
