import { useRef, useState } from 'react'
import { Coffee, CookingPot, ChefHat, Waves, AudioWaveform, Play, Pause } from 'lucide-react'

const SOURCE = [
  {
    name: 'Coffee Cup',
    url: 'https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/Coffee-Cup-Sound-Effect.mp3',
    icon: <Coffee />
  },
  // {
  //   name: 'Coffee Maker',
  //   url: 'https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/Coffee-Maker-Sound-Effect.mp3',
  //   icon: <Coffee />
  // },
  {
    name: 'Cooking Pot',
    url: 'https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/Cooking-Pot-Sound-Effect.mp3',
    icon: <CookingPot />
  },
  {
    name: 'Kitchen',
    url: 'https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/Kitche-Sound-Effect.mp3',
    icon: <ChefHat />
  },
  {
    name: 'Kitchen Sink',
    url: 'https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/Kitchen-Sink-Tap-Sound-Effect.mp3',
    icon: <Waves />
  },    
]

export default function SoundEffect() {
  const [playing, setPlaying] = useState(Array(SOURCE.length).fill(false))
  const [volumes, setVolumes] = useState(Array(SOURCE.length).fill(1))
  const audioRefs = useRef([])

  const handlePlayPause = (idx) => {
    const newPlaying = [...playing]
    if (audioRefs.current[idx]) {
      if (playing[idx]) {
        audioRefs.current[idx].pause()
        newPlaying[idx] = false
      } else {
        audioRefs.current[idx].volume = volumes[idx]
        audioRefs.current[idx].play()
        newPlaying[idx] = true
      }
      setPlaying(newPlaying)
    }
  }

  const handleVolumeChange = (idx, e) => {
    const newVolume = parseFloat(e.target.value)
    const newVolumes = [...volumes]
    newVolumes[idx] = newVolume
    setVolumes(newVolumes)
    if (audioRefs.current[idx]) {
      audioRefs.current[idx].volume = newVolume
    }
  }

  const handleEnded = (idx) => {
    const newPlaying = [...playing]
    newPlaying[idx] = false
    setPlaying(newPlaying)
  }

  return (
    <div className="mb-4">
      <h1 className="text-lg font-bold mb-6 text-gray-800 flex items-center gap-2">
        <AudioWaveform />
        Ambient Sounds
      </h1>
      <ul className="space-y-5">
        {SOURCE.map((src, idx) => (
          <li key={src.name} className="flex items-center gap-4">
            <button 
              onClick={() => handlePlayPause(idx)} 
              className={`p-2 rounded-full transition-all bg-black`}
              aria-label={playing[idx] ? `Pause ${src.name}` : `Play ${src.name}`}
            >
              {playing[idx] ? (
                <Pause size={12} color="white" />
              ) : (
                <Play size={12} color="white" />
              )}
            </button>
            <div className="flex items-center gap-2">
              {/* <span className="text-gray-600">{src.icon}</span> */}
              <span className="text-sm  font-medium text-gray-800">{src.name}</span>
            </div>
            {/* <div className="flex-grow flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volumes[idx]}
                onChange={e => handleVolumeChange(idx, e)}
                className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-sm font-medium text-gray-600 w-10 text-right">
                {Math.round(volumes[idx] * 100)}%
              </span>
            </div> */}
            <audio
              ref={el => (audioRefs.current[idx] = el)}
              src={src.url}
              loop={true}
              onEnded={() => handleEnded(idx)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}