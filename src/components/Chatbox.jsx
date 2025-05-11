import React, { useEffect, useState, useRef } from 'react';
import { db } from '../until/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, limit } from 'firebase/firestore';
import { Send, Save, X } from 'lucide-react';

const DEFAULT_PLACEHOLDER_USER = `Guest${Math.floor(Math.random() * 99999)}`;
const NOTIFICATION_SOUND_URL = 'https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/Notification-Message-Tone.mp3';

function generateUserId() {
  return 'user_' + Math.random().toString(36).substr(2, 9) + Date.now();
}

export default function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [editingUsername, setEditingUsername] = useState(false);
  const [userId, setUserId] = useState('');
  const messagesEndRef = useRef(null);

  // Load username and userId from localStorage or set default
  useEffect(() => {
    const storedUser = localStorage.getItem('chatbox_username');
    const storedUserId = localStorage.getItem('chatbox_userid');
    if (storedUser) {
      setUsername(storedUser);
    } else {
      setUsername(DEFAULT_PLACEHOLDER_USER);
      localStorage.setItem('chatbox_username', DEFAULT_PLACEHOLDER_USER);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newId = generateUserId();
      setUserId(newId);
      localStorage.setItem('chatbox_userid', newId);
    }
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'), limit(100));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      // Play sound if a new message is added and it's not from self
      if (msgs.length > messages.length) {
        const lastMsg = msgs[0];
        if (lastMsg.userId !== userId) {
          const audio = new window.Audio(NOTIFICATION_SOUND_URL);
          audio.volume = 1;
          audio.play();
        }
        console.log(lastMsg);
      }
      setMessages(msgs.reverse()); // reverse to show oldest at top
    });
    return () => unsubscribe();
  }, [messages.length, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await addDoc(collection(db, 'messages'), {
      text: input,
      user: username,
      userId: userId,
      createdAt: serverTimestamp(),
    });
    setInput('');
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const saveUsername = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('chatbox_username', username.trim());
      setEditingUsername(false);
    }
  };

  return (
    <div className="backdrop-blur-sm bg-white/30 rounded-xl shadow-lg p-4 max-w-md mx-auto flex flex-col h-[400px] border border-gray-200/50">
      <div className="flex items-center mb-2">
        {editingUsername ? (
          <form onSubmit={saveUsername} className="flex gap-2 w-full">
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="flex-1 px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              maxLength={20}
              autoFocus
            />
            <button type="submit" className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">
              <Save className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => setEditingUsername(false)} className="px-2 py-1 rounded bg-gray-300 text-black hover:bg-gray-400">
              <X className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2 w-full">
            <span className="font-semibold text-blue-700">{username}</span>
            <button onClick={() => setEditingUsername(true)} className="text-xs text-blue-500 underline ml-2">Edit</button>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto mb-2 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div key={msg.id} className={`my-1 p-2 rounded-lg shadow-sm transition-colors duration-200 ${msg.userId === userId ? 'bg-[#effdde] text-black ml-auto max-w-[80%] rounded-lg' : 'bg-white text-black mr-auto max-w-[80%] rounded-lg'}`}>
            <div className="flex flex-col">
              {msg.userId !== userId && (
                <div className="text-xs mb-1 font-medium text-blue-500 font-bold">{msg.user || 'Unknown'}</div>
              )}
              <div className="text-gray-800 text-sm">{msg.text}</div>
              <div className="text-right text-xs text-gray-400 mt-1">
                {msg.createdAt?.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) || ''}
                {msg.userId === userId && (
                  <span className="ml-1">✓✓</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 rounded-lg bg-white/50 border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent"
        />
        <button 
          type="submit" 
          className="px-4 py-2 rounded-lg bg-blue-500/80 hover:bg-blue-600/80 text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
