import { db } from '@vercel/postgres';
 
export default async function handler(request, response) {
    try {
        const client = await db.connect();
        const { id, title, description, date, list } = request.body;
    
        await client.query('INSERT INTO collections (id, title, description, date, list) VALUES ($1, $2, $3, $4, $5)', [id, title, description, date, JSON.stringify(list)]);
        client.release();

        response.status(200).json({ message: 'Data saved successfully!' });
    } catch (error) {
        response.status(500).json({ error: 'Error occurred while saving data' });
    }
}