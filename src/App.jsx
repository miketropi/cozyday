import { useState } from 'react'
import MyCanvas from './components/MyCanvas'
import './App.css'
import MySpotifyEmbed from './components/MySpotifyEmbed'
import SoundEffect from './components/SoundEffect'
import Chatbox from './components/Chatbox'
import Modal from './components/Modal'
import { BookText, MessageCircleQuestion, ChevronLeft, ChevronRight } from 'lucide-react'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);

  return (
    <div className="w-full h-screen">
      <MyCanvas />
      <div className='fixed bottom-2 left-2 w-full max-w-[400px] px-4 sm:px-2'>
        <button
          onClick={() => setPanelOpen((v) => !v)}
          aria-label={panelOpen ? 'Hide Panel' : 'Show Panel'}
          className={`mb-2 w-10 h-10 rounded-full shadow flex items-center justify-center transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 ${panelOpen ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          {panelOpen ? (
            <ChevronLeft className="w-5 h-5 transition-transform duration-200" />
          ) : (
            <ChevronRight className="w-5 h-5 transition-transform duration-200" />
          )}
        </button>
        <div
          className={`transition-transform duration-300 ease-in-out ${panelOpen ? 'translate-x-0' : '-translate-x-full'} will-change-transform`}
        >
          <div className='mb-6'>
            <Chatbox />
          </div>
          <div>
            <SoundEffect />
            <MySpotifyEmbed uri={import.meta.env.VITE_APP_SPOTIFY_LINK} />
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Devfun">
        <div className="text-gray-800">
          <p className="mb-4 leading-relaxed">✨ Đây là một dự án nhỏ được tạo ra với mong muốn mang đến cho bạn một không gian thư giãn, thoải mái, giúp bạn bắt đầu ngày mới một cách nhẹ nhàng nhưng đầy năng lượng. 🌈</p>
          <p className="leading-relaxed">🚀 Dù bạn đang chuẩn bị cho một ngày học tập hay làm việc bận rộn, hãy ghé qua đây vài phút để nạp lại tinh thần, tái tạo cảm hứng và sẵn sàng chinh phục mọi thử thách! 💫</p>
        </div>
      </Modal>
      <button 
        className='fixed bottom-4 right-4 bg-black hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center'
        onClick={() => setIsModalOpen(true)}
      >
        <MessageCircleQuestion size={16} />
      </button>
    </div>
  )
}

export default App
