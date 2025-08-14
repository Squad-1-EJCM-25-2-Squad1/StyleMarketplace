interface ColorSelectionProps{
    bgColor: string,
    onStock: boolean;
}

export default function ColorSelection(props: ColorSelectionProps){

    let bgOpacity = "opacity-100"

    if(!props.onStock){
        bgOpacity = "opacity-20"
    }

    return(
        <button disabled={!props.onStock} style={{ backgroundColor: props.bgColor }} className={`flex justify-center items-center w-10 h-10 rounded-full border-2 border-gray-300 focus:border-purple-600 ${bgOpacity}`}>
            {!props.onStock && (<div className="w-7 h-1 rotate-45 bg-red-500"/>)}
        </button>
    )
}