import { YOUTUBE_API_KEY, YOUTUBE_API_URL } from '../../utils/constants';

export default async function handler(request, response) {
    try {
        const { title, mediaType } = request.body;
        const trailer = await fetch(`${YOUTUBE_API_URL}${title}+${mediaType}+trailer&part=snippet&maxResults=1&type=video&key=${YOUTUBE_API_KEY}`);
        if (!trailer.ok) {
            response.status(400).json({ error: 'No trailer available' });
        } else {
            const trailerData = await trailer.json();
            const trailerId = trailerData.items[0].id.videoId;
            response.status(200).json({ trailerId });
        }
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
}