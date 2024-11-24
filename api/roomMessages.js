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

export default async (req, res) => {
  try {
    const user = await getConnecterUser(req);
    if (!user) {
      return triggerNotConnected(res);
    }

    const form = formidable();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(500).json({ error: "Failed to parse form data" });
      }

      const { receiver_id, content, sender_id, room_external_id } = JSON.parse(
        fields.message[0]
      );

      let attachment = null;

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
        `rMessages:${message.sender_id}:${receiver_id}`,
        JSON.stringify(message)
      );

      const beamsClient = new PushNotifications({
        instanceId: "875e7724-b0db-4bdf-b082-54a376631128",
        secretKey:
          "955C9D57C12DCB37DFCBC128F83EF54232F2B223A2894524BBB5E2398B007187",
      });

      const publishResponse = await beamsClient.publishToUsers(
        room_external_id,
        {
          web: {
            notification: {
              title: user.username,
              body: message.content,
              icon: "https://www.univ-brest.fr/themes/custom/ubo_parent/favicon.ico",
              deep_link: `https://urc-yassine-idrissis-projects.vercel.app/home/rooms/${receiver_id}`,
            },
            data: {
              attachment: message.attachment,
            },
          },
        }
      );

      // Réponse de succès
      res.status(200).json(message);
    });
  } catch (error) {
    console.error("Error handling message:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the message." });
  }
};
