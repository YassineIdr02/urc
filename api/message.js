import { getConnecterUser, triggerNotConnected } from "../lib/session";
import { Redis } from "@upstash/redis";
const PushNotifications = require("@pusher/push-notifications-server");
const redis = Redis.fromEnv();

export default async (request, response) => {
  try {
    const headers = new Headers(request.headers);
    const user = await getConnecterUser(request);

    if (!user) {
      console.log("Not connected");
      return triggerNotConnected(response);
    }

    const { receiver_id, content, sender_id, receiver_external_id } = request.body; 

    if (!receiver_id || !content) {
      return response.status(400).json({
        error: "Receiver ID and content are required.",
      });
    }

    const message = {
      message_id: `msg:${Date.now()}`,
      sender_id,
      receiver_id,
      content,
      timestamp: Date.now(),
    };

    await redis.lpush(
      `messages:${message.sender_id}:${receiver_id}`,
      JSON.stringify(message)
    );

    const beamsClient = new PushNotifications({
      instanceId: process.env.PUSHER_INSTANCE_ID,
      secretKey: process.env.PUSHER_SECRET_KEY,
    });

    const publishResponse = await beamsClient.publishToUsers(
      [receiver_external_id],
      {
        web: {
          notification: {
            title: user.username,
            body: message.content,
            ico: "https://www.univ-brest.fr/themes/custom/ubo_parent/favicon.ico",
            deep_link:
              `http://localhost:3000/home/inbox/${sender_id}` ,
          },
          data: {
           
          },
        },
      }
    );

    response.status(200).json(message);
  } catch (error) {
    console.error("Error saving message:", error);
    response.status(500).json({
      error: "An error occurred while saving the message.",
    });
  }
};
