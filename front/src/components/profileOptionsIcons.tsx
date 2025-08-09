interface ProfileOptionsIconsProps{
    image: string,
    label: string
}

export default function ProfileOptionsIcons (props: ProfileOptionsIconsProps){
    return(
        <button className="flex gap-2 px-3 cursor-pointer">
            <img src={props.image} alt=""/>
            <label className="text-gray-950 text-md font-normal">{props.label}</label>
        </button>
    )
}