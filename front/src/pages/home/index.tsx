import Header from "../../components/header";
import noImage from "../../assets/home/noImage.png"
import arrow from "../../assets/home/arrow.svg"
import InfoIcons from "../../components/infoIcons";
import shippingIcon from "../../assets/home/shippingIcon.svg"
import returnsIcon from "../../assets/home/returnsIcon.svg"
import securityIcon from "../../assets/home/securityIcon.svg"

export default function Home(){
    return(
        <div>
            <Header/>

            <div className="flex h-100 lg:h-auto justify-center items-center w-full bg-[#F8F8F8]">
                <div className="w-1/3">
                    <img src={noImage} alt="" className="w-full h-auto opacity-5"/>
                </div>

                <div className="flex absolute flex-col justify-center w-full  md:max-xl:w-1/2 xl:w-1/3 gap-6 items-center z-10">
                    <label className="font-bold text-center text-5xl lg:text-7xl">Style Redefined</label>

                    <label className="text-xl text-center lg:text-2xl text-[#6B7280]">Discover the latest trends in fashion. Premium quality, sustainable materials, timeless designs.</label>

                    <div className="flex flex-col w-full justify-center items-center gap-4 lg:flex-row">
                        <button className="flex justify-center gap-4 px-8 items-center w-9/12 md:w-[182px] h-[48px] text-lg text-[#F9FAFB] rounded-lg cursor-pointer bg-[#030711]">
                            Shop Now
                            <img src={arrow} alt=""/>
                        </button>

                        <button className="flex justify-center items-center w-9/12 md:w-[182px] h-[48px] text-lg text-[#030711] rounded-lg border-[#E5E7EB] border-1 cursor-pointer bg-[#FFFFFF]">
                            View Collection
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-20 px-10">
                <div className="flex flex-wrap justify-around w-full py-16">
                    <InfoIcons       
                        image = {shippingIcon}
                        title = "Free Shipping"
                        subtitle = "Free shipping on orders over $100"
                    />

                    <InfoIcons       
                        image = {returnsIcon}
                        title = "Easy Returns"
                        subtitle = "30-day hassle-free returns"
                    />

                    <InfoIcons       
                        image = {securityIcon}
                        title = "Secure Payment"
                        subtitle = "Your payment information is safe"
                    />
                </div>


            </div>
        </div>
    )
}