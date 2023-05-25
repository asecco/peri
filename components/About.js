import { FaCog, FaInfoCircle, FaGithub, FaDollarSign, FaEnvelopeOpenText } from 'react-icons/fa';
import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';

function About() {
    const [modalOpen, setModalOpen] = useState(false);
    const onOpenModal = () => setModalOpen(true);
    const onCloseModal = () => setModalOpen(false);

    return (
        <div>
            <Modal open={modalOpen} onClose={onCloseModal} center styles={{ modal: {background: '#202F3B'}}}>
                <div className="p-4 sm:p-6 lg:p-8 shadow-2xl rounded-lg">
                    <div className="relative rounded-md bg-red-400 px-4 py-4 xl:px-8 text-white text-center text-xl md:text-3xl xl:text-5xl font-bold">About</div>
                    <div className="mt-4 text-white text-2xl">
                        <p className='my-4'>Hopefully you're enjoying using the site as much as I enjoyed making it! If you have a moment, I'd really appreciate you starring the project on GitHub.</p>
                        <p>Throughout the development process(still ongoing) my goal has always been to create a site that is easy to use and gather information from.
                            As an avid movie/tv fan myself, I want Peri to be a community for like-minded individuals to find the content they desire and share their
                            thoughts with the community. I'm always open to suggestions and feedback, so if you have any ideas or comments, please feel free to reach
                            out to me. I'm always looking for ways to improve the site!
                        </p>
                        <hr className="h-px my-6 bg-gray-400 border-0"></hr>
                        <div className='flex justify-center gap-6'>
                            <a href='https://github.com/asecco/peri' target="_blank" rel="noreferrer"><FaGithub className='h-12 w-12 my-2 hover:text-red-400 transition duration-200 ease-in transform sm:hover:scale-125' /></a>
                            <a href='mailto:asecco99@gmail.com' rel="noreferrer"><FaEnvelopeOpenText className='h-12 w-12 my-2 hover:text-red-400  transition duration-200 ease-in transform sm:hover:scale-125' /></a>
                            <a href='https://ko-fi.com/asecco' target="_blank" rel="noreferrer"><FaDollarSign className='h-12 w-12 my-2 hover:text-red-400  transition duration-200 ease-in transform sm:hover:scale-125' /></a>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="group fixed bottom-0 right-0 flex h-24 w-24 items-end justify-end p-2 z-50">
                <div className="absolute z-50 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-red-400 p-3 text-white shadow-xl">
                    <FaCog className='h-5 w-5 duration-[0.6s] group-hover:rotate-90' />
                </div>

                <div onClick={onOpenModal} className="absolute flex scale-x-0 rounded-full bg-blue-500 p-2 text-white transition-all duration-[0.2s] ease-out hover:bg-blue-600 hover:p-3 hover:cursor-pointer group-hover:-translate-y-16 group-hover:scale-x-100">
                    <FaInfoCircle className='h-6 w-6' />
                </div>

                <a href='https://github.com/asecco/peri' target="_blank" rel="noreferrer" className="absolute flex scale-x-0 rounded-full bg-red-700 p-2 text-white transition-all duration-[0.2s] ease-out hover:bg-red-800 hover:p-3 group-hover:-translate-x-14 group-hover:-translate-y-14 group-hover:scale-x-100">
                    <FaGithub className='h-6 w-6' />
                </a>

                <a href='https://ko-fi.com/asecco' target="_blank" rel="noreferrer" className="absolute flex scale-100 scale-y-0 rounded-full bg-green-400 p-2 text-white transition-all duration-[0.2s] ease-out hover:bg-green-500 hover:p-3 group-hover:-translate-x-16 group-hover:scale-y-100">
                    <FaDollarSign className='h-6 w-6' />
                </a>
            </div>
        </div>
    );
}

export default About;