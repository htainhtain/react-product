import Cart from './components/cart/Cart';
import ItemCard from './components/itemCard/ItemCard';

import { useContext } from 'react';
import { itemsContext } from './store/itemContext.jsx';

function App() {
  const { allItems } = useContext(itemsContext)

  return (
    <section id='product' className='py-[4rem]'>
      <div className='container grid-container'>
        <section id='items'>
          <h1 className='text-[2.3rem] text-rose900 font-bold mb-10'>Desserts</h1>
          <ul className='items-grid'>
            {
              allItems.map(item => <ItemCard 
                key={item.name} 
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
  )
}

export default App
