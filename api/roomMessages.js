import { getConnecterUser, triggerNotConnected } from "../lib/session";
import { Redis } from '@upstash/redis';

export const config = {
  runtime: 'edge',
};

const redis = Redis.fromEnv();

export default async (request) => {
  try {
    

    const { receiver_id, content, sender_id } = await request.json(); 

    if (!receiver_id || !content) {
      return new Response(
        JSON.stringify({ error: "Receiver ID and content are required." }),
        {
          status: 400, 
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const message = {
      message_id: `msg:${Date.now()}`,
      sender_id,
      receiver_id,
      content,
      timestamp: Date.now(),
    };

    await redis.lpush(`rMessages:${message.sender_id}:${receiver_id}`, JSON.stringify(message));

    return new Response(
      JSON.stringify(message),
      {
        status: 200, 
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error saving message:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while saving the message." }),
      {
        status: 500, 
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
