interface SizeSelectionProps{
    size: string,
    onStock: boolean
}

export default function SizeSelection(props: SizeSelectionProps){

    let bgColor = "#FFFFFF"
    let bgOpacity = "opacity-100";
    if(!props.onStock){
        bgColor = "#F9F9FA"
        bgOpacity = "opacity-70";
    }

    return(
        <button disabled={!props.onStock} style={{backgroundColor: bgColor}}className={`flex justify-center items-center w-16 h-12 text-gray-950 text-base font-normal border border-gray-300 rounded-xl ${bgOpacity} focus:border-purple-600`}>
            {props.size}
        </button>
    )
}