import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import { useEffect, useState } from "react";

const UserLayout = () => {
    const [user, setUser] = useState({
        username : "" 
      })
    useEffect(()=>{
        const session = sessionStorage.getItem("username") ;
        if(session)
          setUser({
            username : session
          });
      },[])

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1 sticky top-0">
        <Sidebar User={user} />
      </div>
      <div className="col-span-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
