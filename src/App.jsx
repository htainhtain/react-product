import { useEffect, useRef } from 'react';
import Cart from './components/cart/Cart';
import ItemCard from './components/itemCard/ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import NewItem from './components/NewItem/NewItem';
import { fetchItems } from './store/itemSlice';

function App() {
  const allItems = useSelector(state => state.item.allItems)
  const newDesertModal = useRef()
  const handleAddDessert = () => {
    newDesertModal.current.open()
  }
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  return (
    <>
      <NewItem ref={newDesertModal}/>
      <section id='product' className='py-[4rem]'>
        <div className='container grid-container'>
          <section id='items'>
            <div className='flex justify-between mb-5'>
              <h1 className='text-[2.3rem] text-rose900 font-bold'>Desserts</h1>
              <button 
                className="bg-red text-white text-[1.2rem] px-4 py-3 rounded-3xl"
                onClick={handleAddDessert}
              >
                Add Dessert
              </button>          
        </div>
            <ul className='items-grid'>
              {
                allItems.map(item => <ItemCard 
                  key={item.id} 
                  {...item}
                />)
              }
            </ul>
          </section>
          <section id='cart'>
            <Cart />
          </section>
        </div>
      </section>
    </>
  )
}

export default App
