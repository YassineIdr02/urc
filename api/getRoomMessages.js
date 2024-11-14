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
    const { receiver_id } = body;

    if (!receiver_id) {
      return new Response("Receiver ID is required", {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    // Rechercher toutes les clés ayant le receiver_id spécifié
    const keysPattern = `rMessages:*:${receiver_id}`;
    const messageKeys = await redis.keys(keysPattern);

    // Récupérer les messages pour chaque clé trouvée
    const messagesPromises = messageKeys.map(key => redis.lrange(key, 0, -1));
    const messagesArrays = await Promise.all(messagesPromises);

    // Fusionner tous les messages dans une seule liste
    const allMessages = messagesArrays.flat();

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
