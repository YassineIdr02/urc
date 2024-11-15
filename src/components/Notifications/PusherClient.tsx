import React, { useEffect } from "react";
import { Client } from "@pusher/push-notifications-web";
import { configureBeams } from "../../config/beamsConfig";

export const beamsClient = new Client({
    instanceId: "875e7724-b0db-4bdf-b082-54a376631128",
  });

const PusherClient = ({ children } : any) => {
  useEffect(() => {
    

    const sessionToken = sessionStorage.getItem("token");
    const sessionExternalId = sessionStorage.getItem("externalId") || "-1";

    if (sessionToken && sessionExternalId !== "-1") {
      configureBeams(beamsClient, sessionExternalId, sessionToken);
    } else {
      console.warn("Token or External ID is missing");
    }
  }, []);

  return <div>{children}</div>;
};

export default PusherClient;
