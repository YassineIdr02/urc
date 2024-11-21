import formidable from "formidable";
import fs from "fs";
import { getConnecterUser, triggerNotConnected } from "../lib/session";
import { Redis } from "@upstash/redis";
import { put } from "@vercel/blob";

const PushNotifications = require("@pusher/push-notifications-server");

const redis = Redis.fromEnv();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (request, response) => {
  try {
    const user = await getConnecterUser(request);

    if (!user) {
      console.log("Not connected");
      return triggerNotConnected(response);
    }

    const form = formidable();
    let attachment = null;
    form.parse(request, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(500).json({ error: "Failed to parse form data" });
      }

      const { receiver_id, content, sender_id, receiver_external_id } =
        JSON.parse(fields.message[0]);

      if (files.file) {
        const file = files.file[0];
        const buffer = await fs.promises.readFile(file.filepath);
        const blob = await put(file.originalFilename, buffer, {
          access: "public",
          token:
            "vercel_blob_rw_f5udFipqsXD5NutQ_9jQQFLd4CPe48sIHjWF6dvpJFgEVzu",
        });
        attachment = blob.url;
      }

      if (!receiver_id || (!content && !attachment)) {
        return res.status(400).json({
          error: "Receiver ID and content are required.",
        });
      }

      const message = {
        message_id: `msg:${Date.now()}`,
        sender_id,
        receiver_id,
        content,
        attachment: attachment || null,
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
              deep_link: `http://localhost:3000/home/inbox/${sender_id}`,
            },
            data: {
              attachment: message.attachment,
            },
          },
        }
      );
      response.status(200).json(message);
    });
  } catch (error) {
    console.error("Error saving message:", error);
    response.status(500).json({
      error: "An error occurred while saving the message.",
    });
  }
};
