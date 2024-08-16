import data, { getNewSelectedItemsAndTotalPrice, handleAddCart, handleDecreaseQuantity, handleDeleteItem } from './data.js';

import Cart from './components/cart/Cart';
import ItemCard from './components/itemCard/ItemCard';

import { useState } from 'react';

const initialItemState = {
  allItems: data,
  selectedItems: [],
  totalPrice: 0,
}

function App() {
  const [items, setItems] = useState(initialItemState)

  const addToCart = ({name}) => {
    setItems(prevItems => {
      let newAllItems = handleAddCart(prevItems.allItems, name)
      let [newSelectedItems, totalPrice] = getNewSelectedItemsAndTotalPrice(newAllItems)

      return {
        "allItems": newAllItems,
        "selectedItems": newSelectedItems,
        totalPrice
      }
    })
  }

  const incrementQuantity = ({name}) => {
    setItems(prevItems => {
      let newAllItems = handleAddCart(prevItems.allItems, name)
      let [newSelectedItems, totalPrice] = getNewSelectedItemsAndTotalPrice(newAllItems)

      return {
        "allItems": newAllItems,
        "selectedItems": newSelectedItems,
        totalPrice
      }
    })
  } 

  const decrementQuantity = ({name}) => {
    setItems(prevItems => {
      let newAllItems = handleDecreaseQuantity(prevItems.allItems, name)
      let [newSelectedItems, totalPrice] = getNewSelectedItemsAndTotalPrice(newAllItems)

      return {
        "allItems": newAllItems,
        "selectedItems": newSelectedItems,
        totalPrice
      }
    })
  } 

  const deleteItem = ({name}) => {
    setItems(prevItems => {
      let newAllItems = handleDeleteItem(prevItems.allItems, name)
      let [newSelectedItems, totalPrice] = getNewSelectedItemsAndTotalPrice(newAllItems)

      return {
        "allItems": newAllItems,
        "selectedItems": newSelectedItems,
        totalPrice
      }
    })
  }

  const resetCart = () => {
    setItems(initialItemState)
  }

  return (
    <section id='product' className='py-[4rem]'>
      <div className='container grid-container'>
        <section id='items'>
          <h1 className='text-[2.3rem] text-rose900 font-bold mb-10'>Desserts</h1>
          <ul className='items-grid'>
            {
              items.allItems.map(item => <ItemCard 
                key={item.name} 
                {...item}
                addToCart={addToCart}
                increment={incrementQuantity}
                decrement={decrementQuantity}
              />)
            }
          </ul>
        </section>
        <section id='cart'>
          <Cart 
            selectedCartItems={items.selectedItems}
            totalPrice={items.totalPrice}
            deleteItem={deleteItem}
            resetCart={resetCart}
          />
        </section>
      </div>
    </section>
  )
}

export default App
