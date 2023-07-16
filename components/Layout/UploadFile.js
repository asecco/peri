import { CloudUploadIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import { alertParams } from "../../utils/helper";

function UploadFile() {
    const uploadFile = (event) => {
        if (!event.target.files[0]?.name?.match(/\.(txt|json)$/)) {
            toast.error('Invalid file format. Please upload a .txt or .json file', alertParams);
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const result = JSON.parse(event.target.result);
                const filtered = result?.filter(item => item.rating >= 8);
                let newItems = 0;
                filtered?.map(item => {
                    const type = item?.type
                    const obj = item?.movie || item?.show;
                    const id = obj?.ids?.tmdb;
                    if ((type === 'movie' || type === 'show') && obj && obj.ids && obj.ids.tmdb) {
                        const localStorageFavorites = localStorage.getItem('favorites');
                        const favorites = localStorageFavorites ? JSON.parse(localStorageFavorites) : [];
                        const index = favorites?.findIndex((fav) => (fav.id === id && (fav.type === type || fav.type === 'tv' || fav.type === 'show')));
                        if (index === -1) {
                            newItems++;
                            const itemType = type === 'show' ? 'tv' : type;
                            favorites.push({ id, type: itemType });
                            localStorage.setItem('favorites', JSON.stringify(favorites));
                        }
                    }
                });
                if (newItems > 0) {
                    toast.success(`Added ${newItems} new favorites`, alertParams);
                    setInterval(() => window.location.reload(), 500);
                } else {
                    toast.error('No new favorites to add', alertParams);
                }
            } catch (error) {
                toast.error('Cannot read file. Refer to the GitHub docs for the correct format.', alertParams);
            }
        };
        reader.readAsText(event.target.files[0]);
    };

    return (
        <div className='hidden md:block'>
            <label className='flex items-center mx-2 group'>
                <CloudUploadIcon className="h-8 w-8 text-red-400 group-hover:text-red-500 cursor-pointer"/>
                <p className="text-base font-bold text-red-400 group-hover:text-red-500 cursor-pointer">Upload Trakt file</p>
                <input onChange={uploadFile} type="file" name='favorites' accept='.txt, .json' className='hidden'></input>
            </label>
        </div>
    )
}

export default UploadFile;