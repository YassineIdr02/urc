import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MessageConvo from "./components/Home/Inbox/MessageConvo";
import Inbox from "./components/Home/Inbox/Inbox";
import UserLayout from "./Layouts/UserLayout";
import RoomInbox from "./components/Home/Rooms/RoomInbox";
import RoomMessageConvo from "./components/Home/Rooms/RoomMessageConvo";
import LoginLayout from "./Layouts/LoginLayout";

function App() {
  window.Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      // OK
    }
  });

  const sw = navigator.serviceWorker;
  if (sw != null) {
    sw.onmessage = (event) => {
      console.log("Got event from sw : " + event.data);
    };
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginLayout />} />
        <Route path="/home" element={<UserLayout />}>
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
