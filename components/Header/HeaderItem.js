function HeaderItem({Icon, title}) {
    return (
        <div className="flex flex-col items-center cursor-pointer group -ml-1 md:ml-2 w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 2xl:w-36 3xl:w-40 text-white hover:text-red-400 link link-underline link-underline-black">
            <Icon className="h-12 3xl:h-18 group-hover:animate-bounce"/>
            <p className="opacity-0 group-hover:opacity-100 tracking-wide text-base md:text-xl mb-2">{title}</p>
        </div>
    );
}

export default HeaderItem;