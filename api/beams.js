import { getConnecterUser, triggerNotConnected } from "../lib/session";

const PushNotifications = require("@pusher/push-notifications-server");

export default async (req, res) => {
  const userIDInQueryParam = req.query["user_id"];
  const user = await getConnecterUser(req);
  console.log(
    "PushToken : " + userIDInQueryParam + " -> " + JSON.stringify(user)
  );
  if (
    user === undefined ||
    user === null ||
    userIDInQueryParam !== user.externalId
  ) {
    console.log("Not connected");
    triggerNotConnected(res);
    return;
  }

  console.log("*******Using push instance : " + process.env.PUSHER_INSTANCE_ID);
  const beamsClient = new PushNotifications({
    instanceId: "875e7724-b0db-4bdf-b082-54a376631128",
    secretKey:
      "955C9D57C12DCB37DFCBC128F83EF54232F2B223A2894524BBB5E2398B007187",
  });

  const beamsToken = beamsClient.generateToken(user.externalId);
  console.log(JSON.stringify(beamsToken));
  res.send(beamsToken);
};
