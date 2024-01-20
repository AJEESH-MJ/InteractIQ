import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ChatPage, HomePage } from "./pages/index";
import { Login, Register } from "./Components/index";

function App() {
  return (
    <div className="flex justify-center items-center bg-[#dddedd] text-blue-800 min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
