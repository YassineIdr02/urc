import { db } from '@vercel/postgres';


export const config = {
    runtime: 'edge',
};



export default async function handler(request) {
    try {
        // Vérification de la méthode HTTP
        if (request.method !== 'GET') {
            const error = { code: "METHOD_NOT_ALLOWED", message: "Méthode non autorisée" };
            return new Response(JSON.stringify(error), {
                status: 405,
                headers: { 'content-type': 'application/json' },
            });
        }
        
        const client = await db.connect();
        const { rows } = await client.sql`SELECT * FROM rooms`;

        if (rows.length === 0) {
            const error = { code: "NOT_FOUND", message: "Aucune room trouvée" };
            return new Response(JSON.stringify(error), {
                status: 404,
                headers: { 'content-type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
}
