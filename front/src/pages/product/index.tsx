import Header from "../../components/header";

export default function Product(){
    return(
        <div className="flex flex-col">
            <Header/>

            <main className="flex flex-col py-8 px-4">
                <nav className="text-gray-500 text-sm font-normal mb-8">
                    <ol className="flex gap-1">
                        <li><button className="cursor-pointer">Home /</button></li>
                        <li><button className="cursor-pointer">Sale /</button></li>
                        <li className="text-gray-950"><button className="cursor-pointer"> Premium Cotton T-shirt</button></li>
                    </ol>
                </nav>

                <div className="flex flex-col">
                    
                </div>
            </main>
        </div>
    )
}