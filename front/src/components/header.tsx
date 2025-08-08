import logo from "../assets/home/logo.svg"
import lupa from "../assets/home/lupa.svg"
import favorito from "../assets/home/favorito.svg"
import carrinho from "../assets/home/carrinho.svg"

export default function Header(){
    return(
        <header className="flex flex-col">
            <div className="flex w-full justify-center p-2 bg-[#030711]">
                <label className="text-[#F9FAFB] text-sm">Free shipping on orders over $100 | New arrivals daily</label>
            </div>

            <div className="flex w-full justify-around border-b-1 border-b-[#E5E7EB] py-4 px-5">
                <div className="flex gap-2 items-center">
                    <img src={logo} alt=""/>
                    <label className="font-bold text-xl">STYLE</label>
                </div>

                <div className="flex gap-8">
                    <button className="cursor-pointer text-sm">New In</button>
                    <button className="cursor-pointer text-sm">Women</button>
                    <button className="cursor-pointer text-sm">Men</button>
                    <button className="cursor-pointer text-sm">Sale</button>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <img src={lupa} className=""/>
                    </div>

                    <input type= "text" placeholder= "Search for products..." className="h-10 w-96 bg-[#F8F9FA] rounded-lg pl-10"></input>
                </div>

                <div className="flex gap-2">
                    <button className="flex justify-center items-center h-10 w-10">
                        <img src={favorito} alt="" className="cursor-pointer"/>
                    </button>

                    <button>
                        <div className="flex justify-center items-center w-10 h-10 rounded-full font-semibold bg-[#F3F4F6] cursor-pointer">
                            JD
                        </div>
                    </button>

                    <button className="flex justify-center items-center h-10 w-10">
                        <img src={carrinho} alt="" className="cursor-pointer"/>
                    </button>
                </div>
            </div>
        </header>
    )
}