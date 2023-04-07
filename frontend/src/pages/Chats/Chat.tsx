import SideDrawer from "../../components/SideDrwaer/SideDrawer";
import { ChatState } from "../../context/useChat";

const Chat = () => {
  const {user}= ChatState()
    
  return (
    <div>
      <div>
        {user&& <SideDrawer />}
      </div>
    </div>
  );
};

export default Chat;
