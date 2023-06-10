import { WATCHMODE_API_KEY } from '../../utils/constants';

export default async function handler(request, response) {
    try {
        const { mediaType, movie } = request.body;
        const watchMode = await fetch(`https://api.watchmode.com/v1/title/${mediaType}-${movie?.id}/sources/?apiKey=${WATCHMODE_API_KEY}`).then((res) => res.json());
        if (watchMode.length > 0) {
            const filteredSources = watchMode.filter((v, i, a) => a.findIndex(v2 => (v2.name === v.name)) === i);
            response.status(200).json({ sources: filteredSources });
        } else {
            response.status(404).json({ error: 'Not available to stream' });
        }
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
}