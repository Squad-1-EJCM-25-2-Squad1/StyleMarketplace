interface InfoIconsProps{
    image: string,
    title: string,
    subtitle: string
}

export default function InfoIcons(props: InfoIconsProps){
    return(
        <div className="flex w-[440px] flex-col gap-4 justify-center items-center">
            <div className="flex justify-center items-center h-16 w-16 bg-[#E3E4E6] rounded-full">
                <img src={props.image}/>
            </div>

            <label className="text-lg font-semibold">{props.title}</label>

            <label className="text-base text-[#6B7280]">{props.subtitle}</label>
        </div>
    )
}