function HeaderItem({Icon, title}) {
    return (
        <div className="flex flex-col items-center cursor-pointer group w-12 sm:w-20 text-white hover:text-red-400">
            <Icon className="h-10 group-hover:animate-bounce"/>
            <p className="opacity-0 group-hover:opacity-100 tracking-wide">{title}</p>
        </div>
    );
}

export default HeaderItem;