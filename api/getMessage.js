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

    const messageKey1 = `messages:${user_id}:${receiver_id}`;
    const messageKey2 = `messages:${receiver_id}:${user_id}`;

    // Récupérer les messages pour les deux clés
    const messages1 = await redis.lrange(messageKey1, 0, -1);
    const messages2 = await redis.lrange(messageKey2, 0, -1);

    // Fusionner les deux listes de messages
    const allMessages = [...messages1, ...messages2];

    if (allMessages.length === 0) {
      return new Response("[]", {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(JSON.stringify(allMessages), {
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
