import React, { createContext, useContext, useState } from "react";

export interface User {
  name: string;
  email: string;
  picture: string;
  _id: string;
  token: string;
}

export interface SingleChat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
}
interface ChatContextProps {
  selectedChat: SingleChat;
  setSelectedChat: React.Dispatch<React.SetStateAction<SingleChat>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  notification: string;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
  chats: SingleChat[];
  setChats: React.Dispatch<React.SetStateAction<SingleChat[]>>;
}
// The ChatContext context now has an explicit type, which can be ChatContextProps or null.

// const ChatContext = createContext<ChatContextProps|null>(null);

const ChatContext = createContext<ChatContextProps>({
  selectedChat: {} as SingleChat,
  setSelectedChat: () => {},
  user: {} as User,
  setUser: () => {},
  notification: "",
  setNotification: () => {},
  chats: [] as SingleChat[],
  setChats: () => {},
});
const ChatProvider = ({ children }:{children:React.ReactNode}) => {

  const [selectedChat, setSelectedChat] = useState<SingleChat>({} as SingleChat);
  const [user, setUser] = useState<User>({}as User);
  const [notification, setNotification] = useState<string>("");
  const [chats, setChats] = useState<SingleChat[]>([]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
