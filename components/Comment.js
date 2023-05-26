import { ReactCusdis } from 'react-cusdis';

function Comment({ title, type, id }) {
    const identifier = `${type}/${id}`;

    return (
        <div className='mx-8'>
            <p className="font-bold text-white text-2xl md:text-4xl my-10">Community</p>
            <ReactCusdis attrs={{host: 'https://cusdis.com', appId: process.env.NEXT_PUBLIC_CUSDIS, pageId: identifier, pageTitle: title}}/>
        </div>
  );
}

export default Comment;