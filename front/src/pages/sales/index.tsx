import Footer from "../../components/footer";
import Header from "../../components/header";
import SaleInfo from "../../components/saleInfo";

export default function Sales(){
    return(
        <div className="flex flex-col min-h-screen">
                <Header/>

                <div className="flex flex-grow flex-col gap-6">
                    <div className="flex flex-col py-20 px-4 gap-8 bg-gradient-to-l from-[#AF1F5F] to-[#BF3636]">
                        <div className="flex flex-col items-center gap-6">
                            <label className="text-white text-5xl font-bold text-center">MEGA SALE</label>

                            <label className="text-white text-xl font-normal text-center md:w-1/2 lg:w-1/3">Up to 70% off on selected items. Limited time offer - don't miss out!</label>
                        </div>

                        <div className="flex flex-col lg:flex-row justify-center gap-4">
                            <button className="py-2 px-6 text-red-600 text-lg font-semibold text-center rounded-full bg-white cursor-pointer">Free Shipping on all sale items</button>

                            <button className="py-2 px-6 text-red-600 text-lg font-semibold text-center rounded-full bg-white cursor-pointer">Extra 10% off for members</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 lg:px-32 2xl:px-69 gap-8">
                        <SaleInfo
                            title="70%"
                            subtitle="Max Discount"
                        />

                        <SaleInfo
                            title="500+"
                            subtitle="Items on Sale"
                        />

                        <SaleInfo
                            title="48h"
                            subtitle="Time Left"
                        />

                        <SaleInfo
                            title="Free"
                            subtitle="Shipping"
                        />
                    </div>

                </div>

                <Footer
                    title = "Don't Miss Future Sales!"
                    subtitle = "Subscribe to our newsletter and be the first to know about exclusive sales and special offers."
                    color = "#EF4444"
                />
        </div>
    )
}