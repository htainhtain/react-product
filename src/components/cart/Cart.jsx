import { useContext, useRef } from "react";
import CartItem from "./CartItem";
import ConfirmOrder from "./ConfirmOrder";
import EmptyCard from "./EmptyCard"

import { LuLeafyGreen } from "react-icons/lu";
import { itemsContext } from "../../store/itemContext";


const Cart = () => {
    const {
        selectedItems,
        totalPrice,
        resetCart
    }= useContext(itemsContext)


    const modal = useRef()

    const isCartEmpty = selectedItems.length === 0
    const quantity = selectedItems.reduce((acc, currenItem) => acc + currenItem.quantity, 0)

    const items = selectedItems.map(item => <CartItem key={Math.random()} cartItem={item} />)

    const handleOpenModal = () => {
        modal.current.open()
    }

    const handleResetCart = () => {
        resetCart()
        modal.current.close()
    }
    
    return (
        <>
            {!isCartEmpty && <ConfirmOrder ref={modal} resetCart={handleResetCart}/>}
            <div className="bg-rose50 mb-6 p-6 w-full rounded">
                <h2 className="text-[2rem] font-semibold text-rose500">Your cart ({quantity})</h2>
                { isCartEmpty && <EmptyCard />}
                {
                    !isCartEmpty && 
                    <>
                        <ul>{items}</ul>
                        <div className='flex justify-between text-[1.4rem] mt-3'>
                            <p>Order total</p>
                            <p>${totalPrice}</p>
                        </div>
                        <div className="my-4 bg-rose100 text-[1.2rem] px-4 py-3 rounded-l flex items-center flex-row gap-2">
                            <LuLeafyGreen className="text-green-500"/> 
                            <p>This is a carbon neutral delivery</p>
                        </div>
                        <button 
                            onClick={handleOpenModal}
                            className="w-full bg-red text-white text-[1.2rem] px-4 py-3 rounded-3xl"
                        >
                            Confirm order
                        </button>
                    </>
                }
            </div>
        </>
    )
}

export default Cart