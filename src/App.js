import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import MessageConvo from "./components/Home/Inbox/MessageConvo";
import Inbox from "./components/Home/Inbox/Inbox";
import UserHome from "./components/Home/UserHome";
import RoomInbox from "./components/Home/Rooms/RoomInbox";
import RoomMessageConvo from "./components/Home/Rooms/RoomMessageConvo";
import LoginLayout from "./components/Auth/LoginLayout";

function App() {
  window.Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log("yesssssss");
    }else console.log("nooooooo");
});

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginLayout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<UserHome />}>

          <Route path="inbox" element={<Inbox />}>
            <Route index element={<Navigate to="0" replace />} />
            <Route path=":id" element={<MessageConvo />} />
          </Route>

          <Route path="rooms" element={<RoomInbox />}>
            <Route index element={<Navigate to="1" replace />} />
            <Route path=":idRoom" element={<RoomMessageConvo />} />
          </Route>
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
