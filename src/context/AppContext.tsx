"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Message = { id: string; sender: string; text: string; time: string; isMine: boolean };
type Chat = { id: string; user: string; avatar: string; unread: number; messages: Message[] };
type User = { username: string; email: string; bio: string; isNotifications: boolean };

interface AppContextType {
  user: User;
  chats: Chat[];
  updateUser: (data: Partial<User>) => void;
  sendMessage: (chatId: string, text: string) => void;
  markAsRead: (chatId: string) => void;
  totalUnread: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    username: "wanzofc",
    email: "wanz@zerow.com",
    bio: "Just a casual watcher looking for good plot and amazing animation.",
    isNotifications: true
  });

  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1", user: "Kira_99", avatar: "K", unread: 2, messages: [
        { id: "m1", sender: "Kira_99", text: "Did you watch the latest episode?", time: "10:20 AM", isMine: false },
        { id: "m2", sender: "Kira_99", text: "The animation was insane!", time: "10:23 AM", isMine: false }
      ]
    },
    {
      id: "2", user: "ErenYeager", avatar: "E", unread: 0, messages: [
        { id: "m3", sender: "ErenYeager", text: "Tatakae!", time: "Yesterday", isMine: false }
      ]
    },
    {
      id: "3", user: "SatoruGojo", avatar: "S", unread: 0, messages: [
        { id: "m4", sender: "SatoruGojo", text: "Nah, I'd win.", time: "Tuesday", isMine: false }
      ]
    }
  ]);

  const totalUnread = chats.reduce((acc, chat) => acc + chat.unread, 0);

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const sendMessage = (chatId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: user.username,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    };

    setChats((prev) => prev.map(chat => 
      chat.id === chatId ? { ...chat, messages: [...chat.messages, newMessage] } : chat
    ));

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: chats.find(c => c.id === chatId)?.user || "User",
        text: "Real-time reply received! 🚀",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: false
      };
      setChats((prev) => prev.map(chat => 
        chat.id === chatId ? { ...chat, unread: chat.unread + 1, messages: [...chat.messages, reply] } : chat
      ));
    }, 2000);
  };

  const markAsRead = (chatId: string) => {
    setChats((prev) => prev.map(chat => 
      chat.id === chatId ? { ...chat, unread: 0 } : chat
    ));
  };

  return (
    <AppContext.Provider value={{ user, chats, updateUser, sendMessage, markAsRead, totalUnread }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};
