import { db } from '@vercel/postgres';
 
export default async function handler(request, response) {
    let retries = 0;
    while (retries < 3) {
        try {
            const client = await db.connect();
            const { id, title, description, date, list } = request.body;
        
            // Insert the data into the PostgreSQL database
            await client.query('INSERT INTO collections (id, title, description, date, list) VALUES ($1, $2, $3, $4, $5)', [id, title, description, date, JSON.stringify(list)]);
        
            // Release the database connection
            client.release();
        
            // Send a success response

            response.status(200).json({ message: 'Data saved successfully!' });
            break;
        } catch (error) {
            retries++;
            console.log(`Failed to connect to the database. Retrying... (Attempt ${retries})`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        
            // Send an error response
            response.status(500).json({ error: 'Error occurred while saving data' });
        }
    }
}