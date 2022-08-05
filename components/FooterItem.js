function FooterItem({Icon, title}) {
    return (
        <div className="flex flex-col items-center cursor-pointer group w-12 sm:w-20 text-white hover:text-red-400">
            <Icon className="h-12 mb-1"/>
            <p className="opacity-0 group-hover:opacity-100 tracking-widest">{title}</p>
        </div>
    );
}

export default FooterItem;