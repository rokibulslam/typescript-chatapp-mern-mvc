import { createBrowserRouter } from "react-router-dom";
import Chat from "../pages/Chats/Chat";
import Home from "../pages/Home/Home";
import ProtectedRoute from "../components/ProdtectedRoute/ProtectedRoute";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chats",
    element: 
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
  }
]);

export default router