import { useState } from 'react'
import MyCanvas from './components/MyCanvas'
import './App.css'
import MySpotifyEmbed from './components/MySpotifyEmbed'
import SoundEffect from './components/SoundEffect'
function App() {

  return (
    <div className="w-full h-screen">
      <MyCanvas />
      <div className='fixed bottom-2 left-2 w-full max-w-[400px] px-4 sm:px-2'>
        <SoundEffect />
        <MySpotifyEmbed uri={import.meta.env.VITE_APP_SPOTIFY_LINK} />
      </div>
    </div>
  )
}

export default App
