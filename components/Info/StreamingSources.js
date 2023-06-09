import { Modal } from 'react-responsive-modal';

function StreamingSources({ watchModeSources, modalOpen, onCloseModal }) {
    return (
        <Modal open={modalOpen} onClose={onCloseModal} center showCloseIcon={false} styles={{ modal: {background: '#202F3B'}}}>
            <div className="shadow-2xl rounded-lg">
                <div className="relative rounded-md bg-red-400 px-4 py-4 xl:px-8 text-white text-center text-xl md:text-3xl xl:text-4xl font-bold">
                    <p>Where to Watch</p>
                </div>
                <div className="h-full w-full px-4 pb-4 pt-4 xl:px-8">
                    <div className="flex flex-col text-white text-xl md:text-3xl xl:text-4xl">
                        {watchModeSources.map((source, index) => (
                            <a key={index} href={source.web_url} target="_blank" rel="noreferrer" className="flex items-center justify-between py-1 rounded-md hover:text-red-400">
                                <h3>{source.name}</h3>
                                <p className="pl-20">{source.price ? `$${source.price}/EP` : 'Sub'}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default StreamingSources;