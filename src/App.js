import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import MessageConvo from "./components/Home/Inbox/MessageConvo";
import Inbox from "./components/Home/Inbox/Inbox";
import UserHome from "./components/Home/UserHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inbox" element={<UserHome />}>
          <Route path="/inbox" element={<Inbox />}>
            <Route index element={<Navigate to="/inbox/1" replace />} />
            <Route path=":id" element={<MessageConvo />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
