import { Client, TokenProvider } from "@pusher/push-notifications-web";

export const configureBeams = async (client: Client, externalId: string, token: string) => {
    try {
        const currentUserId = await client.getUserId();
        if (currentUserId === externalId) {
            return;
        }

        const tokenProvider = new TokenProvider({
            url: "/api/beams",
            headers: {
                Authentication: `Bearer ${token}`,
            },
        });

        client.start()
            .then(() => client.addDeviceInterest('global'))
            .then(() => client.setUserId(externalId, tokenProvider))
            .then(() => {
                client.getDeviceId().then(deviceId => console.log("Push id : " + deviceId));
            })
            .catch(console.error);

    } catch (error) {
        console.error("Pusher Beams configuration failed:", error);
    }
};