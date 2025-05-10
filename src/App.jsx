import { useState } from 'react'
import MyCanvas from './components/MyCanvas'
import './App.css'
import MySpotifyEmbed from './components/MySpotifyEmbed'

function App() {

  return (
    <div className="w-full h-screen">
      <MyCanvas />
      <div className='fixed bottom-2 left-2 w-[400px]'>
        <MySpotifyEmbed uri={import.meta.env.VITE_APP_SPOTIFY_LINK} />
      </div>
    </div>
  )
}

export default App
