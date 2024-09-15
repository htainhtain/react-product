import { useSelector } from 'react-redux';
import  ItemCard  from './ItemCard'

const Items = () => {
    const allItems = useSelector(state => state.item.allItems)

    return (
        <ul className='items-grid'>
            {
                allItems.map(item => <ItemCard 
                    key={item.id} 
                    {...item}
                />)
            }
        </ul>
    )
}

export default Items