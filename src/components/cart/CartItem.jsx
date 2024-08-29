import { RxCrossCircled } from "react-icons/rx";
import { deleteItemFromCart } from "../../store/itemSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch()
    const deleteItem = () => {
        dispatch(deleteItemFromCart({"id": cartItem.id}))
    }

    return (
        <li>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-rose900 font-semibold text-[1.4rem] mb-2'>{cartItem.name}</h3>
                    <p className='text-[1.2rem]'>
                        <span className="text-red">{cartItem.quantity}x</span> 
                        <span className='text-rose500 mx-3'>@ ${cartItem.price}</span> 
                        <span className='text-rose900'>${cartItem.price * cartItem.quantity}</span>
                    </p>
                </div>
                <RxCrossCircled 
                    onClick={deleteItem}
                    className='text-[1.5rem]'
                />
            </div>
            <hr className="my-2"/>
        </li>
    )
}

export default CartItem