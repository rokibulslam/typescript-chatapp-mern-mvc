import ChatBox from "../../components/ChatBox/ChatBox";
import MyChats from "../../components/MyChats/MyChats";
import SideDrawer from "../../components/SideDrwaer/SideDrawer";
import { ChatState } from "../../context/useChat";

const Chat = () => {
  const {user}= ChatState()
    
  return (
    <div className="">
        {user && <SideDrawer />}
      <div className="flex justify-between p-[10px] pt-16">
        {user && <MyChats />}
        {user && <ChatBox />}
        </div>
    </div>
  );
};

export default Chat;
