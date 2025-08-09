interface ProfileOptionsIconsProps{
    image: string,
    label: string
}

export default function ProfileOptionsIcons (props: ProfileOptionsIconsProps){
    return(
        <button className="flex w-[fit-content] gap-2 px-3 cursor-pointer text-gray-950 text-md font-normal">
            <img src={props.image} alt=""/>
            {props.label}
        </button>
    )
}