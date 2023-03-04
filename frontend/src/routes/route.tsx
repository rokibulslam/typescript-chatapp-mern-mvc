import { createBrowserRouter } from "react-router-dom";
import Chat from "../pages/Chats/Chat";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home />
    ),
  },
  {
    path: "/chats",
    element: <Chat />,
  },
]);

export default router