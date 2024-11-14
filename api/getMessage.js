import { checkSession, unauthorizedResponse } from "../lib/session";
import { Redis } from "@upstash/redis";

export const config = {
  runtime: "edge",
};

const redis = Redis.fromEnv();

export default async function handler(request) {
  try {

    const connected = await checkSession(request);
    if (!connected) {
      console.log("Not connected");
      return unauthorizedResponse();
    }

    const body = await request.json();
    const { receiver_id, user_id } = body;

    if (!receiver_id) {
      return new Response("Receiver ID is required", {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const messageKey = `messages:${user_id}:${receiver_id}`;

    const messages = await redis.lrange(messageKey, 0, -1); 

    if (messages.length === 0) {
      return new Response("[]", {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    
    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while fetching messages." }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
