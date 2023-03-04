import axios from "axios";
import React, { useEffect, useState } from "react";
import { SingleChat, User } from "../../types/types";

const Chat = () => {
    const [chats, setChats] = useState<SingleChat[] | null>(null);
    
  const fetchChats = async () => {
      const {data} = await axios.get("/chats");
    setChats(data)
  };
  useEffect(() => {
    fetchChats();
  }, []);
    
    return <div>
        {chats && chats.map((chat, index) => <div key={index}>
          {chat.chatName}
      </div>)}
  </div>;
};

export default Chat;
