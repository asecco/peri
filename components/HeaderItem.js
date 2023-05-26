function HeaderItem({Icon, title}) {
    return (
        <div className="flex flex-col items-center cursor-pointer group w-14 sm:w-20 md:w-24 lg:w-28 xl:w-32 2xl:w-36 3xl:w-40 text-white hover:text-red-400">
            <Icon className="h-12 group-hover:animate-bounce"/>
            <p className="opacity-0 group-hover:opacity-100 tracking-wide text-base md:text-xl">{title}</p>
        </div>
    );
}

export default HeaderItem;