import { MdAddShoppingCart } from 'react-icons/md'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../../store/itemSlice';

const ItemCard = ({
        name, 
        category, 
        price, 
        image, 
        quantity,
    }) => {

    const dispatch = useDispatch()
    const isSelected = quantity > 0

    const handleAdd = () => {
        dispatch(addToCart({"name": name}))
    }

    const increment = () => {
        dispatch(incrementQuantity({"name": name}))
    }

    const decrement = () => {
        dispatch(decrementQuantity({"name": name}))
    }

    let imgClass = "w-full w-[80%] rounded-xl"
    if (isSelected) {
        imgClass += ' border-red border-2'
    }

    const unselectedButton = <button onClick={handleAdd} className='bg-white border-solid border-2 border-rose500 rounded-full px-4 py-3 mx-auto flex items-center gap-2'> 
        <MdAddShoppingCart className='inline text-rose500'/> Add to Cart
    </button> 

    const selectedButton = <button className='border-rose300 text-white bg-red border-solid border-2 rounded-full px-2 py-3 mx-auto flex items-center justify-between gap-2'> 
        <span className='text-[1.3rem]' onClick={increment}><CiCirclePlus /></span>
        <span className='mx-[2.5em]'>{quantity}</span>
        <span className='text-[1.3rem]' onClick={decrement}><CiCircleMinus /></span>
    </button>

    const button = isSelected ? selectedButton : unselectedButton
    
    return (
        <li className='rounded mb-5'>
            <picture>
                <source media="(min-width: 768px)" srcSet={image["tablet"]}/>
                <source media="(min-width: 1024px)" srcSet={image["desktop"]}/>
                <img 
                    src={image["mobile"]} 
                    alt={name}
                    className={imgClass}
                />
            </picture>
            <div className='flex relative bottom-5'>
                {button}
            </div>
            <h4 className='text-rose500'>{name}</h4>
            <p className='text-rose900 font-semibold text-2xl'>{category}</p>
            <p className='text-red font-semibold text-xl'>${price}</p>
        </li>
    )
}

export default ItemCard