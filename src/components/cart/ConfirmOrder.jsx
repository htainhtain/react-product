import { CiCircleCheck } from "react-icons/ci";

import { forwardRef } from "react"
import ConfirmOrderItem from "./ConfirmOrderItem";
import { useSelector } from "react-redux";
import Dialog from "../Dialog/Dialog";

const ConfirmOrder = forwardRef(({resetCart}, ref) => {
    const selectedItems = useSelector(state => state.item.selectedItems)
    const totalPrice = useSelector(state => state.item.totalPrice)
    return (
        <Dialog ref={ref}>
            <div className='container'>
                <CiCircleCheck className='text-[3rem] text-green-500 font-extrabold'/>
                <h3 className='text-[2.5rem] font-bold leading-11 text-rose900'>Order <br />Confirmed</h3>
                <p className='mt-2 text-rose500'>We hope you enjoy your food</p>
                <div className='px-5 py-5 bg-rose100 rounded-lg my-[2em]'>
                    {
                        selectedItems.map(item => <ConfirmOrderItem 
                            key={item.name}
                            item={item}
                        />)
                    }
                    <div className='flex justify-between text-[1.4rem] mt-3'>
                        <p>Order total</p>
                        <p>${totalPrice}</p>
                    </div>
                </div>
                <button 
                    onClick={resetCart}
                    className="w-full bg-red text-white text-[1.2rem] px-4 py-3 rounded-3xl"
                >
                    Start New Order
                </button>
            </div>
        </Dialog>
    )
})

export default ConfirmOrder