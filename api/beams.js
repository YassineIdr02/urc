import {getConnecterUser, triggerNotConnected} from "../lib/session";

const PushNotifications = require("@pusher/push-notifications-server");


export default async (req, res) => {

    const userIDInQueryParam = req.query["user_id"];
    const user = await getConnecterUser(req);
    console.log("PushToken : " + userIDInQueryParam + " -> " + JSON.stringify(user));
    if (user === undefined || user === null || userIDInQueryParam !== user.externalId) {
        console.log("Not connected");
        triggerNotConnected(res);
        return;
    }

    console.log("Using push instance : " + process.env.PUSHER_INSTANCE_ID);
    const beamsClient = new PushNotifications({
        instanceId: "875e7724-b0db-4bdf-b082-54a376631128",
        secretKey: process.env.PUSHER_SECRET_KEY.toString(),
    });

    const beamsToken = beamsClient.generateToken(user.externalId);
    console.log(JSON.stringify(beamsToken));
    res.send(beamsToken);
};
