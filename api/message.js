import {getConnecterUser, triggerNotConnected} from "../lib/session";
import { Redis } from '@upstash/redis';
// const PushNotifications = require("@pusher/push-notifications-server");

export const config = {
    runtime: 'edge',
};

const redis = Redis.fromEnv();

export default async (request, response) => {
    try {
      const user = await getConnecterUser(request);
  
      if (!user) {
        return triggerNotConnected(response);
      }
  
      const { receiver_id, content } = request.body;
  
      if (!receiver_id || !content) {
        return response.status(400).json({ error: "Receiver ID and content are required." });
      }
  
      const message = {
        message_id: `msg:${Date.now()}`, 
        sender_id: user.id,
        receiver_id,
        content,
        timestamp: Date.now(),
      };
  
      await redis.lpush(`messages:${receiver_id}`, JSON.stringify(message));
  
      return response.status(200).json(message);
  
    } catch (error) {
      console.error("Error saving message:", error);
      return response.status(500).json({ error: "An error occurred while saving the message." });
    }
  };
