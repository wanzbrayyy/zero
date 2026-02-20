"use client";

import React, { useState, useRef, useEffect } from "react";
import { NavbarDashboard } from "@/components/layout/NavbarDashboard";
import { useAppContext } from "@/context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPaperPlane, 
  faEllipsisV, 
  faSearch, 
  faArrowLeft, 
  faEnvelope 
} from "@fortawesome/free-solid-svg-icons";

export default function MessagesPage() {
  const { chats, sendMessage, markAsRead } = useAppContext();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  const handleChatClick = (id: string) => {
    setActiveChatId(id);
    markAsRead(id);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !activeChatId) return;
    sendMessage(activeChatId, text);
    setText("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavbarDashboard />
      
      <div className="flex-1 flex pt-16 h-screen overflow-hidden">
        <div className={`w-full md:w-80 bg-[#121212] border-r border-gray-800 flex flex-col h-full ${activeChatId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
            <div className="relative">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-500" />
              <input type="text" placeholder="Search messages..." className="w-full bg-black border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div key={chat.id} onClick={() => handleChatClick(chat.id)} className={`p-4 border-b border-gray-800 cursor-pointer flex gap-3 transition ${activeChatId === chat.id ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center font-bold text-white">
                  {chat.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className={`text-sm truncate ${chat.unread > 0 ? 'text-white font-bold' : 'text-gray-300 font-medium'}`}>{chat.user}</h4>
                    <span className="text-gray-500 text-[10px]">{chat.messages[chat.messages.length - 1]?.time}</span>
                  </div>
                  <p className={`text-xs truncate ${chat.unread > 0 ? 'text-white font-medium' : 'text-gray-500'}`}>{chat.messages[chat.messages.length - 1]?.text}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] text-white font-bold">{chat.unread}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {activeChatId ? (
          <div className="flex-1 flex flex-col bg-black h-full">
            <div className="h-16 border-b border-gray-800 flex items-center justify-between px-4 md:px-6 bg-[#121212]">
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveChatId(null)} className="md:hidden text-gray-400 hover:text-white mr-2">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white">
                  {activeChat?.avatar}
                </div>
                <div>
                  <h3 className="text-white text-sm font-bold">{activeChat?.user}</h3>
                  <span className="text-green-500 text-[10px] font-medium">Online</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {activeChat?.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2 max-w-[80%] text-sm shadow-md ${msg.isMine ? 'bg-primary text-white rounded-2xl rounded-tr-none' : 'bg-[#1a1a1a] text-white rounded-2xl rounded-tl-none'}`}>
                    {msg.text}
                    <div className={`text-[9px] mt-1 ${msg.isMine ? 'text-red-200 text-right' : 'text-gray-500 text-left'}`}>{msg.time}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-[#121212] border-t border-gray-800 flex gap-2">
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." className="flex-1 bg-black border border-gray-800 rounded-full py-2.5 px-5 text-sm text-white focus:outline-none focus:border-gray-600" />
              <button type="submit" disabled={!text.trim()} className="w-10 h-10 bg-primary hover:bg-red-700 disabled:bg-gray-700 disabled:text-gray-400 text-white rounded-full flex items-center justify-center transition">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-black flex-col text-gray-500">
            <FontAwesomeIcon icon={faEnvelope} className="text-5xl mb-4 opacity-50" />
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
