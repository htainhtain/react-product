import { useRef } from "react";
import CartItem from "./CartItem";
import ConfirmOrder from "./ConfirmOrder";
import EmptyCard from "./EmptyCard"

import { LuLeafyGreen } from "react-icons/lu";


const Cart = ({ selectedCartItems, totalPrice, deleteItem, resetCart }) => {
    const modal = useRef()

    const isCartEmpty = selectedCartItems.length === 0
    const quantity = selectedCartItems.reduce((acc, currenItem) => acc + currenItem.quantity, 0)

    const items = selectedCartItems.map(item => <CartItem key={Math.random()} cartItem={item} deleteItem={deleteItem}/>)

    const handleOpenModal = () => {
        modal.current.open()
    }

    const handleResetCart = () => {
        resetCart()
        modal.current.close()
    }
    
    return (
        <>
            {!isCartEmpty && <ConfirmOrder 
                ref={modal}
                resetCart={handleResetCart}
                selectedCartItems={selectedCartItems}
                totalPrice={totalPrice}
            />}
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